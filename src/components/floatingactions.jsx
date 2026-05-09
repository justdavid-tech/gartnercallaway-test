import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-50">

      {/* WhatsApp Button */}
      <div className="relative group">
        <a
          href="https://wa.me/+2347049795940"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <div className="relative group">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:animate-bounce"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          {/* Tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
            Back to top
          </span>
        </div>
      )}
    </div>
  );
}