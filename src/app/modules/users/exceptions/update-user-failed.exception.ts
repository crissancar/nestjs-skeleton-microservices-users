import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../shared/interfaces/rpc-exception-data.interface';

export class UpdateUserFailedException extends RpcException {
	constructor(context: string) {
		const message = 'Update user failed';
		const code = HttpStatus.BAD_REQUEST;
		const exceptionData = { code, message, context } as RpcExceptionData;

		super(exceptionData);
	}
}
