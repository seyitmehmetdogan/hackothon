"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const questions = [
  {
    id: "lifestyle",
    question: "Günlük hayatın nasıl geçiyor?",
    emoji: "⚡",
    options: [
      { value: "active", label: "Spor & Aktif Yaşam", icon: "BoltIcon" },
      { value: "music", label: "Müzik & Eğlence", icon: "MusicalNoteIcon" },
      { value: "social", label: "Sosyal & Parti", icon: "UserGroupIcon" },
    ],
  },
  {
    id: "priority",
    question: "Teknolojide en çok ne önemli?",
    emoji: "🎯",
    options: [
      { value: "health", label: "Sağlık Takibi", icon: "HeartIcon" },
      { value: "sound", label: "Ses Kalitesi", icon: "SpeakerWaveIcon" },
      { value: "battery", label: "Uzun Pil Ömrü", icon: "BatteryFullIcon" },
    ],
  },
  {
    id: "style",
    question: "Hangi estetik seni yansıtıyor?",
    emoji: "✨",
    options: [
      { value: "minimal", label: "Minimal & Şık", icon: "Squares2X2Icon" },
      { value: "bold", label: "Cesur & Göz Alıcı", icon: "SparklesIcon" },
      { value: "sporty", label: "Sportif & Dinamik", icon: "TrophyIcon" },
    ],
  },
];

const results: Record<string, { product: string; desc: string; price: string }> = {
  active: {
    product: "Aura Wristband",
    desc: "7/24 sağlık takibi ve GPS ile aktif yaşamın için mükemmel eşlik.",
    price: "₺1.299",
  },
  music: {
    product: "Sonic Buds",
    desc: "40dB ANC ve kristal ses kalitesiyle müziğe gömülürsün.",
    price: "₺899",
  },
  social: {
    product: "Nova Speaker",
    desc: "360° surround ses ve 30 saat pil ile her ortamı doldur.",
    price: "₺1.599",
  },
};

function getResult(answers: string[]) {
  const freq: Record<string, number> = {};
  answers.forEach((a) => { freq[a] = (freq[a] || 0) + 1; });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const topAnswer = sorted[0]?.[0] || "active";
  if (topAnswer === "health" || topAnswer === "minimal" || topAnswer === "active") return results.active;
  if (topAnswer === "sound" || topAnswer === "music" || topAnswer === "bold") return results.music;
  return results.social;
}

