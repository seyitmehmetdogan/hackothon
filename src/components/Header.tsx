"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const promoMessages = [
  "🎉 İkinci Ürüne %50 İndirim — Daha Ucuz Ürüne Uygulanır",
  "✨ Ücretsiz Kargo · 30 Gün İade Garantisi",
  "💎 Aura Wristband, Sonic Buds & Nova Speaker — Şimdi Keşfet",
];

export default function Header() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);
  const [promoDismissed, setPromoDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevCount) {
      setCartAnimating(true);
      const t = setTimeout(() => setCartAnimating(false), 400);
      setPrevCount(totalItems);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  // Rotate promo messages
  useEffect(() => {
    if (promoDismissed) return;
    const interval = setInterval(() => {
      setPromoVisible(false);
      setTimeout(() => {
        setPromoIndex((i) => (i + 1) % promoMessages?.length);
        setPromoVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [promoDismissed]);

  return (
    <>
      {/* Promotional Banner */}
      {!promoDismissed && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center px-4 py-2 text-white text-[12px] font-medium tracking-[0.01em] animate-banner-slide"
          style={{
            background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 45%, #a78bfa 100%)",
            backgroundSize: "200% 100%",
            minHeight: "36px",
          }}
        >
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <span
              className="transition-all duration-400 ease-in-out"
              style={{
                opacity: promoVisible ? 1 : 0,
                transform: promoVisible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {promoMessages?.[promoIndex]}
            </span>
          </div>
          <button
            onClick={() => setPromoDismissed(true)}
            className="ml-3 w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 shrink-0"
            aria-label="Kapat"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          promoDismissed ? "top-0" : "top-[36px]"
        } ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-white/60" :"bg-white/60 backdrop-blur-xl"
        }`}
        style={{
          boxShadow: scrolled ? "0 4px 24px rgba(90,172,240,0.08), 0 0 0 1px rgba(255,255,255,0.5)" : "none",
        }}
      >
        <div className="max-w-[1024px] mx-auto px-5 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/homepage"
            className="flex items-center gap-2 group shrink-0"
          >
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                boxShadow: "0 4px 12px rgba(90,172,240,0.35)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#1a1a2e]">
              Lumina<span className="text-[#8a8aaa] font-normal">Tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Ürünler", href: "#products" },
              { label: "Kampanya", href: "#campaign" },
              { label: "Quiz", href: "#quiz" },
            ]?.map((item) => (
              <a
                key={item?.href}
                href={item?.href}
                className="text-[13.5px] font-medium text-[#8a8aaa] hover:text-[#1a1a2e] transition-colors duration-200 tracking-[-0.01em]"
              >
                {item?.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Promo pill */}
            <a
              href="#products"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.01em] transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg, rgba(90,172,240,0.12) 0%, rgba(46,196,160,0.12) 100%)",
                border: "1px solid rgba(90,172,240,0.25)",
                color: "#5aacf0",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4a0] animate-pulse-soft" />
              2. Ürüne %50
            </a>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-[#f0f8ff] transition-colors duration-200"
              aria-label="Sepet"
            >
              <Icon name="ShoppingBagIcon" size={18} className="text-[#1a1a2e]" />
              {totalItems > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${
                    cartAnimating ? "animate-cart-bounce" : ""
                  }`}
                  style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] w-8 p-1"
              aria-label="Menü"
            >
              <span className={`block h-[1.5px] bg-[#1a1a2e] rounded-full transition-all duration-300 ${menuOpen ? "w-full rotate-45 translate-y-[6.5px]" : "w-full"}`} />
              <span className={`block h-[1.5px] bg-[#1a1a2e] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-2/3"}`} />
              <span className={`block h-[1.5px] bg-[#1a1a2e] rounded-full transition-all duration-300 ${menuOpen ? "w-full -rotate-45 -translate-y-[6.5px]" : "w-full"}`} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in"
          style={{
            background: "rgba(253,252,251,0.97)",
            backdropFilter: "blur(24px)",
          }}
        >
          {[
            { label: "Ürünler", href: "#products" },
            { label: "Kampanya", href: "#campaign" },
            { label: "Quiz", href: "#quiz" },
          ]?.map((item, i) => (
            <a
              key={item?.href}
              href={item?.href}
              onClick={() => setMenuOpen(false)}
              className={`text-3xl font-semibold tracking-[-0.03em] text-[#1a1a2e] hover:text-[#5aacf0] transition-colors duration-200 animate-fade-in-up delay-${(i + 1) * 100}`}
            >
              {item?.label}
            </a>
          ))}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-semibold tracking-[-0.03em] text-[#5aacf0] animate-fade-in-up delay-400"
          >
            Sepet {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      )}
    </>
  );
}