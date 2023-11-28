import { NotFoundException } from '@nestjs/common';
import { FindOptionsSelect, ObjectLiteral } from 'typeorm';
import { HTTP_ERRORS } from 'src/constants/errors.constants';
import BaseDTO from 'src/dto/base.dto';
import RepositoryInterface from 'src/interfaces/repository.interface';

export default class BaseRepository implements RepositoryInterface {
  constructor(private repository: ObjectLiteral) {}

  /**
   * @inheritDoc
   */
  async findAll(
    selectors: FindOptionsSelect<unknown> = {},
  ): Promise<ObjectLiteral[]> {
    return await this.repository.find({
      select: selectors,
    });
  }

  /**
   * @inheritDoc
   */
  async findSpecific(
    selectors: FindOptionsSelect<unknown>,
    identifier: number,
  ): Promise<ObjectLiteral> {
    const resource = await this.repository.findOne({
      select: selectors,
      where: {
        id: identifier,
      },
    });

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return resource;
  }

  /**
   * @inheritDoc
   */
  async create(payload: BaseDTO): Promise<ObjectLiteral> {
    const resource = this.repository.create(payload);

    return await this.repository.save(resource);
  }

  /**
   * @inheritDoc
   */
  async update(identifier: number, payload: BaseDTO): Promise<ObjectLiteral> {
    const resource = await this.repository.findOne({
      where: {
        id: identifier,
      },
    });

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return await this.repository.save(this.repository.merge(resource, payload));
  }

  /**
   * @inheritDoc
   */
  async delete(identifier: number): Promise<ObjectLiteral> {
    const resource = await this.repository.findOne({
      where: {
        id: identifier,
      },
    });

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return await this.repository.delete(resource);
  }
}
