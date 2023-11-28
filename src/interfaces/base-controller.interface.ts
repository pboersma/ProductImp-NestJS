import BaseDTO from 'src/dto/base.dto';
import { ObjectLiteral } from 'typeorm';

/**
 * Interface representing a base controller for managing resources.
 * Implement this interface in your controllers to ensure consistent method signatures.
 *
 * @interface
 */
export default interface BaseControllerInterface {
  /**
   * Retrieve a list of resources.
   *
   * @async
   * @method
   * @returns {Promise<ObjectLiteral>} A promise that resolves to an object representing the list of resources.
   */
  listResources(): Promise<ObjectLiteral>;

  /**
   * Retrieve a specific resource by its unique identifier.
   *
   * @async
   * @method
   * @returns {Promise<ObjectLiteral>} A promise that resolves to an object representing the retrieved resource.
   */
  getResourceById(identifier: number): Promise<ObjectLiteral>;

  /**
   * Create a new resource.
   *
   * @method
   * @returns {Promise<ObjectLiteral>} A promise that resolves to an object representing the created resource.
   */
  createResource(dto: BaseDTO): ObjectLiteral;

  /**
   * Update an existing resource.
   *
   * @async
   * @method
   * @returns {Promise<ObjectLiteral>} A promise that resolves to an object representing the updated resource.
   */
  updateResource(identifier: number, resource: any): Promise<ObjectLiteral>;

  /**
   * Delete a resource.
   *
   * @async
   * @method
   * @returns {Promise<ObjectLiteral>} A promise that resolves to an object representing the deleted resource.
   */
  deleteResource(identifier: number): Promise<ObjectLiteral>;
}
