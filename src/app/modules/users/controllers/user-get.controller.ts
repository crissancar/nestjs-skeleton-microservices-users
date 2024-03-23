import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../shared/services/logger-factory.service';
import { usersConfig } from '../config/users.config';
import { FindUserByEmailRequest } from '../dtos/find-user-by-email-request.dto';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UserFinderById } from '../services/user-finder-by-id.service';
import { UserFinderForAuthentication } from '../services/user-finder-for-authentication.service';
import { UserFinderForStrategy } from '../services/user-finder-for-strategy.service';
import { UsersFinderByCriteria } from '../services/users-finder-by-criteria.service';

const { globalRoute, getController } = usersConfig;
const { context, routes, params } = getController.constants;
const { find, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserGetController {
	constructor(
		private readonly finderById: UserFinderById,
		private readonly finderForAuthentication: UserFinderForAuthentication,
		private readonly finderForStrategy: UserFinderForStrategy,
		private readonly finderByCriteria: UsersFinderByCriteria,
	) {}

	@MessagePattern('user.find')
	async findById(@Payload() payload: any): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const request = payload.data.attributes as FindUserByIdRequest;

		return await this.finderById.run(request);
	}

	@MessagePattern('user.findForStrategy')
	async findForStrategy(@Payload() payload: any): Promise<FindUserByIdResponse> {
		logger.log('Find for authentication');

		const request = payload.data.attributes as FindUserByIdRequest;

		return this.finderForStrategy.run(request);
	}

	@MessagePattern('user.find.for.authentication')
	async findByEmail(@Payload() payload: any): Promise<FindUserByIdResponse> {
		logger.log('Find for authentication');

		const request = payload.data.attributes as FindUserByEmailRequest;

		return this.finderForAuthentication.run(request);
	}

	async findByCriteria(@Payload() payload: any): Promise<FindUsersByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		const request = payload.data.attributes as FindUsersByCriteriaRequest;

		return this.finderByCriteria.run(request);
	}
}
