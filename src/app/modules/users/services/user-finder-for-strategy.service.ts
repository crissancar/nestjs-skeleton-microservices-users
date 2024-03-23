import { Inject, Injectable } from '@nestjs/common';

import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserForStrategyResponse } from '../dtos/find-user-for-strategy-response.dto';
import { UserWithIdNotExistsException } from '../exceptions/user-with-id-not-exists.exception';
import { UserRepository } from '../repositories/user.repository';

const { finderForStrategy, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = finderForStrategy.constants;

@Injectable()
export class UserFinderForStrategy {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByIdRequest): Promise<FindUserForStrategyResponse> {
		const foundUser = await this.repository.findById(request.id);

		if (!foundUser) {
			throw new UserWithIdNotExistsException(context, request.id);
		}

		return FindUserForStrategyResponse.create(foundUser);
	}
}
