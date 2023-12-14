import { Injectable } from '@nestjs/common';
import { CreateQdocDto } from './dto/create-qdoc.dto';
import { UpdateQdocDto } from './dto/update-qdoc.dto';
import { UtilsService } from 'src/utils/utils.service';
import { InjectModel } from '@nestjs/mongoose';
import { QdocDocument } from './entities/qdoc.entity';
import { Model } from 'mongoose';

@Injectable()
export class QdocsService {
  // build moongose model 'post'
  constructor(
    @InjectModel('qdoc') private readonly QdocModel: Model<QdocDocument>,
    private readonly utils: UtilsService,
  ) {}
  create(createQdocDto: CreateQdocDto) {
    const news = new this.QdocModel(createQdocDto);
    return news.save();
  }

  findAll() {
    return this.QdocModel.find().exec();
  }

  findOne(id: string) {
    return this.QdocModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateQdocDto: UpdateQdocDto) {
    return this.QdocModel.updateOne({ _id: id }, updateQdocDto).exec();
  }

  remove(id: string) {
    return this.QdocModel.deleteOne({ _id: id }).exec();
  }
}
