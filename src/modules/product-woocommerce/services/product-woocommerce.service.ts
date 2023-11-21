import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductWoocommerce } from 'src/shared/entities/product-woocommerce.entity';
import { ProductWoocommerceInterface } from 'src/shared/interfaces/product-woocommerce.interface';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
// import { ProductWoocommerceInterface } from 'src/shared/interfaces/product-woocommerce.interface';
import { APIProduct } from 'src/shared/entities/api-product.entity';
import { ERRORS } from 'src/shared/constants/errors.constants';
import { forEach } from 'lodash';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';

@Injectable()
export class ProductWoocommerceService {
  constructor(
    @InjectRepository(ProductWoocommerce)
    private productWoocommerceRepository: Repository<ProductWoocommerceInterface>,
    @InjectRepository(APIProduct)
    private productRepository: Repository<any>, // TODO: Add type.
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<any>, // TODO: Add type.
  ) {}

  transformProduct(productItem: any): any {
    const product = productItem.product;
    const mapping = productItem.mapping.map;

    const newProduct = [];

    forEach(mapping, (map: any) => {
      // Hardcoded value to Field map
      if (map.product_field_id.match(/\{[^{}]*\}/g)) {
        newProduct[map.woocommerce_field_id] = map.product_field_id.replace(
          /[{}]/g,
          '',
        );

        return;
      }

      if (map.product_field_id.match(/\./g)) {
        const selectors = map.product_field_id.split('.');

        // Lets only support images for now.
        if (map.woocommerce_field_id === 'images') {
          forEach(selectors, (value, key) => {
            // console.log(value);
            // newProduct[map.woocommerce_field_id] = product[value];
          });
        }

        return;
      }

      // Standard Field to Field map.
      newProduct[map.woocommerce_field_id] = product[map.product_field_id];
    });

    console.log(newProduct);

    return newProduct;
  }

  async createOrUpdate({ product }): Promise<any> {
    try {
      // Fetch Product from database
      const productItem = await this.productRepository.findOne({
        where: {
          id: product,
        },
        relations: ['mapping'],
      });

      if (!productItem) {
        throw new Error('No Product Found');
      }

      if (!productItem.mapping) {
        throw new Error(
          'This product has not been mapped, Try again after mapping',
        );
      }

      return this.transformProduct(productItem);
      // return woocommerceProduct;
    } catch (error) {
      console.error(error);
    }

    // Transform Product with ProductMap to Woocommerce compatible format.
    // Insert WooCommerce Product into Woocommerce
    // Create/Update the Woocommerce dictionary (to keep track of the synced products)
  }

  // async findAll(): Promise<ProductWoocommerceInterface[]> {
  //   return this.productWoocommerceRepository.find();
  // }

  // async createOrUpdate(map: ProductWoocommerceInterface): Promise<any> {
  //   try {
  //     const mapping = await this.productWoocommerceRepository.save(map);
  //     await this.linkMappingToProduct(mapping);

  //     return mapping;
  //   } catch (error) {
  //     throw new Error(ERRORS.GENERIC_ERROR);
  //   }
  // }

  // async delete(id: number): Promise<DeleteResult> {
  //   return this.productWoocommerceRepository.delete(id);
  // }

  // private async linkMappingToProduct(
  //   mapping: ProductWoocommerceInterface,
  // ): Promise<void> {
  //   try {
  //     await this.apiProductRepository.update(
  //       { id: mapping.product },
  //       { mapping: mapping.id },
  //     );
  //   } catch (error) {
  //     throw new Error(ERRORS.LINK_MAP_TO_PRODUCT);
  //   }
  // }
}
