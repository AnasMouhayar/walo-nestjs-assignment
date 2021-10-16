import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop()
  balance: Number;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: string
}

export const AccountSchema = SchemaFactory.createForClass(Account);

