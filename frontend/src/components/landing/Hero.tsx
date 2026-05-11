import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-1.5 bg-brand-600/10 border border-brand-600/20 rounded-full text-brand-400 text-sm">
          🚀 Now supporting 15+ platforms
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight">
          Stop Replying<br />Manually.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
          Let AI handle your business chats across <span className="text-brand-400 font-semibold">WhatsApp, Instagram, Telegram, Shopee</span> and 11 more platforms — all in one dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/register" className="btn-primary text-lg px-8 py-4">🚀 Start Free Trial</Link>
          <a href="#demo" className="btn-secondary text-lg px-8 py-4">📺 Watch Demo</a>
        </div>

        {/* Animated Chat Demo */}
        <div className="max-w-2xl mx-auto">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-500 text-sm ml-2">Live AutoMind Demo</span>
            </div>
            <div className="space-y-4">
              <ChatBubble platform="WhatsApp" sender="Customer" text="Kak, sepatu size 42 ada?" isUser />
              <ChatBubble platform="WhatsApp" sender="AutoMind AI" text="Ada kak! Size 42 ready stock. Warna: Hitam, Putih, Navy. Harga Rp 349.000. Mau langsung order? 😊" />
              <ChatBubble platform="Shopee" sender="Customer" text="Berapa harga 3 pcs?" isUser />
              <ChatBubble platform="Shopee" sender="AutoMind AI" text="Untuk 3 pcs harga Rp 135.000 (hemat Rp 15.000!). Free ongkir Jabodetabek! 🚚" />
            </div>
          </div>
        </div>

        <p className="text-gray-500 mt-8">Trusted by 2,000+ businesses across Southeast Asia</p>
      </div>
    </section>
  );
}

function ChatBubble({ platform, sender, text, isUser }: { platform: string; sender: string; text: string; isUser?: boolean }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? "bg-brand-600 text-white" : "bg-gray-800 text-gray-200"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">{platform}</span>
          <span className="text-xs text-gray-400">{sender}</span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
