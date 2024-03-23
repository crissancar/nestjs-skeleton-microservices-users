import { HttpException, HttpStatus } from '@nestjs/common';

import { RpcExceptionData } from '../interfaces/rpc-exception-data.interface';

export class InvalidCredentialsException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid credentials';
		const exceptionData = { message, context } as RpcExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
