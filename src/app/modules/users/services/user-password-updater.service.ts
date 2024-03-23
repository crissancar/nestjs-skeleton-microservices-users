import { Inject, Injectable } from '@nestjs/common';

import { AuthenticatedUser } from '../../shared/dtos/authenticated-user.dto';
import { InvalidCredentialsException } from '../../shared/exceptions/invalid-credentials.exception';
import { usersConfig } from '../config/users.config';
import { FindUserByEmailRequest } from '../dtos/find-user-by-email-request.dto';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserFinderForAuthentication } from './user-finder-for-authentication.service';

const { passwordUpdater, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = passwordUpdater.constants;

@Injectable()
export class UserPasswordUpdater {
	constructor(
		@Inject(repositoryInterface) private readonly repository: UserRepository,
		private readonly finder: UserFinderForAuthentication,
	) {}

	async run(request: UpdateUserPasswordRequest): Promise<UpdateUserResponse> {
		const { authUser, oldPassword } = request;

		const currentUser = await this.getCurrentUser(authUser);

		this.checkOldPassword(oldPassword, currentUser);

		const updatedUser = await this.repository.updatePassword(currentUser, request);

		return UpdateUserResponse.create(updatedUser);
	}

	private async getCurrentUser(authUser: AuthenticatedUser): Promise<UserEntity> {
		const { email } = authUser;

		const request = FindUserByEmailRequest.create(email);

		return this.finder.run(request);
	}

	private checkOldPassword(oldPassword: string, currentUser: UserEntity): void {
		const { password: currentPassword } = currentUser;

		if (!UserEntity.comparePasswords(oldPassword, currentPassword)) {
			throw new InvalidCredentialsException(context);
		}
	}
}
