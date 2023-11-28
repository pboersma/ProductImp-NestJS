import { FindOptionsSelect, ObjectLiteral } from 'typeorm';
import BaseDTO from 'src/dto/base.dto';

export default interface RepositoryInterface {
  findAll(selectors: FindOptionsSelect<unknown>): Promise<ObjectLiteral>;
  findSpecific(
    selectors: FindOptionsSelect<unknown>,
    identifier: number,
  ): Promise<ObjectLiteral>;
  create(payload: BaseDTO): Promise<ObjectLiteral>;
  update(identifier: number, payload: BaseDTO): Promise<ObjectLiteral>;
  delete(identifier: number): Promise<ObjectLiteral>;
}
