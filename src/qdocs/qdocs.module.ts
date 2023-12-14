import { Module } from '@nestjs/common';
import { QdocsService } from './qdocs.service';
import { QdocsController } from './qdocs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QdocSchema } from './entities/qdoc.entity';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'qdoc', schema: QdocSchema, collection: 'qdoc' },
    ]),
  ],
  controllers: [QdocsController],
  providers: [QdocsService, UtilsService],
  exports: [QdocsService],
})
export class QdocsModule {}
