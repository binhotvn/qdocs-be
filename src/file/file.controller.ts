import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
@Controller('file')
export class FileController {
  @Post('editor')
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      dynamicPath: 'public',
      randomFilename: true,
      limits: { fileSize: 7 * 1024 * 1024 },
    }),
  )
  fileUpload(@UploadedFile() image) {
    if (image !== undefined) {
      return { location: image.Location };
    } else {
      throw new BadRequestException('FILES_ATTACH_EMPTY');
    }
  }
  @Post('origin')
  @UseInterceptors(
    AmazonS3FileInterceptor('image', {
      dynamicPath: 'public',
      randomFilename: true,
      limits: { fileSize: 7 * 1024 * 1024 },
    }),
  )
  originFile(@UploadedFile() image) {
    if (image !== undefined) {
      return image;
    } else {
      throw new BadRequestException('FILES_ATTACH_EMPTY');
    }
  }
  @Post('upload')
  @UseInterceptors(
    AmazonS3FileInterceptor('image', {
      dynamicPath: 'public',
      randomFilename: true,
      limits: { fileSize: 7 * 1024 * 1024 },
      resizeMultiple: [
        { suffix: 'sm', height: 512 },
        { suffix: 'md', height: 1024 },
        { suffix: 'lg', height: 2048 },
        { suffix: 'thum', height: 1024, width: 1024 },
      ],
    }),
  )
  uploadFile(@UploadedFile() image) {
    if (image !== undefined) {
      let key = image.sm.key.split('-');
      key.pop();
      key = key.join('-');
      const files = {
        sm: {
          url: image.sm.Location,
          path: image.sm.key,
        },
        md: {
          url: image.md.Location,
          path: image.md.key,
        },
        lg: {
          url: image.lg.Location,
          path: image.lg.key,
        },
        thum: {
          url: image.thum.Location,
          path: image.thum.key,
        },
        key: key,
      };
      return files;
    } else {
      throw new BadRequestException('FILES_ATTACH_EMPTY');
    }
  }
}
