import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UtilsService } from './utils/utils.service';
import { FileModule } from './file/file.module';
import { QdocsModule } from './qdocs/qdocs.module';
import { GenModule } from './gen/gen.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/  '), // Specify the path to your static files directory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register(),
    UsersModule,
    AuthModule,
    FileModule,
    QdocsModule,
    GenModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
