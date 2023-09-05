import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { APIProductService } from '../services/api-product.service';

@Processor('api-products')
export class APIProductConsumer {
  constructor(private readonly productService: APIProductService) {}
  private readonly logger = new Logger(APIProductConsumer.name);

  @Process('processBatch')
  async processBatch(job: Job) {
    this.logger.log(`Inserting Product Batch`);
    await this.productService.createBulk(job.data.products);
    this.logger.log(`Done Inserting Product Batch`);
  }
}
