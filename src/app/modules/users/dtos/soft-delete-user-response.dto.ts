export class SoftDeleteUserResponse {
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): SoftDeleteUserResponse {
		const message = `User with id <${id}> soft deleted`;

		return new SoftDeleteUserResponse(message);
	}
}
