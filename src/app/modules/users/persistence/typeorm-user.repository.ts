import { FindOneOptions } from 'typeorm';

import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { TypeOrmRepository } from '../../shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/types/nullable.type';
import { UpdateUserForgotPasswordRequest } from '../dtos/update-user-forgot-password-request.dto';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from './user.entity';
import { UserCriteriaQuery } from './user-criteria.query';

export class TypeOrmUserRepository extends TypeOrmRepository<UserEntity> implements UserRepository {
	async create(userEntity: UserEntity): Promise<UserEntity> {
		return this.persistEntity(userEntity);
	}

	async update(id: string, request: UpdateUserRequest): Promise<Nullable<UserEntity>> {
		const { affected } = await this.persistPartialEntity(id, request);

		return affected === 1 ? this.findById(id) : null;
	}

	async updatePassword(
		userEntity: UserEntity,
		request: UpdateUserPasswordRequest | UpdateUserForgotPasswordRequest,
	): Promise<UserEntity> {
		return this.persistEntity(userEntity, request);
	}

	async findById(id: string): Promise<Nullable<UserEntity>> {
		const options = { where: { id } } as FindOneOptions<UserEntity>;

		return this.findOneEntity(options);
	}

	async findByEmail(email: string): Promise<Nullable<UserEntity>> {
		const options = { where: { email } } as FindOneOptions<UserEntity>;

		return this.findOneEntity(options);
	}

	async findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>> {
		const { where, take, skip, sortName, sortOrder, sortColumn } = query;

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumnCase('name', sortName, sortOrder);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		return builder.executeGetManyAndCount();
	}

	async delete(id: string): Promise<boolean> {
		const { affected } = await this.deleteEntity(id);

		return affected !== 0;
	}

	async softDelete(id: string): Promise<boolean> {
		const { affected } = await this.softDeleteEntity(id);

		return affected !== 0;
	}

	protected entitySchema(): GenericEntityClassOrSchema<UserEntity> {
		return UserEntity;
	}
}
