import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  name: String;

  // @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  // organizations: string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);