import { GenerateTokenDto, TokensDto } from 'src/token/dto/tokens.dto';

export type RegistrationDto = {
  tokens: TokensDto;
  user: GenerateTokenDto;
};
