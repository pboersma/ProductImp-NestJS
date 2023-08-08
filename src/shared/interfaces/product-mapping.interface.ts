export interface ProductMappingInterface {
  id?: number;
  product: number;
  map: Record<string, any>;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
