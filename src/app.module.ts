import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.SMTP_EMAIL}:${process.env.SMTP_PASS}@smtp.mail.ru`,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://emil9898:Emil9898@cluster0.hbhhbv6.mongodb.net/?retryWrites=true&w=majority',
    ),

    TrackModule,
    FileModule,
    UserModule,
    AuthModule,
    MailModule,
    TokenModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
