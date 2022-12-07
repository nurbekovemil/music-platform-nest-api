import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Param,
  Redirect,
  Req,
  HttpCode,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserCreateDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/registration')
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: UserCreateDto,
  ) {
    const data = await this.authService.registration(dto);
    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }

  @Post('/login')
  async login(
    @Body() dto: UserCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(dto);
    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const data = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return data;
  }
  @Get('/activate/:link')
  @Redirect(`${process.env.CLIENT_HOST}`, 301)
  activateByLink(@Param('link') link: string) {
    return this.authService.activationLink(link);
  }
  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const data = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
}
