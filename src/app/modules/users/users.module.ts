import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usersConfig } from './config/users.config';
import { UserDeleteController } from './controllers/user-delete.controller';
import { UserGetController } from './controllers/user-get.controller';
import { UserPostController } from './controllers/user-post.controller';
import { UserPutController } from './controllers/user-put.controller';
import { TypeOrmUserRepository } from './persistence/typeorm-user.repository';
import { UserEntity } from './persistence/user.entity';
import { UserEntitySubscriber } from './persistence/user-entity.subscriber';
import { UserCreator } from './services/user-creator.service';
import { UserDeleter } from './services/user-deleter.service';
import { UserFinderByEmail } from './services/user-finder-by-email.service';
import { UserFinderById } from './services/user-finder-by-id.service';
import { UserFinderForAuthentication } from './services/user-finder-for-authentication.service';
import { UserFinderForStrategy } from './services/user-finder-for-strategy.service';
import { UserForgotPasswordUpdater } from './services/user-forgot-password-updater.service';
import { UserPasswordUpdater } from './services/user-password-updater.service';
import { UserSoftDeleter } from './services/user-soft-deleter.service';
import { UserUpdater } from './services/user-updater.service';
import { UsersFinderByCriteria } from './services/users-finder-by-criteria.service';

const { repositoryInterface } = usersConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserPostController, UserPutController, UserGetController, UserDeleteController],
	providers: [
		UserCreator,
		UserDeleter,
		UserEntitySubscriber,
		UsersFinderByCriteria,
		UserFinderByEmail,
		UserFinderById,
		UserFinderForAuthentication,
		UserFinderForStrategy,
		UserForgotPasswordUpdater,
		UserPasswordUpdater,
		UserSoftDeleter,
		UserUpdater,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
	exports: [UserFinderForAuthentication, UserFinderForStrategy, UserForgotPasswordUpdater],
})
export class UsersModule {}
