import { IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { InputGen } from '../entities/gen.entity';
import { Type } from 'class-transformer';

export class CreateGenDto {
  @IsNotEmpty({ message: 'ID_QDOC_IS_REQUIRED' })
  id_qdoc: string;

  @IsNotEmpty({ message: 'NAME_IS_REQUIRED' })
  name: string;

  @IsNotEmpty({ message: 'DESCRIPTION_IS_REQUIRED' })
  description: string;

  @IsNotEmpty({ message: 'VALUE_IS_REQUIRED' })
  @ValidateNested({ each: true })
  @Type(() => InputGen)
  value: InputGen[];
}
