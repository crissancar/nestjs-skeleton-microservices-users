import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { DeleteUserRequest } from '../dtos/delete-user-request.dto';
import { DeleteUserResponse } from '../dtos/delete-user-response.dto';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { deleter, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = deleter.constants;
const { responseLog } = deleter.logs;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: DeleteUserRequest): Promise<DeleteUserResponse> {
		const deletedUser = await this.repository.delete(request.id);

		if (!deletedUser) {
			throw new UserWithIdNotExistsException(context, request.id);
		}

		logger.log(responseLog(request.id));

		return DeleteUserResponse.create(request.id);
	}
}
