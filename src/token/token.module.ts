import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({}),
  ],
  exports: [TokenService],
})
export class TokenModule {}
