import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../shared/interfaces/rpc-exception-data.interface';

export class UserWithIdNotExistsException extends RpcException {
	constructor(context: string, id: string) {
		const message = `User with id <${id}> not exists`;
		const code = HttpStatus.NOT_FOUND;
		const exceptionData = { code, context, message } as RpcExceptionData;

		super(exceptionData);
	}
}
