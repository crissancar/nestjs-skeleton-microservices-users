import { UserEntity } from '../persistence/user.entity';

export class CreateUserResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(createdUser: UserEntity): CreateUserResponse {
		const { id, name, email } = createdUser;

		return new CreateUserResponse(id, name, email);
	}
}
