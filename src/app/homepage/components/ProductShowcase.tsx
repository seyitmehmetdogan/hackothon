"use client";
import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const categories = [
  { id: "all", name: "Tümü", icon: "Squares2X2Icon" },
  { id: "akilli-saat", name: "Akıllı Saatler", icon: "ClockIcon" },
  { id: "kulaklik", name: "Kulaklıklar", icon: "MusicalNoteIcon" },
  { id: "scooter", name: "Elektrikli Scooter", icon: "BoltIcon" },
  { id: "hoverboard", name: "Hoverboard", icon: "RocketLaunchIcon" },
  { id: "vr", name: "VR Gözlük", icon: "EyeIcon" },
  { id: "hoparlor", name: "Hoparlörler", icon: "SpeakerWaveIcon" },
  { id: "klavye", name: "Klavyeler", icon: "CommandLineIcon" },
  { id: "fare", name: "Fareler", icon: "CursorArrowRaysIcon" },
];

const products = [
  {
    id: "aura-wristband",
    name: "Aura Wristband",
    tagline: "Akıllı Sağlık Takibi",
    category: "akilli-saat",
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
    category: "kulaklik",
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
    category: "hoparlor",
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
  {
    id: "smart-band-pro",
    name: "Smart Band Pro",
    tagline: "Akıllı Bileklik",
    category: "akilli-saat",
    price: 799,
    originalPrice: 1199,
    rating: 4.6,
    reviews: 1542,
    badge: "Popüler",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
    imageAlt: "Modern fitness tracker smart band on wrist, health monitoring wearable device",
    features: ["Uyku Takibi", "SpO2 Ölçüm", "14 Gün Pil"],
    accentColor: "#f97316",
    accentBg: "rgba(249,115,22,0.08)",
  },
  {
    id: "samsung-galaxy-watch-8",
    name: "Samsung Galaxy Watch 8",
    tagline: "Akıllı Saat",
    category: "akilli-saat",
    price: 14999,
    originalPrice: 17999,
    rating: 4.9,
    reviews: 3421,
    badge: "Yeni",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    imageAlt: "Samsung Galaxy Watch 8 smartwatch with modern design and health features",
    features: ["Wear OS 5", "BioActive Sensör", "3 Gün Pil"],
    accentColor: "#1428a0",
    accentBg: "rgba(20,40,160,0.08)",
  },
  {
    id: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    tagline: "Akıllı Saat",
    category: "akilli-saat",
    price: 18999,
    originalPrice: 21999,
    rating: 4.9,
    reviews: 5678,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
    imageAlt: "Apple Watch Series 10 with sleek design and health monitoring capabilities",
    features: ["watchOS 11", "Always-On Ekran", "Çift Dokunma"],
    accentColor: "#333333",
    accentBg: "rgba(51,51,51,0.08)",
  },
  {
    id: "elektrikli-scooter",
    name: "Elektrikli Scooter",
    tagline: "Şehir İçi Ulaşım",
    category: "scooter",
    price: 8999,
    originalPrice: 11999,
    rating: 4.8,
    reviews: 876,
    badge: "Trend",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    imageAlt: "Modern electric scooter on urban street, eco-friendly transportation",
    features: ["45km Menzil", "25km/h Hız", "Katlanabilir"],
    accentColor: "#10b981",
    accentBg: "rgba(16,185,129,0.08)",
  },
  {
    id: "hoverboard",
    name: "Hoverboard",
    tagline: "Eğlenceli Sürüş",
    category: "hoverboard",
    price: 4499,
    originalPrice: 5999,
    rating: 4.5,
    reviews: 654,
    badge: "Eğlenceli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopping-gJznmmuGEXwhNStuybhxakmHSHQFY7.webp",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopping-gJznmmuGEXwhNStuybhxakmHSHQFY7.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopping%20%282%29-SKCARGjzkSiZWvA1kpFUxNqQQ7Xk2F.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopping%20%281%29-mJST0UsY1QP5ZWxGXMVpro7HwXo3RD.webp",
    ],
    imageAlt: "Black hoverboard with white lightning pattern design, self-balancing electric scooter",
    features: ["LED Işıklar", "Bluetooth", "15km Menzil"],
    accentColor: "#ec4899",
    accentBg: "rgba(236,72,153,0.08)",
  },
  {
    id: "vision-vr",
    name: "Vision VR",
    tagline: "VR Gözlük",
    category: "vr",
    price: 12999,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 1123,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    imageAlt: "Virtual reality headset VR glasses on clean background, immersive technology",
    features: ["4K Ekran", "120Hz Yenileme", "6DoF Takip"],
    accentColor: "#6366f1",
    accentBg: "rgba(99,102,241,0.08)",
  },
  {
    id: "bass-boom",
    name: "Bass Boom",
    tagline: "Taşınabilir Hoparlör",
    category: "hoparlor",
    price: 2199,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 2187,
    badge: "Ses Canavarı",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    imageAlt: "Portable bluetooth speaker with powerful bass, outdoor audio device",
    features: ["50W Güç", "TWS Eşleşme", "RGB Işık"],
    accentColor: "#ef4444",
    accentBg: "rgba(239,68,68,0.08)",
  },
  {
    id: "mech-master",
    name: "Mech Master",
    tagline: "Mekanik Klavye",
    category: "klavye",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 1876,
    badge: "Oyuncu Tercihi",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    imageAlt: "RGB mechanical gaming keyboard with backlit keys, premium gaming peripheral",
    features: ["Hot-Swap", "RGB Aydınlatma", "PBT Tuşlar"],
    accentColor: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
  },
  {
    id: "precision-mouse",
    name: "Precision Mouse",
    tagline: "Kablosuz Fare",
    category: "fare",
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviews: 1432,
    badge: "Ergonomik",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    imageAlt: "Wireless gaming mouse with RGB lighting, ergonomic design computer peripheral",
    features: ["26K DPI", "70h Pil", "Programlanabilir"],
    accentColor: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.08)",
  },
];

function ProductCard({ product }: { product: (typeof products)[0] & { images?: string[] } }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images || [product.image];
  const hasMultipleImages = images.length > 1;

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
        setIsHovered(true);
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 16px 48px rgba(26,26,46,0.10), 0 0 0 1px rgba(255,255,255,0.9)";
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
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
          src={images[currentImageIndex]}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Navigation Arrows - Only show on hover for products with multiple images */}
        {hasMultipleImages && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Icon name="ChevronLeftIcon" size={16} className="text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <Icon name="ChevronRightIcon" size={16} className="text-gray-700" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  background: index === currentImageIndex 
                    ? product.accentColor 
                    : "rgba(255,255,255,0.6)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  transform: index === currentImageIndex ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}

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
  const [activeCategory, setActiveCategory] = useState("all");

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

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "#fdfcfb" }}
    >
      <div className="max-w-[1024px] mx-auto px-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
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

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto pb-2 -mx-5 px-5">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
                          color: "white",
                          boxShadow: "0 4px 14px rgba(26,26,46,0.25)",
                        }
                      : {
                          background: "rgba(255,255,255,0.8)",
                          color: "#5a5a7a",
                          border: "1px solid rgba(226,232,240,0.8)",
                          boxShadow: "0 2px 8px rgba(26,26,46,0.04)",
                        }
                  }
                >
                  <Icon name={category.icon} size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className={`${visible ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
              style={{ animationFillMode: "forwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[16px]" style={{ color: "#8a8aaa" }}>
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
