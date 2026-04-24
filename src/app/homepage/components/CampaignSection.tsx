"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";

const campaignCards = [
  {
    id: "smart-living",
    icon: "CpuChipIcon",
    tag: "Smart Living",
    title: "Akıllı Yaşam",
    description:
      "Aura Wristband ile adım sayarken kalp atışını takip et, uyku kaliteni optimize et. Sağlıklı yaşam artık bilek hareketinde.",
    stat: "7/24",
    statLabel: "Sağlık Takibi",
    delay: "delay-100",
    accent: "rgba(90,172,240,0.12)",
    accentBorder: "rgba(90,172,240,0.2)",
    accentText: "#5aacf0",
  },
  {
    id: "digital-connection",
    icon: "SignalIcon",
    tag: "Digital Connection",
    title: "Dijital Bağlantı",
    description:
      "Sonic Buds ile 40ms düşük gecikme. Arkadaşlarınla oyun oynarken, müzik dinlerken hiçbir şeyi kaçırma.",
    stat: "40ms",
    statLabel: "Gecikme Süresi",
    delay: "delay-200",
    accent: "rgba(46,196,160,0.12)",
    accentBorder: "rgba(46,196,160,0.2)",
    accentText: "#2ec4a0",
  },
  {
    id: "unlimited-fun",
    icon: "BoltIcon",
    tag: "Unlimited Fun",
    title: "Sınırsız Eğlence",
    description:
      "Nova Speaker ile 360° surround ses. Partini, kampını, her anını dolu dolu yaşat. 30 saat pil ömrü ile durma.",
    stat: "30h",
    statLabel: "Pil Ömrü",
    delay: "delay-300",
    accent: "rgba(167,139,250,0.12)",
    accentBorder: "rgba(167,139,250,0.2)",
    accentText: "#a78bfa",
  },
];

export default function CampaignSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "#f7f9fc" }}
    >
      <div className="max-w-[1024px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="apple-label mb-3">Kampanya</p>
          <h2
            className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.08]"
            style={{ letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            Gençlik Enerjisi
          </h2>
          <p
            className="text-[17px] font-light mt-4 max-w-xl mx-auto leading-relaxed"
            style={{ letterSpacing: "-0.01em", color: "#8a8aaa" }}
          >
            Üç temel değer, sonsuz bir yaşam deneyimi. Lumina Tech&apos;in vizyonu ile tanış.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaignCards.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-[24px] p-8 transition-all duration-400 hover:-translate-y-1.5 cursor-default overflow-hidden ${
                visible ? `animate-fade-in-up ${card.delay}` : "opacity-0"
              }`}
              style={{
                animationFillMode: "forwards",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 24px rgba(26,26,46,0.06)",
              }}
            >
              {/* Tag */}
              <span
                className="inline-block text-[10px] font-semibold tracking-[0.05em] uppercase px-3 py-1 rounded-full mb-6"
                style={{
                  background: card.accent,
                  border: `1px solid ${card.accentBorder}`,
                  color: card.accentText,
                }}
              >
                {card.tag}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: card.accent,
                  border: `1px solid ${card.accentBorder}`,
                  color: card.accentText,
                }}
              >
                <Icon name={card.icon as "BoltIcon"} size={22} />
              </div>

              {/* Stat */}
              <div className="mb-4">
                <span
                  className="text-[2.5rem] font-bold tracking-[-0.04em]"
                  style={{ color: "#1a1a2e" }}
                >
                  {card.stat}
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.04em] ml-2"
                  style={{ color: "#8a8aaa" }}
                >
                  {card.statLabel}
                </span>
              </div>

              <h3
                className="text-[18px] font-semibold mb-3 tracking-[-0.02em]"
                style={{ color: "#1a1a2e" }}
              >
                {card.title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#8a8aaa" }}>
                {card.description}
              </p>

              {/* Subtle corner accent */}
              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-30"
                style={{ background: `radial-gradient(circle, ${card.accentText} 0%, transparent 70%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}