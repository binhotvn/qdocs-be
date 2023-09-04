import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

const privateKeyPath = './private_key/key_for_jwt';

function generateRSAKey() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // You can adjust the key size as needed
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  return { privateKey, publicKey };
}

async function bootstrap() {
  
  console.log("Starting NestJS Services....")
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3002);
}
 bootstrap();
