import { Document } from 'mongoose';

export interface IAccount extends Document {
  readonly balance: Number;
}
