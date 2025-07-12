import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import CartItem from "@/app/models/CartItem";
import Product from "@/app/models/Product";

export async function POST(req: Request) {
  await connectDB();
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const existing = await CartItem.findOne({ userId, productId });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return NextResponse.json({ message: "Cart updated", item: existing });
  }

  const newItem = new CartItem({ userId, productId, quantity });
  await newItem.save();
  return NextResponse.json({ message: "Added to cart", item: newItem });
}
