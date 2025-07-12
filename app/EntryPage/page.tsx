"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function EntryPage() {
  const { user } = useUser();
  const displayName =
    user?.firstName?.trim() ||
    user?.username?.trim() ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "User";

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/store");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  // Apply filter on button click
  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category
        ? product.category.toLowerCase().includes(category.toLowerCase())
        : true;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  // Add to Cart Function
  const handleAddToCart = async (productId: string) => {
    if (!user?.id) {
      alert("Please sign in to add to cart");
      return;
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId: user.id,
        quantity: 1,
      }),
    });

    if (res.ok) {
      alert("Product added to cart!");
    } else {
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, {displayName} 👋</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search products..."
          className="w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          placeholder="Filter by category..."
          className="w-full sm:w-1/3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button variant="secondary" onClick={handleFilter}>
          Apply
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <Card key={product._id} className="bg-white text-black">
            <CardContent className="p-4">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-[180px] object-cover mb-4"
                />
              </Link>

              <Link href={`/product/${product._id}`}>
                <h2 className="text-lg font-semibold hover:underline">
                  {product.name}
                </h2>
              </Link>

              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-gray-800 mt-2 font-bold">₹{product.price}</p>
              <p
                className={`text-sm mt-1 ${
                  product.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
