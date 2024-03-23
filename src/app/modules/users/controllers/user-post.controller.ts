import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserCreator } from '../services/user-creator.service';

const { globalRoute, postController } = usersConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPostController {
	constructor(private readonly creator: UserCreator) {}

	@MessagePattern('user.create')
	async run(@Payload() payload: any): Promise<CreateUserResponse> {
		logger.log(requestLog);

		const request = payload.data.attributes as CreateUserRequest;

		return this.creator.run(request);
	}
}
