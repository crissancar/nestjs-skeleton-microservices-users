import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { UserEntity } from '../persistence/user.entity';

export class FindUserForStrategyResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly audiences: Array<UserAudiences>;

	constructor(id: string, name: string, email: string, audiences: Array<UserAudiences>) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.audiences = audiences;
	}

	static create(foundUser: UserEntity): FindUserForStrategyResponse {
		const { id, name, email, audiences } = foundUser;

		return new FindUserForStrategyResponse(id, name, email, audiences);
	}
}
