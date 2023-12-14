import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { multerConfig } from './multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@UploadedFile() file: Multer.File): any {
    if (file) {
      return { statusCode: 200, messages: 'ok', data: file };
    } else {
      return { statusCode: 400, messages: 'error', data: null };
    }
  }
}
