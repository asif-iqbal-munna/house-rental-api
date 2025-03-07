import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre('find', function () {
  this.select('-__v');
});

export const Category = model<ICategory>('Category', categorySchema);
