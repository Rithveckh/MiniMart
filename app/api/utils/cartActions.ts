import connectDB from "@/lib/mongoose";
import CartItem from "@/app/models/CartItem";
import { ObjectId } from "mongodb";

// Add product to cart
export async function addToCart(userId: string, productId: string, quantity: number = 1) {
  await connectDB();

  const existingItem = await CartItem.findOne({ userId, productId });

  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
    return existingItem;
  }

  const newItem = await CartItem.create({ userId, productId, quantity });
  return newItem;
}

// Fetch user's cart
export async function getCartItems(userId: string) {
  await connectDB();
  return await CartItem.find({ userId }).populate("productId");
}

// Remove item from cart
export async function removeFromCart(userId: string, productId: string) {
  await connectDB();
  return await CartItem.deleteOne({ userId, productId });
}
