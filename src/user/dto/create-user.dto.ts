export class UserCreateDto {
  readonly email: string;
  readonly password: string;
  readonly activationLink?: string;
}
