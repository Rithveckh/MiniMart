import connectDB from "@/lib/mongoose";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct);
  } catch (err) {
    console.error("POST /api/store error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
