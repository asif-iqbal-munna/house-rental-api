import { Document } from 'mongoose';

// Category Schema Definition
export interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
  status: boolean;
}
