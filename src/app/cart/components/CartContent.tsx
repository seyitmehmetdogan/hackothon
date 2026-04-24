"use client";
import React from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

export default function CartContent() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  const shipping = totalPrice >= 500 ? 0 : 49.9;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center"
        style={{ background: "linear-gradient(160deg, #f0f8ff 0%, #fdfaf5 40%, #f0fdf9 100%)" }}
      >
        <div className="text-7xl mb-6 animate-float">🛍️</div>
        <h2
          className="text-[26px] font-semibold mb-3 tracking-[-0.02em]"
          style={{ color: "#1a1a2e" }}
        >
          Sepetiniz Boş
        </h2>
        <p className="text-[15px] mb-8 max-w-sm leading-relaxed" style={{ color: "#8a8aaa" }}>
          Henüz sepetinize ürün eklemediniz. Koleksiyonumuzu keşfedin!
        </p>
        <Link
          href="/homepage"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)",
            boxShadow: "0 8px 24px rgba(26,26,46,0.18)",
          }}
        >
          <Icon name="ArrowLeftIcon" size={15} />
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div
      className="max-w-[1024px] mx-auto px-5 pt-28 pb-16 min-h-screen"
      style={{ background: "#fdfcfb" }}
    >
      {/* Page Header */}
      <div className="mb-10">
        <Link
          href="/homepage"
          className="inline-flex items-center gap-2 text-[13px] font-medium mb-6 transition-colors duration-200 hover:text-[#1a1a2e]"
          style={{ color: "#8a8aaa" }}
        >
          <Icon name="ArrowLeftIcon" size={14} />
          Alışverişe Devam Et
        </Link>
        <h1
          className="text-[2rem] md:text-[2.5rem] font-bold tracking-[-0.04em]"
          style={{ color: "#1a1a2e" }}
        >
          Sepetim{" "}
          <span
            className="font-light text-[1.5rem] md:text-[1.8rem]"
            style={{ color: "#8a8aaa" }}
          >
            ({totalItems} Ürün)
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-[20px] p-5 flex gap-5 items-center transition-all duration-200 animate-fade-in-up"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(26,26,46,0.05)",
              }}
            >
              {/* Image */}
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-[14px] overflow-hidden shrink-0"
                style={{ background: "rgba(90,172,240,0.08)" }}
              >
                <AppImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[15px] font-semibold truncate tracking-[-0.01em]"
                  style={{ color: "#1a1a2e" }}
                >
                  {item.name}
                </h3>
                <p
                  className="font-bold text-[17px] mt-1 tracking-[-0.02em]"
                  style={{ color: "#1a1a2e" }}
                >
                  ₺{item.price.toLocaleString("tr-TR")}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(247,249,252,0.9)",
                    border: "1px solid rgba(226,232,240,0.8)",
                    color: "#8a8aaa",
                  }}
                  aria-label="Azalt"
                >
                  <Icon name="MinusIcon" size={13} />
                </button>
                <span
                  className="font-semibold w-7 text-center text-[14px]"
                  style={{ color: "#1a1a2e" }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(90,172,240,0.1)",
                    border: "1px solid rgba(90,172,240,0.2)",
                    color: "#5aacf0",
                  }}
                  aria-label="Artır"
                >
                  <Icon name="PlusIcon" size={13} />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right shrink-0 hidden md:block">
                <p
                  className="font-bold text-[15px] tracking-[-0.01em]"
                  style={{ color: "#1a1a2e" }}
                >
                  ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0"
                style={{ color: "#8a8aaa" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ff5050";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,80,80,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#8a8aaa";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
                aria-label="Kaldır"
              >
                <Icon name="TrashIcon" size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div
            className="rounded-[20px] p-6 sticky top-24"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(90,172,240,0.08)",
            }}
          >
            <h2
              className="text-[17px] font-semibold mb-6 pb-4 tracking-[-0.01em]"
              style={{
                color: "#1a1a2e",
                borderBottom: "1px solid rgba(226,232,240,0.8)",
              }}
            >
              Sipariş Özeti
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[14px]">
                <span style={{ color: "#8a8aaa" }}>Ara Toplam ({totalItems} ürün)</span>
                <span className="font-medium" style={{ color: "#1a1a2e" }}>
                  ₺{totalPrice.toLocaleString("tr-TR")}
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span style={{ color: "#8a8aaa" }}>Kargo</span>
                <span
                  className="font-medium"
                  style={{ color: shipping === 0 ? "#2ec4a0" : "#1a1a2e" }}
                >
                  {shipping === 0 ? "Ücretsiz" : `₺${shipping.toFixed(2).replace(".", ",")}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px]" style={{ color: "#8a8aaa" }}>
                  ₺500 üzeri siparişlerde ücretsiz kargo!
                </p>
              )}
            </div>

            <div
              className="flex justify-between items-center py-4 mb-6"
              style={{ borderTop: "1px solid rgba(226,232,240,0.8)", borderBottom: "1px solid rgba(226,232,240,0.8)" }}
            >
              <span className="font-semibold text-[15px]" style={{ color: "#1a1a2e" }}>
                Toplam
              </span>
              <span
                className="font-bold text-[20px] tracking-[-0.03em]"
                style={{ color: "#1a1a2e" }}
              >
                ₺{grandTotal.toLocaleString("tr-TR", { minimumFractionDigits: 0 })}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                boxShadow: "0 8px 24px rgba(90,172,240,0.28)",
              }}
            >
              Ödemeye Geç
              <Icon name="ArrowRightIcon" size={15} />
            </Link>

            {/* Trust badges */}
            <div className="mt-5 space-y-2.5">
              {[
                { icon: "ShieldCheckIcon", text: "256-bit SSL Güvenli Ödeme" },
                { icon: "TruckIcon", text: "1-3 İş Günü Teslimat" },
                { icon: "ArrowPathIcon", text: "30 Gün Ücretsiz İade" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: "#8a8aaa" }}
                >
                  <Icon
                    name={b.icon as "ShieldCheckIcon"}
                    size={13}
                    style={{ color: "#5aacf0", flexShrink: 0 } as React.CSSProperties}
                  />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}