export default function AIStyleQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleStart = () => setStep("quiz");

  const handleOption = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      if (currentQ + 1 < questions.length) {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setAnswers(newAnswers);
        setStep("result");
      }
    }, 350);
  };

  const handleReset = () => {
    setStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setAddedToCart(false);
  };

  const result = step === "result" ? getResult(answers) : null;

  const handleAddToCart = () => {
    if (!result) return;
    const productMap: Record<string, { id: string; price: number; image: string }> = {
      "Aura Wristband": { id: "aura-wristband", price: 1299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" },
      "Sonic Buds": { id: "sonic-buds", price: 899, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop" },
      "Nova Speaker": { id: "nova-speaker", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop" },
    };
    const p = productMap[result.product];
    if (p) {
      addItem({ id: p.id, name: result.product, price: p.price, image: p.image });
      setAddedToCart(true);
    }
  };

  return (
    <section
      id="quiz"
      className="py-20 md:py-28"
      style={{ background: "#f7f9fc" }}
    >
      <div className="max-w-[680px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="apple-label mb-3">AI Style Quiz</p>
          <h2
            className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08]"
            style={{ letterSpacing: "-0.04em", color: "#1a1a2e" }}
          >
            Sana Özel Gadget
          </h2>
          <p className="text-[17px] font-light mt-3" style={{ letterSpacing: "-0.01em", color: "#8a8aaa" }}>
            bulmana yardım edelim
          </p>
        </div>

        {/* Quiz Box — glassmorphism */}
        <div
          className="rounded-[28px] p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 8px 40px rgba(90,172,240,0.10), 0 0 0 1px rgba(255,255,255,0.6)",
          }}
        >
          {/* INTRO */}
          {step === "intro" && (
            <div className="text-center animate-fade-in">
              <div className="text-5xl mb-6">🤖</div>
              <h3
                className="text-[22px] font-semibold mb-3 tracking-[-0.02em]"
                style={{ color: "#1a1a2e" }}
              >
                3 Soru, 1 Mükemmel Eşleşme
              </h3>
              <p
                className="text-[15px] leading-relaxed mb-8 max-w-sm mx-auto"
                style={{ color: "#8a8aaa" }}
              >
                Yaşam tarzına göre en uygun Lumina Tech ürününü sana önerelim.
                30 saniyede tamamla!
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                  boxShadow: "0 8px 24px rgba(90,172,240,0.30)",
                }}
              >
                Quize Başla
                <Icon name="ArrowRightIcon" size={15} />
              </button>
            </div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <div className="animate-fade-in">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(226,232,240,0.8)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentQ + 1) / questions.length) * 100}%`,
                      background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)",
                    }}
                  />
                </div>
                <span className="text-[12px] whitespace-nowrap" style={{ color: "#8a8aaa" }}>
                  {currentQ + 1} / {questions.length}
                </span>
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{questions[currentQ].emoji}</div>
                <h3
                  className="text-[20px] md:text-[22px] font-semibold tracking-[-0.02em]"
                  style={{ color: "#1a1a2e" }}
                >
                  {questions[currentQ].question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {questions[currentQ].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleOption(opt.value)}
                    className="relative rounded-[16px] p-5 text-left transition-all duration-200"
                    style={
                      selected === opt.value
                        ? {
                            background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                            border: "1px solid transparent",
                            color: "white",
                            transform: "scale(0.98)",
                            boxShadow: "0 8px 24px rgba(90,172,240,0.30)",
                          }
                        : {
                            background: "rgba(247,249,252,0.9)",
                            border: "1px solid rgba(226,232,240,0.8)",
                            color: "#1a1a2e",
                          }
                    }
                  >
                    <Icon
                      name={opt.icon as "BoltIcon"}
                      size={20}
                      className="mb-3"
                      style={{ color: selected === opt.value ? "white" : "#5aacf0" } as React.CSSProperties}
                    />
                    <p className="text-[13px] font-medium tracking-[-0.01em]">
                      {opt.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <div className="text-center animate-fade-in">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(90,172,240,0.15) 0%, rgba(46,196,160,0.15) 100%)",
                  border: "1px solid rgba(90,172,240,0.2)",
                }}
              >
                <Icon name="SparklesIcon" size={28} style={{ color: "#5aacf0" } as React.CSSProperties} />
              </div>
              <p className="apple-label mb-2">Senin için seçtik</p>
              <h3
                className="text-[26px] font-bold mb-2 tracking-[-0.03em]"
                style={{ color: "#1a1a2e" }}
              >
                {result.product}
              </h3>
              <p
                className="text-[15px] mb-2 max-w-xs mx-auto leading-relaxed"
                style={{ color: "#8a8aaa" }}
              >
                {result.desc}
              </p>
              <p
                className="text-[24px] font-bold mb-8 tracking-[-0.03em]"
                style={{
                  background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {result.price}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 hover:scale-[1.01]"
                  style={
                    addedToCart
                      ? { background: "rgba(46,196,160,0.2)", color: "#2ec4a0", border: "1px solid rgba(46,196,160,0.3)" }
                      : {
                          background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                          boxShadow: "0 8px 24px rgba(90,172,240,0.28)",
                        }
                  }
                >
                  {addedToCart ? "✓ Sepete Eklendi" : "Sepete Ekle"}
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[15px] font-medium transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    color: "#5aacf0",
                    border: "1.5px solid rgba(90,172,240,0.35)",
                    background: "rgba(90,172,240,0.06)",
                  }}
                >
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}