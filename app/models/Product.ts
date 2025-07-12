import mongoose, { Schema, Document, model } from "mongoose";

// ✅ Define base Product data without _id
export interface ProductData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

// ✅ Mongoose model includes _id via Document
export interface ProductDocument extends ProductData, Document {}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: String,
    inStock: Boolean,
  },
  { collection: "products" }
);

// ✅ Reuse existing model if already compiled
const Product = mongoose.models.Product || model<ProductDocument>("Product", ProductSchema);

export default Product;
