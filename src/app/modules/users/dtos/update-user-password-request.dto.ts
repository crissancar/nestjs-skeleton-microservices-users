import { AuthenticatedUser } from '../../shared/dtos/authenticated-user.dto';

export class UpdateUserPasswordRequest {
	readonly id: string;

	readonly authUser: AuthenticatedUser;

	readonly oldPassword: string;

	readonly password: string;
}
