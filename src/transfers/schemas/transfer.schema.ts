import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Transfer extends Document {
  @Prop()
  amount: Number;

  @Prop()
  senderId: string;

  @Prop()
  receiverId: string;

  @Prop()
  date: Date;

  // @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  // organizations: string
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);