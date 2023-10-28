import { Prop, Schema } from '@nestjs/mongoose';
import { createAndModifyType } from '../basic.interface';
import { LogClass } from './log';
@Schema()
export class createdAndModified
  extends LogClass
  implements createAndModifyType
{
  @Prop({ required: true, default: () => Date() })
  createdAt: Date;
  @Prop({ required: true, default: 'SYS' })
  createdBy: string;
  @Prop({ required: true, default: () => Date() })
  updatedAt: Date;
  @Prop({ required: true, default: 'SYS' })
  updatedBy: string;
}
