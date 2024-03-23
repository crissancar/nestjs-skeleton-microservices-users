import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserByEmailRequest {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	constructor(email: string) {
		this.email = email;
	}

	static create(email: string): FindUserByEmailRequest {
		return new FindUserByEmailRequest(email);
	}
}
