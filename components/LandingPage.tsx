
'use client';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LandingPage() {

  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/EntryPage");
    } else {
      router.push("/sign-in?redirect_url=/EntryPage");
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 dotted-background text-white">
      {/* 💥 Hero Section */}
      <section className="text-center mb-24">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-500">MiniMart</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          A minimal, seamless shopping experience for modern buyers.
        </p>
        <button onClick={handleClick} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition">
          Start Shopping
        </button>
      </section>

      {/* 🧾 About Section */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why MiniMart?</h2>
        <p className="text-gray-400 text-md">
          MiniMart is built for simplicity, speed, and trust. Whether you're looking for essentials
          or exploring new finds, our goal is to make your shopping journey smoother than ever.
        </p>
      </section>

      {/* ⚙️ Features Section */}
      <section className="max-w-6xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">🚀 Fast & Minimal</h3>
          <p className="text-gray-400">Built with modern tech for blazing-fast performance.</p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">🔒 Secure Checkout</h3>
          <p className="text-gray-400">Trustworthy payment experience with end-to-end protection.</p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">📦 Curated Products</h3>
          <p className="text-gray-400">Every item is hand-picked to ensure quality and value.</p>
        </div>
      </section>

      {/* 🛒 Call to Action Banner */}
      <section className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Ready to Shop?</h2>
        <p className="text-gray-300 mb-6">Start browsing and discover your next favorite product.</p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition">
          Explore Products
        </button>
      </section>
    </main>
  );
}
