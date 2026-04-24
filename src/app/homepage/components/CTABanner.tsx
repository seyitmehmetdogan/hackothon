import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-20" style={{ background: "#fdfcfb" }}>
      <div className="max-w-[1024px] mx-auto px-5">
        <div
          className="relative rounded-[32px] overflow-hidden p-10 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 60%, #1a2e3a 100%)",
            boxShadow: "0 32px 80px rgba(26,26,46,0.25)",
          }}
        >
          {/* Soft orb accents */}
          <div
            className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #5aacf0 0%, transparent 70%)",
              transform: "translate(-30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #2ec4a0 0%, transparent 70%)",
              transform: "translate(30%, 30%)",
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
              transform: "translateY(-50%)",
            }}
          />

          <div className="relative z-10">
            <p
              className="text-[11px] font-semibold tracking-[0.08em] uppercase mb-4"
              style={{ color: "rgba(90,172,240,0.8)" }}
            >
              Sınırlı Stok
            </p>
            <h2
              className="text-[2rem] md:text-[2.8rem] font-bold text-white leading-[1.08] mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              Bugün Sipariş Ver,{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Yarın Kapında.
              </span>
            </h2>
            <p
              className="text-[17px] font-light mb-8 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "-0.01em" }}
            >
              Türkiye geneli ücretsiz kargo, 30 gün iade garantisi. Hesap
              açmadan, saniyeler içinde sipariş ver.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(90,172,240,0.35)",
                }}
              >
                Alışverişe Başla
                <Icon name="ArrowRightIcon" size={15} />
              </a>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon name="ShoppingBagIcon" size={15} />
                Sepete Git
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { icon: "TruckIcon", label: "Ücretsiz Kargo" },
                { icon: "ArrowPathIcon", label: "30 Gün İade" },
                { icon: "ShieldCheckIcon", label: "2 Yıl Garanti" },
                { icon: "BoltIcon", label: "Hızlı Teslimat" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  <Icon name={b.icon as "TruckIcon"} size={15} />
                  <span className="text-[12px] font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}