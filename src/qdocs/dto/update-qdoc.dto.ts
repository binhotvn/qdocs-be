import { PartialType } from '@nestjs/mapped-types';
import { CreateQdocDto } from './create-qdoc.dto';

export class UpdateQdocDto extends PartialType(CreateQdocDto) {}
