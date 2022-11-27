import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://emil9898:Emil9898@cluster0.hbhhbv6.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TrackModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
