import { UserEntity } from '../persistence/user.entity';

export class FindUserByEmailResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(foundUser: UserEntity): FindUserByEmailResponse {
		const { id, name, email } = foundUser;

		return new FindUserByEmailResponse(id, name, email);
	}
}
