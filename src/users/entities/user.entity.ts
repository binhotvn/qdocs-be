import { Prop, Schema } from '@nestjs/mongoose';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { createdAndModified } from 'src/type/entities/createModify';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class User extends createdAndModified {
  @Prop({ required: true, default: () => uuidv4() })
  _id: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsPhoneNumber('VN')
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: '-' })
  token: string;
  @Prop({ required: true, default: [''] })
  roles: string[];
  @Prop({ required: true, default: new Date(0) })
  lastLogin: Date;
}
