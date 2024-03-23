import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../shared/interfaces/rpc-exception-data.interface';

export class UserWithEmailAlreadyExistsException extends RpcException {
	constructor(context: string, email: string) {
		const code = HttpStatus.BAD_REQUEST;
		const message = `User with email <${email}> already exists`;
		const exceptionData = { code, message, context } as RpcExceptionData;

		super(exceptionData);
	}
}
