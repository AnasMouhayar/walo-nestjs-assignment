import { Document } from 'mongoose';

export interface ICustomer extends Document {
  readonly name: String;
}
