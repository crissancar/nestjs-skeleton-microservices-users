import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserByIdRequest {
	@IsNotEmpty()
	@IsString()
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): FindUserByIdRequest {
		return new FindUserByIdRequest(id);
	}
}
