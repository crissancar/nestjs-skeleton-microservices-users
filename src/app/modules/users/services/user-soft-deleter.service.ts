import { Inject, Injectable } from '@nestjs/common';

import { usersConfig } from '../config/users.config';
import { SoftDeleteUserRequest } from '../dtos/soft-delete-user-request.dto';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { softDeleter, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = softDeleter.constants;

@Injectable()
export class UserSoftDeleter {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: SoftDeleteUserRequest): Promise<SoftDeleteUserResponse> {
		const softDeletedUser = await this.repository.softDelete(request.id);

		if (!softDeletedUser) {
			throw new UserWithIdNotExistsException(context, request.id);
		}

		return SoftDeleteUserResponse.create(request.id);
	}
}
