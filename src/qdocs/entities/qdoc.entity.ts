import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema } from '@nestjs/mongoose';
import { AttrEnum, AutoAttrEnum } from 'src/type/enum/attr.enum';
import { Type } from 'class-transformer';
@Schema()
export class Attr {
  @Prop({ required: true, default: '' })
  @IsNotEmpty()
  name: string;
  @Prop({ required: true, default: '' })
  @IsNotEmpty()
  var: string;
  @Prop({ required: true, default: '' })
  @IsNotEmpty()
  default: string;
  @Prop({ required: true, default: AttrEnum.STRING })
  @IsEnum(AttrEnum)
  type: string;
  @Prop({ required: true, default: AutoAttrEnum.NONE })
  @IsEnum(AutoAttrEnum)
  auto: string;
}

@Schema()
export class Qdoc {
  @IsUUID()
  @Prop({ required: true, default: () => uuidv4() })
  _id: string;

  @Prop({ required: true, default: '' })
  filename: string;
  @Prop({ required: true, default: '' })
  name: string;

  @Prop({ required: true, default: '' })
  description: string;

  @Prop({ required: true, default: '' })
  @Type(() => Attr)
  @ValidateNested({ each: true })
  attr: Attr[];
}

import { SchemaFactory } from '@nestjs/mongoose';

export type QdocDocument = Qdoc & Document;

export const QdocSchema = SchemaFactory.createForClass(Qdoc);
