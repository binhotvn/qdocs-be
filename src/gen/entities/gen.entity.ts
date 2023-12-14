import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema } from '@nestjs/mongoose';
import { AttrEnum, AutoAttrEnum } from 'src/type/enum/attr.enum';
import { Type } from 'class-transformer';
import { createdAndModified } from 'src/type/entities/createModify';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GenResult {
  @Prop({ required: true, default: '' })
  @IsNotEmpty()
  name: string;
  @Prop({ required: true, default: '' })
  @IsNotEmpty()
  var: string;
  @Prop({ required: true, default: AttrEnum.STRING })
  @IsEnum(AttrEnum)
  type: string;

  @Prop({ required: true, default: '' })
  value: string;

  @Prop({ required: true, default: AutoAttrEnum.NONE })
  @IsEnum(AutoAttrEnum)
  auto: string;
}
@Schema()
export class InputGen {
  @IsNotEmpty()
  @Prop({ required: true, enum: AttrEnum, default: AttrEnum.STRING })
  var: string;
  @IsNotEmpty()
  @Prop({ required: true, enum: AttrEnum, default: AttrEnum.STRING })
  value: string;

  @Prop({ required: true, default: '-' })
  raw: string;
}
@Schema()
export class Gen extends createdAndModified {
  @IsUUID()
  @Prop({ required: true, default: () => uuidv4() })
  _id: string;
  @IsUUID()
  @Prop({ required: true, default: () => uuidv4() })
  id_qdoc: string;

  @Prop({ required: true, default: '' })
  filename: string;
  @Prop({ required: true, default: '' })
  name: string;

  @Prop({ required: true, default: '' })
  description: string;

  @Prop({ required: true, default: '' })
  @Type(() => GenResult)
  @ValidateNested({ each: true })
  attr: GenResult[];
}

export type GenDocument = Gen & Document;

export const GenSchema = SchemaFactory.createForClass(Gen);
