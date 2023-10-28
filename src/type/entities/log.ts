import { Prop, Schema } from '@nestjs/mongoose';
import { LogType } from '../basic.interface';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class LogClass implements LogType {
  @Prop({ required: true, default: () => uuidv4 })
  _id: string;
  @Prop({ required: true, default: () => Date() })
  createdAt: Date;
  @Prop({ required: true, default: 'SYS' })
  createdBy: string;
  @Prop({ required: true, default: () => Date() })
  content?: string;
  @Prop({ required: true, default: 'INFO' })
  type: string;

  constructor(content?: string, type?: string) {
    this.content = content;
    this.type = type;
  }
}
