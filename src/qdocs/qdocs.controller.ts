import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QdocsService } from './qdocs.service';
import { CreateQdocDto } from './dto/create-qdoc.dto';
import { UpdateQdocDto } from './dto/update-qdoc.dto';

@Controller('qdocs')
export class QdocsController {
  constructor(private readonly qdocsService: QdocsService) {}

  @Post()
  create(@Body() createQdocDto: CreateQdocDto) {
    return this.qdocsService.create(createQdocDto);
  }

  @Get()
  findAll() {
    return this.qdocsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qdocsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQdocDto: UpdateQdocDto) {
    return this.qdocsService.update(id, updateQdocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qdocsService.remove(id);
  }
}
