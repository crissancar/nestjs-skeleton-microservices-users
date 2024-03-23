import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserPasswordUpdater } from '../services/user-password-updater.service';
import { UserUpdater } from '../services/user-updater.service';

const { globalRoute, putController } = usersConfig;
const { context, routes, param } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPutController {
	constructor(
		private readonly userUpdater: UserUpdater,
		private readonly userPasswordUpdater: UserPasswordUpdater,
	) {}

	@MessagePattern('user.update')
	async updateUser(@Payload() payload: any): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		const request = payload.data.attributes as UpdateUserRequest;

		return this.userUpdater.run(request);
	}

	@MessagePattern('user.updatePassword')
	async updateUserPassword(@Payload() payload: any): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		const request = payload.data.attributes as UpdateUserPasswordRequest;

		return this.userPasswordUpdater.run(request);
	}
}
