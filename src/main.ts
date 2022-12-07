import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: process.env.CLIENT_HOST,
      credentials: true,
    });
    app.use(cookieParser());
    await app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}...`),
    );
  } catch (error) {}
};
start();
