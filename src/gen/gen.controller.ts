import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Header,
} from '@nestjs/common';
import { Response } from 'express';

import { GenService } from './gen.service';
import { CreateGenDto } from './dto/create-gen.dto';
import { UpdateGenDto } from './dto/update-gen.dto';

@Controller('gen')
export class GenController {
  constructor(private readonly genService: GenService) {}

  @Post()
  create(@Body() createGenDto: CreateGenDto) {
    return this.genService.create(createGenDto);
  }

  @Get(':id/download')
  async getDownload(@Param('id') id: string, @Res() res: Response) {
    try {
      const buffer = await this.genService.createDownloadable(id);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + buffer.filename,
      );
      res.sendFile(buffer.path);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.genService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenDto: UpdateGenDto) {
    return this.genService.update(id, updateGenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genService.remove(id);
  }
}
