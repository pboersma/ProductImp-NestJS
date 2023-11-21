import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { APIProductService } from '../services/api-product.service';

@Processor('api-products')
export class APIProductConsumer extends WorkerHost {
  constructor(private readonly productService: APIProductService) {
    super();
  }
  private readonly logger = new Logger(APIProductConsumer.name);

  async process(job: Job) {
    this.logger.log(`Inserting Product Batch`);
    await this.productService.createBulk(job.data.products);
    this.logger.log(`Done Inserting Product Batch`);
  }
}
