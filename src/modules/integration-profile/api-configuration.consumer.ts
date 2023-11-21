import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { APIConfigurationService } from '../services/api-configuration.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Processor('api-configuration')
export class APIConfigurationConsumer extends WorkerHost {
  constructor(
    private readonly configurationService: APIConfigurationService,
    private readonly httpService: HttpService,
    @InjectQueue('api-products')
    private readonly apiProductsQueu: Queue,
  ) {
    super();
  }

  private readonly batchSize = 100;
  private readonly logger = new Logger(APIConfigurationConsumer.name);

  async process(job: Job) {
    this.logger.log(`Syncing Api Configuration with id: ${job.data.id}...`);
    // Lets get the apiConfiguration from the storage.
    const apiConfiguration = await this.configurationService.find(job.data.id, [
      'id',
      'name',
      'url',
      'authentication',
    ]);
    // Get the data from the API.
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(apiConfiguration.url, {
          headers: {
            Authorization: `Basic ${btoa(apiConfiguration.authentication)}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    const acceptedData = [];
    data.forEach((element) => {
      acceptedData.push({
        // TODO: Lets make these dynamic
        name: element.name,
        uid: element.ean,
        product: JSON.stringify(element),
        configuration: job.data.id,
      });
    });
    // Split products into batches
    const batches = [];
    for (let i = 0; i < acceptedData.length; i += this.batchSize) {
      const batch = acceptedData.slice(i, i + this.batchSize);
      batches.push(batch);
    }
    // Enqueue each batch for asynchronous processing
    for (const batch of batches) {
      await this.apiProductsQueu.add('processBatch', { products: batch });
    }
    // TODO: Add an Update for the API Configuration for the last sync date.
    this.logger.log(`Done Syncing Api Configuration with id: ${job.data.id}`);
  }
}
