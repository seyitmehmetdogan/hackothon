"use client";
import React from "react";
import AppImage from "@/components/ui/AppImage";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[86px]"
      style={{
        background: "linear-gradient(160deg, #f0f8ff 0%, #fdfaf5 40%, #f0fdf9 100%)",
      }}
    >
      {/* Soft background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(90,172,240,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(46,196,160,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(167,139,250,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-[1024px] mx-auto px-5 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center min-h-[82vh] py-12">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow pill */}
            <div className="mb-6 animate-fade-in-down">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase"
                style={{
                  background: "rgba(90,172,240,0.1)",
                  border: "1px solid rgba(90,172,240,0.25)",
                  color: "#5aacf0",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4a0] animate-pulse-soft" />
                Gençlik Enerjisi Seninle
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.2rem] font-bold leading-[1.04] mb-5 animate-fade-in-up"
              style={{ letterSpacing: "-0.04em", color: "#1a1a2e" }}
            >
              Sınırlarını<br />
              <span
                className="font-light"
                style={{
                  background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Lumina Tech
              </span>
              <br />
              ile Zorla.
            </h1>

            {/* Subheadline */}
            <p
              className="text-[17px] md:text-[19px] font-light leading-relaxed mb-10 max-w-md animate-fade-in-up delay-200"
              style={{ color: "#8a8aaa", letterSpacing: "-0.01em" }}
            >
              Akıllı saatler, kablosuz kulaklıklar ve hoparlörlerle
              geleceği bugün yaşa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)",
                  boxShadow: "0 8px 24px rgba(26,26,46,0.18)",
                }}
              >
                Koleksiyonu Keşfet
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(90,172,240,0.08)",
                  border: "1.5px solid rgba(90,172,240,0.35)",
                  color: "#5aacf0",
                }}
              >
                Gadget Bul ✨
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-10 mt-12 pt-8 animate-fade-in-up delay-400"
              style={{ borderTop: "1px solid rgba(226,232,240,0.8)" }}
            >
              {[
                { value: "50K+", label: "Mutlu Müşteri" },
                { value: "4.9", label: "Ortalama Puan" },
                { value: "3", label: "Ürün Serisi" },
              ]?.map((stat) => (
                <div key={stat?.label}>
                  <div
                    className="text-[22px] font-bold"
                    style={{ letterSpacing: "-0.03em", color: "#1a1a2e" }}
                  >
                    {stat?.value}
                  </div>
                  <div className="text-[11px] mt-0.5 tracking-[0.02em]" style={{ color: "#8a8aaa" }}>
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Visual */}
          <div className="relative flex items-center justify-center lg:justify-end animate-fade-in delay-200">
            <div className="relative w-full max-w-[400px] md:max-w-[460px]">
              {/* Main image */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "32px",
                  boxShadow: "0 32px 80px rgba(90,172,240,0.20), 0 0 0 1px rgba(255,255,255,0.8)",
                }}
              >
                <AppImage
                  src="https://images.unsplash.com/photo-1645454410409-4239be595387"
                  alt="Premium smartwatch with clean display on light background, close-up product shot"
                  width={460}
                  height={520}
                  priority
                  className="w-full object-cover"
                  style={{ height: "500px" }}
                />
                {/* Soft overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(90,172,240,0.15) 0%, transparent 50%)",
                  }}
                />

                {/* Product label — glassmorphism */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow: "0 4px 20px rgba(90,172,240,0.12)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.05em] uppercase" style={{ color: "#5aacf0" }}>
                          En Çok Satan
                        </p>
                        <p className="text-[14px] font-semibold mt-0.5 tracking-[-0.01em]" style={{ color: "#1a1a2e" }}>
                          Aura Wristband
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-bold tracking-[-0.02em]" style={{ color: "#1a1a2e" }}>
                          ₺1.299
                        </p>
                        <p className="text-[10px]" style={{ color: "#8a8aaa" }}>
                          Ücretsiz Kargo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating product cards */}
              <div
                className="absolute -left-8 top-1/3 hidden md:block animate-float"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  padding: "10px 14px",
                  boxShadow: "0 8px 24px rgba(90,172,240,0.14)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.04em]" style={{ color: "#8a8aaa" }}>Sonic Buds</p>
                <p className="text-[14px] font-bold tracking-[-0.02em]" style={{ color: "#1a1a2e" }}>₺899</p>
              </div>
              <div
                className="absolute -right-6 top-2/3 hidden md:block animate-float"
                style={{
                  animationDelay: "2s",
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  padding: "10px 14px",
                  boxShadow: "0 8px 24px rgba(46,196,160,0.14)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.04em]" style={{ color: "#8a8aaa" }}>Nova Speaker</p>
                <p className="text-[14px] font-bold tracking-[-0.02em]" style={{ color: "#1a1a2e" }}>₺1.599</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700 z-10">
        <div className="w-px h-8 bg-gradient-to-b from-[#8a8aaa]/40 to-transparent" />
        <span className="text-[10px] tracking-[0.06em] uppercase" style={{ color: "#8a8aaa" }}>Keşfet</span>
      </div>
    </section>
  );
}
