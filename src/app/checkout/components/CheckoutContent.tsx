"use client";
import React, { useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", district: "", postalCode: "",
  cardNumber: "", cardName: "", cardExpiry: "", cardCvc: "",
};

function InputField({
  label, name, type = "text", value, onChange, placeholder, required = false, maxLength,
}: {
  label: string; name: keyof FormData; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean; maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] font-semibold uppercase tracking-[0.05em]"
        style={{ color: "#8a8aaa" }}
      >
        {label}
        {required && <span className="ml-1" style={{ color: "#5aacf0" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-[12px] px-4 py-3 text-[14px] placeholder:text-[#c0c0d0] transition-all duration-200 focus:outline-none"
        style={{
          background: "rgba(247,249,252,0.9)",
          border: "1px solid rgba(226,232,240,0.8)",
          color: "#1a1a2e",
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid rgba(90,172,240,0.5)";
          e.target.style.background = "rgba(255,255,255,0.95)";
          e.target.style.boxShadow = "0 0 0 3px rgba(90,172,240,0.10)";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid rgba(226,232,240,0.8)";
          e.target.style.background = "rgba(247,249,252,0.9)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice >= 500 ? 0 : 49.9;
  const grandTotal = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") {
      formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "cardExpiry") {
      formatted = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    }
    if (name === "cardCvc") formatted = value.replace(/\D/g, "").slice(0, 3);
    if (name === "phone") formatted = value.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); clearCart(); }, 1800);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center"
        style={{ background: "linear-gradient(160deg, #f0f8ff 0%, #fdfaf5 40%, #f0fdf9 100%)" }}
      >
        <div className="text-6xl mb-6">🛍️</div>
        <h2 className="text-[24px] font-semibold mb-3 tracking-[-0.02em]" style={{ color: "#1a1a2e" }}>
          Sepetiniz Boş
        </h2>
        <p className="text-[15px] mb-8 leading-relaxed" style={{ color: "#8a8aaa" }}>
          Ödeme yapabilmek için sepetinize ürün ekleyin.
        </p>
        <Link
          href="/homepage"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)", boxShadow: "0 8px 24px rgba(26,26,46,0.18)" } as React.CSSProperties}
        >
          <Icon name="ArrowLeftIcon" size={15} />
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center"
        style={{ background: "linear-gradient(160deg, #f0f8ff 0%, #fdfaf5 40%, #f0fdf9 100%)" }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 animate-fade-in"
          style={{
            background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
            boxShadow: "0 12px 32px rgba(90,172,240,0.35)",
          }}
        >
          <Icon name="CheckIcon" size={36} className="text-white" />
        </div>
        <h2
          className="text-[2rem] font-bold mb-3 animate-fade-in-up tracking-[-0.03em]"
          style={{ color: "#1a1a2e" }}
        >
          Siparişin Alındı!
        </h2>
        <p className="text-[15px] mb-2 animate-fade-in-up delay-100 leading-relaxed" style={{ color: "#8a8aaa" }}>
          Sipariş onayı{" "}
          <strong className="font-medium" style={{ color: "#1a1a2e" }}>{form.email}</strong>{" "}
          adresine gönderildi.
        </p>
        <p className="text-[14px] mb-10 animate-fade-in-up delay-200" style={{ color: "#8a8aaa" }}>
          1-3 iş günü içinde kapınızda olacak.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
          <Link
            href="/homepage"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
              boxShadow: "0 8px 24px rgba(90,172,240,0.28)",
            }}
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-[1024px] mx-auto px-5 pt-28 pb-16 min-h-screen"
      style={{ background: "#fdfcfb" }}
    >
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[13px] font-medium mb-6 transition-colors duration-200 hover:text-[#1a1a2e]"
          style={{ color: "#8a8aaa" }}
        >
          <Icon name="ArrowLeftIcon" size={14} />
          Sepete Geri Dön
        </Link>
        <h1
          className="text-[2rem] md:text-[2.5rem] font-bold tracking-[-0.04em]"
          style={{ color: "#1a1a2e" }}
        >
          Hızlı Ödeme
        </h1>
        <p className="text-[14px] mt-2" style={{ color: "#8a8aaa" }}>
          Hesap açmadan, misafir olarak sipariş ver.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact Info */}
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(26,26,46,0.05)",
              }}
            >
              <h2
                className="text-[15px] font-semibold mb-6 flex items-center gap-3 tracking-[-0.01em]"
                style={{ color: "#1a1a2e" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px]"
                  style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
                >
                  1
                </span>
                İletişim Bilgileri
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Ad" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Adınız" required />
                <InputField label="Soyad" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Soyadınız" required />
                <InputField label="E-posta" name="email" type="email" value={form.email} onChange={handleChange} placeholder="ornek@email.com" required />
                <InputField label="Telefon" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="05XX XXX XX XX" required maxLength={11} />
              </div>
            </div>

            {/* Shipping Address */}
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(26,26,46,0.05)",
              }}
            >
              <h2
                className="text-[15px] font-semibold mb-6 flex items-center gap-3 tracking-[-0.01em]"
                style={{ color: "#1a1a2e" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px]"
                  style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
                >
                  2
                </span>
                Teslimat Adresi
              </h2>
              <div className="space-y-4">
                <InputField label="Adres" name="address" value={form.address} onChange={handleChange} placeholder="Mahalle, sokak, bina no, daire no" required />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InputField label="İl" name="city" value={form.city} onChange={handleChange} placeholder="İstanbul" required />
                  <InputField label="İlçe" name="district" value={form.district} onChange={handleChange} placeholder="Kadıköy" required />
                  <InputField label="Posta Kodu" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="34710" maxLength={5} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(26,26,46,0.05)",
              }}
            >
              <h2
                className="text-[15px] font-semibold mb-6 flex items-center gap-3 tracking-[-0.01em]"
                style={{ color: "#1a1a2e" }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px]"
                  style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
                >
                  3
                </span>
                Ödeme Bilgileri
              </h2>

              {/* Card visual */}
              <div
                className="relative rounded-[16px] p-6 mb-6 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 60%, #1a2e3a 100%)",
                  boxShadow: "0 12px 32px rgba(26,26,46,0.25)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #5aacf0 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
                />
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-90" />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.05em]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Kredi / Banka Kartı
                  </span>
                </div>
                <p className="text-[18px] font-bold text-white tracking-[0.18em] mb-4 font-mono">
                  {form.cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="flex justify-between">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.05em] mb-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Kart Sahibi
                    </p>
                    <p className="text-[13px] font-semibold text-white">{form.cardName || "AD SOYAD"}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[10px] uppercase tracking-[0.05em] mb-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Son Kullanma
                    </p>
                    <p className="text-[13px] font-semibold text-white">{form.cardExpiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <InputField label="Kart Numarası" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" required maxLength={19} />
                <InputField label="Kart Üzerindeki İsim" name="cardName" value={form.cardName} onChange={handleChange} placeholder="AD SOYAD" required />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Son Kullanma Tarihi" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="AA/YY" required maxLength={5} />
                  <InputField label="CVV" name="cardCvc" type="password" value={form.cardCvc} onChange={handleChange} placeholder="•••" required maxLength={3} />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[12px]" style={{ color: "#8a8aaa" }}>
                <Icon name="LockClosedIcon" size={13} style={{ color: "#5aacf0" } as React.CSSProperties} />
                <span>256-bit SSL ile şifrelenmiş güvenli ödeme</span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
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
                className="text-[15px] font-semibold mb-6 pb-4 tracking-[-0.01em]"
                style={{ color: "#1a1a2e", borderBottom: "1px solid rgba(226,232,240,0.8)" }}
              >
                Sipariş Özeti
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="relative w-12 h-12 rounded-[10px] overflow-hidden shrink-0"
                      style={{ background: "rgba(90,172,240,0.08)" }}
                    >
                      <AppImage src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-medium truncate tracking-[-0.01em]"
                        style={{ color: "#1a1a2e" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-[11px]" style={{ color: "#8a8aaa" }}>x{item.quantity}</p>
                    </div>
                    <p className="text-[13px] font-semibold shrink-0" style={{ color: "#1a1a2e" }}>
                      ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="space-y-2 mb-4 pb-4"
                style={{ borderBottom: "1px solid rgba(226,232,240,0.8)" }}
              >
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: "#8a8aaa" }}>Ara Toplam</span>
                  <span style={{ color: "#1a1a2e" }}>₺{totalPrice.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: "#8a8aaa" }}>Kargo</span>
                  <span style={{ color: shipping === 0 ? "#2ec4a0" : "#1a1a2e" }}>
                    {shipping === 0 ? "Ücretsiz" : `₺${shipping.toFixed(2).replace(".", ",")}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-[15px]" style={{ color: "#1a1a2e" }}>Toplam</span>
                <span className="font-bold text-[20px] tracking-[-0.03em]" style={{ color: "#1a1a2e" }}>
                  ₺{grandTotal.toLocaleString("tr-TR", { minimumFractionDigits: 0 })}
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-medium tracking-[-0.01em] transition-all duration-250 hover:scale-[1.01]"
                style={
                  loading
                    ? { background: "rgba(138,138,170,0.3)", color: "#8a8aaa", cursor: "not-allowed" }
                    : {
                        background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(90,172,240,0.28)",
                      }
                }
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    İşleniyor...
                  </>
                ) : (
                  <>
                    Siparişi Tamamla
                    <Icon name="CheckIcon" size={15} />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center mt-3 leading-relaxed" style={{ color: "#8a8aaa" }}>
                Siparişi tamamlayarak{" "}
                <span style={{ color: "#5aacf0" }}>Kullanım Şartları</span>&apos;nı
                kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}