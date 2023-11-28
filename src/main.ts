import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Product Imp API')
    .setDescription(
      'This api is used by the ProductImp client to manage products in a Wordpress Woocommerce Store',
    )
    // .addServer('product-imp')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  // Set a global prefix for the entire application
  app.setGlobalPrefix('product-imp');

  app.enableCors();
  await app.listen(parseInt(process.env.PORT) || 3000);
}

bootstrap();
