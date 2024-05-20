import { Injectable } from '@nestjs/common';
import { CreateGenDto } from './dto/create-gen.dto';
import { UpdateGenDto } from './dto/update-gen.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenDocument, GenResult } from './entities/gen.entity';
import { QdocsService } from 'src/qdocs/qdocs.service';
import createReport from 'docx-templates';
import * as fs from 'fs';
@Injectable()
export class GenService {
  constructor(
    @InjectModel('gens') private readonly genModel: Model<GenDocument>,
    private readonly Qdoc: QdocsService,
  ) {}
  async create(createGenDto: CreateGenDto) {
    const qdocQuery = await this.Qdoc.findOne(createGenDto.id_qdoc);
    if (!qdocQuery) {
      throw new Error('QDOC_NOT_FOUND');
    }
    const newAttr = [];
    qdocQuery.attr.map((attr) => {
      const filtered = createGenDto.value.filter((value) => {
        if (attr.var === value.var) {
          let raw = value.raw;

          if (value.raw === undefined || value.raw === '') raw = value.value;

          newAttr.push({ ...attr, value: value.value, raw: raw });
          return value;
        }
      });
      if (filtered.length === 0) {
        throw new Error('ATTRIBUTE_NOT_FOUND');
      }
    });

    const newDocsFiltered = {
      name: createGenDto.name,
      filename: qdocQuery.filename,
      description: createGenDto.description || '',
      id_qdoc: qdocQuery._id,
      attr: newAttr,
    };
    const newDocs = new this.genModel(newDocsFiltered);
    return newDocs.save();
  }
  async createDownloadable(id: string) {
    const gen = await this.genModel.findOne({ _id: id }).exec();
    if (!gen) {
      throw new Error('GEN_NOT_FOUND');
    }
    console.log(process.cwd() + '/public/file/' + gen.filename);
    const template = fs.readFileSync(
      process.cwd() + '/public/file/' + gen.filename,
    );
    const docx = {};
    docx['ngay'] = (new Date()).getDate();
    docx['thang'] = (new Date()).getMonth();
    docx['nam'] = (new Date()).getFullYear();

    gen.attr.map((attr: GenResult) => {
      docx[attr.var] = attr.value;
    });

    const buffer = await createReport({
      template,
      data: docx,
      cmdDelimiter: ['{{', '}}'],
    });
    fs.writeFileSync(
      process.cwd() + '/public/fout/' + gen._id + '-' + gen.filename,
      buffer,
    );

    return {
      path: process.cwd() + '/public/fout/' + gen._id + '-' + gen.filename,
      filename: gen.filename,
    };
  }
  findAll() {
    return this.genModel.find().exec();
  }

  findOne(id: string) {
    return this.genModel.findOne({ id_qdoc: id }).exec();
  }

  update(id: string, updateGenDto: UpdateGenDto) {
    return this.genModel.updateOne({ _id: id }, updateGenDto).exec();
  }

  remove(id: string) {
    return this.genModel.deleteOne({ _id: id }).exec();
  }
}
