import { Inject, Injectable } from '@nestjs/common';

import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { UpdateUserForgotPasswordRequest } from '../dtos/update-user-forgot-password-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserFinderById } from './user-finder-by-id.service';

const { repositoryInterface } = usersConfig.repository;

@Injectable()
export class UserForgotPasswordUpdater {
	constructor(
		@Inject(repositoryInterface) private readonly repository: UserRepository,
		private readonly finder: UserFinderById,
	) {}

	async run(request: UpdateUserForgotPasswordRequest): Promise<UpdateUserResponse> {
		const currentUser = await this.getCurrentUser(request.id);

		const updatedUser = await this.repository.updatePassword(currentUser, request);

		return UpdateUserResponse.create(updatedUser);
	}

	private async getCurrentUser(id: string): Promise<UserEntity> {
		const request = FindUserByIdRequest.create(id);

		return (await this.finder.run(request)) as UserEntity;
	}
}
