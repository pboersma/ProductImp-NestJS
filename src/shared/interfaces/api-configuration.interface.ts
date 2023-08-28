export interface APIConfigurationInterface {
  id: number;
  name: string;
  url: string;
  authentication: string;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
