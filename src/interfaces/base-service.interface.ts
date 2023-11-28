import { ObjectLiteral } from 'typeorm';
import BaseDTO from 'src/dto/base.dto';

export default interface BaseServiceInterface {
  /**
   * Retrieves all entities.
   *
   * @returns A promise that resolves to an array of ObjectLiteral representing entities.
   */
  findAll(): Promise<ObjectLiteral>;

  /**
   * Retrieves a specific entity based on its identifier.
   *
   * @param identifier - The identifier of the entity.
   *
   * @returns A promise that resolves to an ObjectLiteral representing the entity.
   */
  findSpecific(identifier: number): Promise<ObjectLiteral>;

  /**
   * Creates a new entity.
   *
   * @param payload - The data for creating the entity.
   *
   * @returns A promise that resolves to an ObjectLiteral representing the created entity.
   */
  create(payload: BaseDTO): Promise<ObjectLiteral>;

  /**
   * Updates an existing entity.
   *
   * @param identifier - The identifier of the entity to update.
   * @param payload - The data for updating the entity.
   *
   * @returns A promise that resolves to an ObjectLiteral representing the updated entity.
   */
  update(identifier: number, payload: BaseDTO): Promise<ObjectLiteral>;

  /**
   * Deletes an entity based on its identifier.
   *
   * @param identifier - The identifier of the entity to delete.
   *
   * @returns A promise that resolves to an ObjectLiteral representing the deleted entity.
   */
  delete(identifier: number): Promise<ObjectLiteral>;
}
