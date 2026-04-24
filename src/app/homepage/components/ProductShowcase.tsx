"use client";
import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: "aura-wristband",
    name: "Aura Wristband",
    tagline: "Akıllı Sağlık Takibi",
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviews: 2341,
    badge: "En Çok Satan",
    image: "https://images.unsplash.com/photo-1651406101815-50d85040feb2",
    imageAlt: "Sleek smartwatch with clean display on light surface, premium wearable technology",
    features: ["7/24 Kalp Atışı", "GPS Takip", "5ATM Su Geçirmez"],
    accentColor: "#5aacf0",
    accentBg: "rgba(90,172,240,0.08)",
  },
  {
    id: "sonic-buds",
    name: "Sonic Buds",
    tagline: "Aktif Gürültü Engelleme",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 1876,
    badge: "Yeni Sezon",
    image: "https://images.unsplash.com/photo-1727174659485-0567349669d2",
    imageAlt: "True wireless earbuds in charging case on clean white background",
    features: ["40dB ANC", "40ms Gecikme", "30h Pil"],
    accentColor: "#2ec4a0",
    accentBg: "rgba(46,196,160,0.08)",
  },
  {
    id: "nova-speaker",
    name: "Nova Speaker",
    tagline: "360° Surround Ses",
    price: 1599,
    originalPrice: 2199,
    rating: 4.7,
    reviews: 943,
    badge: "Çok Satılan",
    image: "https://images.unsplash.com/photo-1643385958950-8f0b8852171a",
    imageAlt: "Cylindrical bluetooth speaker with minimal design on light background, premium audio device",
    features: ["30h Pil", "IPX7 Su Geçirmez", "Multi-Connect"],
    accentColor: "#a78bfa",
    accentBg: "rgba(167,139,250,0.08)",
  },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="group rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 4px 24px rgba(26,26,46,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 16px 48px rgba(26,26,46,0.10), 0 0 0 1px rgba(255,255,255,0.9)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(26,26,46,0.06)";
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden h-56 md:h-60"
        style={{ background: product.accentBg }}
      >
        <AppImage
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-semibold tracking-[0.04em] uppercase px-3 py-1 rounded-full text-white"
            style={{
              background: `linear-gradient(135deg, ${product.accentColor} 0%, ${product.accentColor}cc 100%)`,
              boxShadow: `0 4px 12px ${product.accentColor}40`,
            }}
          >
            {product.badge}
          </span>
        </div>
        {/* Discount */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] font-semibold text-white px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,80,80,0.85)", backdropFilter: "blur(8px)" }}
          >
            -{discount}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p
          className="text-[11px] font-semibold tracking-[0.04em] uppercase mb-1"
          style={{ color: product.accentColor }}
        >
          {product.tagline}
        </p>
        <h3
          className="text-[18px] font-semibold mb-3 tracking-[-0.02em]"
          style={{ color: "#1a1a2e" }}
        >
          {product.name}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.map((f) => (
            <span
              key={f}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{
                background: product.accentBg,
                color: product.accentColor,
                border: `1px solid ${product.accentColor}25`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className="text-[12px]"
                style={{ color: s <= Math.round(product.rating) ? "#f59e0b" : "#e2e8f0" }}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[12px]" style={{ color: "#8a8aaa" }}>
            {product.rating} ({product.reviews.toLocaleString("tr-TR")})
          </span>
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: "1px solid rgba(226,232,240,0.6)" }}
        >
          <div>
            <span
              className="text-[20px] font-bold tracking-[-0.03em]"
              style={{ color: "#1a1a2e" }}
            >
              ₺{product.price.toLocaleString("tr-TR")}
            </span>
            <span className="text-[12px] line-through ml-2" style={{ color: "#8a8aaa" }}>
              ₺{product.originalPrice.toLocaleString("tr-TR")}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.03]"
            style={
              added
                ? { background: "rgba(46,196,160,0.15)", color: "#2ec4a0", border: "1px solid rgba(46,196,160,0.3)" }
                : {
                    background: `linear-gradient(135deg, ${product.accentColor} 0%, ${product.accentColor}cc 100%)`,
                    color: "white",
                    boxShadow: `0 4px 14px ${product.accentColor}35`,
                  }
            }
          >
            {added ? (
              "✓ Eklendi"
            ) : (
              <>
                Sepete Ekle
                <Icon name="ShoppingBagIcon" size={13} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "#fdfcfb" }}
    >
      <div className="max-w-[1024px] mx-auto px-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="apple-label mb-3">Ürünler</p>
            <h2
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.08]"
              style={{ letterSpacing: "-0.04em", color: "#1a1a2e" }}
            >
              Koleksiyonu Keşfet
            </h2>
          </div>
          <p
            className="text-[15px] font-light max-w-xs md:text-right"
            style={{ letterSpacing: "-0.01em", color: "#8a8aaa" }}
          >
            Her bütçeye uygun, her yaşam tarzına göre tasarlanmış teknoloji.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`${visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              style={{ animationFillMode: "forwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
