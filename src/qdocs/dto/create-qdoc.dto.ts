import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Attr } from '../entities/qdoc.entity';
export class CreateQdocDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  filename: string;
  @IsNotEmpty()
  @Type(() => Attr)
  @ValidateNested({ each: true })
  attr: Attr[];
}
