import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

export default mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);
