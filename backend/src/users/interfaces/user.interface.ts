import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';

export interface IUser extends Omit<User, '_id'>, Document {
  toObject(): User;
}
