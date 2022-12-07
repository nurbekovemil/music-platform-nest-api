import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { GenerateTokenDto, TokensDto } from './dto/tokens.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private jwtService: JwtService,
  ) {}
  async generateToken(payload: GenerateTokenDto): Promise<TokensDto> {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const token = await this.tokenModel.findOne({ refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = await this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  async refreshToken() {}
}
