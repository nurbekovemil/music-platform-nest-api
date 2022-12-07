import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { GenerateTokenDto } from 'src/token/dto/tokens.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}
  async registration(dto: UserCreateDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        `Email ${dto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const activationLink = uuid.v4();
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(dto.email, activationLink);
    const userDto = new GenerateTokenDto(user);
    const tokens = await this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      tokens,
      user: userDto,
    };
  }
  async activationLink(link: string) {
    return await this.userService.activateUser(link);
  }
  async login(dto: UserCreateDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
    const isPassEquel = await bcrypt.compare(dto.password, user.password);
    if (!isPassEquel) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const userDto = new GenerateTokenDto(user);
    const tokens = await this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.userService.findUserById(userData.id);
    const userDto = new GenerateTokenDto(user);
    const tokens = await this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      tokens,
      user: userDto,
    };
  }
}
