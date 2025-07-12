'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductData } from "@/app/models/Product";
import { toast } from "sonner"; // ✅ Modern toast notifications

// ✅ Explicitly ensure `_id` is required for product passed from server
type ProductWithId = ProductData & { _id: string };

export default function ProductPageClient({ product }: { product: ProductWithId }) {
  const { user } = useUser(); // Clerk user info
  const [loading, setLoading] = useState(false); // Button loading state
  const router = useRouter(); // For redirection, if needed in future

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add to cart.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,        // From Clerk
          productId: product._id, // From MongoDB
          quantity: 1,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // ✅ Success toast with icon and duration
        toast.success("Product added to cart", {
          duration: 3000,
          icon: "🛒",
        });
        // ✅ Native browser alert
        window.alert("Product added to cart!");
      } else {
        toast.error(data.error || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-zinc-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={400}
          className="rounded-lg object-cover w-full"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-300 mb-2">{product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-400 mb-4">₹{product.price}</p>
          <p className={`mb-4 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Add to Cart Button */}
          <Button
            disabled={loading || !product.inStock}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddToCart}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
