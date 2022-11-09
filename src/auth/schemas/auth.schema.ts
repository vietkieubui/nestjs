import { Document } from 'mongoose';

export interface Auth extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}
