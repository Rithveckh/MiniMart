import connectDB from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";
import { ProductData } from "@/app/models/Product";

type ProductWithId = ProductData & { _id: string };

export default async function ProductPage({ params }: { params: { id: string } }) {
  await connectDB();

  const rawProduct = await Product.findById(params.id).lean();

  if (!rawProduct) return notFound();

  // ✅ Build typed product manually
  const typedProduct: ProductWithId = {
    _id: rawProduct._id.toString(),
    name: rawProduct.name,
    description: rawProduct.description,
    price: rawProduct.price,
    image: rawProduct.image,
    category: rawProduct.category,
    inStock: rawProduct.inStock,
  };

  return <ProductPageClient product={typedProduct} />;
}
