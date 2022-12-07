export class GenerateTokenDto {
  email: string;
  id: string;
  isActivated: boolean;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}

export class TokensDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}
