import { UserEntity } from '../persistence/user.entity';

export class UpdateUserResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(updatedUser: UserEntity): UpdateUserResponse {
		const { id, name, email } = updatedUser;

		return new UpdateUserResponse(id, name, email);
	}
}
