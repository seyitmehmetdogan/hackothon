import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f7f9fc",
        borderTop: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      <div className="max-w-[1024px] mx-auto px-5 py-10">
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "#8a8aaa" }}>
          LuminaTech, gençlere yönelik akıllı teknoloji ürünleri sunar. Tüm fiyatlara KDV dahildir.
          Ürün görselleri temsilidir.
        </p>
        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(226,232,240,0.8)" }}
        >
          <p className="text-[12px]" style={{ color: "#8a8aaa" }}>
            © 2026 LuminaTech. Tüm hakları saklıdır.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Ürünler", href: "#products" },
              { label: "Kampanya", href: "#campaign" },
              { label: "Sepet", href: "/cart" },
              { label: "Gizlilik Politikası", href: "#" },
              { label: "Kullanım Şartları", href: "#" },
            ]?.map((item) => (
              <Link
                key={item?.label}
                href={item?.href}
                className="text-[12px] transition-colors duration-200 hover:text-[#1a1a2e]"
                style={{ color: "#8a8aaa" }}
              >
                {item?.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}