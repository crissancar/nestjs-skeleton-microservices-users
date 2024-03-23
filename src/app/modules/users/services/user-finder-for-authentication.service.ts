import { Inject, Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from '../../shared/exceptions/invalid-credentials.exception';
import { usersConfig } from '../config/users.config';
import { FindUserByEmailRequest } from '../dtos/find-user-by-email-request.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';

const { finderForAuthentication, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = finderForAuthentication.constants;

@Injectable()
export class UserFinderForAuthentication {
	constructor(@Inject(repositoryInterface) private readonly repository: UserRepository) {}

	async run(request: FindUserByEmailRequest): Promise<UserEntity> {
		const foundUser = await this.repository.findByEmail(request.email);
console.log(foundUser)
		if (!foundUser) {
			throw new InvalidCredentialsException(context);
		}

		return foundUser;
	}
}
