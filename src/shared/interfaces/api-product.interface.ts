export interface APIProductInterface {
  id: number;
  name: string;
  product: Record<string, any>;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
