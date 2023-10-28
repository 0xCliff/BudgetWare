import { Category } from '../schemas/category';

const getCategory = (name: string) => Category.findOne({ name });
const createCategory = (values: Record<string, any>) =>
  new Category(values).save().then((category: any) => category.toObject());

export { createCategory, getCategory };
