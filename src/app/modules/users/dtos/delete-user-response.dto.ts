export class DeleteUserResponse {
	readonly message: string;

	constructor(message: string) {
		this.message = message;
	}

	static create(id: string): DeleteUserResponse {
		const message = `User with id <${id}> deleted`;

		return new DeleteUserResponse(message);
	}
}
