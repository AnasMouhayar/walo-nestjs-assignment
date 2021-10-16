import { Document } from 'mongoose';

export interface ITransfer extends Document {
  readonly amount: Number;
  readonly senderId: string;
  readonly receiverId: string;
  readonly date: Date;
}
