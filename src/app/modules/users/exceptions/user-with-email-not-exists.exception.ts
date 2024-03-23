import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../shared/interfaces/rpc-exception-data.interface';

export class UserWithEmailNotExistsException extends RpcException {
	constructor(context: string, email: string) {
		const message = `User with email <${email}> not exists`;
		const code = HttpStatus.NOT_FOUND;
		const exceptionData = { code, message, context } as RpcExceptionData;

		super(exceptionData);
	}
}
