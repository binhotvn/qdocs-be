import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppInfo } from './app.info';

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
function setup() {
  if (fs.existsSync(privateKeyPath)) {
    console.log(`Private key exists at ${privateKeyPath}`);
  } else {
    console.log(`Private key does not exist. Generating...`);
    const { privateKey } = generateRSAKey();

    fs.mkdirSync(path.dirname(privateKeyPath), { recursive: true });
    fs.writeFileSync(privateKeyPath, privateKey, 'utf-8');

    console.log(`Private key generated and saved to ${privateKeyPath}`);
  }
}
setup();

async function bootstrap() {
  console.log(`Starting ${AppInfo.name} Services....`);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
