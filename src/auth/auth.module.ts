import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, MailModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
