import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { LoggerFactory } from './app/modules/shared/services/logger-factory.service';
import { WelcomeLogs } from './config/logger/welcome-logs.config';

const logger = LoggerFactory.create('');

const queues = [
	'create_user_queue',
	'find_user_queue',
	'find_user_for_authentication_queue',
	'find_user_for_strategy_queue',
	'find_users_by_criteria_queue',
	'update_user_queue',
	'update_user_password_queue',
	'soft_delete_user_queue',
];

async function bootstrap(queue: string): Promise<void> {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://qagxqjke:XuoOJiC3RCN2C0E_oNuEWv1KZ6y4NGem@rat.rmq2.cloudamqp.com/qagxqjke'],
			queue,
			queueOptions: { durable: false },
			// prefetchCount: 1,
			// headers: {}
		},
	});

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Launch the app
	await app.listen();

	// Welcome logs
	WelcomeLogs.run(queue);
}

queues.forEach((queue) => {
	void bootstrap(queue);
});
