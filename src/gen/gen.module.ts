import { Module } from '@nestjs/common';
import { GenService } from './gen.service';
import { GenController } from './gen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenSchema } from './entities/gen.entity';
import { QdocsModule } from 'src/qdocs/qdocs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'gens', schema: GenSchema, collection: 'gens' },
    ]),
    QdocsModule,
  ],
  controllers: [GenController],
  providers: [GenService],
})
export class GenModule {}
