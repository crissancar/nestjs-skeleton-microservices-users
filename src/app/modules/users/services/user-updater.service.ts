import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { TypeOrmError } from '../../shared/services/typeorm-error.service';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UpdateUserFailedException } from '../exceptions/update-user-failed.exception';
import { UserWithEmailAlreadyExistsException } from '../exceptions/user-with-email-already-exists.exception';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserFinderById } from './user-finder-by-id.service';

const { updater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserUpdater {
	constructor(
		@Inject(repositoryInterface) private readonly repository: UserRepository,
		private readonly finder: UserFinderById,
	) {}

	async run(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		try {
			const updatedUser = await this.repository.update(request.id, request);

			if (!updatedUser) {
				throw new UpdateUserFailedException(context);
			}

			return UpdateUserResponse.create(updatedUser);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, request.email);
			}
			logger.error(error);
			throw error;
		}
	}

	private async getCurrentUser(id: string): Promise<UserEntity> {
		const request = FindUserByIdRequest.create(id);

		return (await this.finder.run(request)) as UserEntity;
	}
}
