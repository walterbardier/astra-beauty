import { useState } from "react";
import React from "react";

import {
  Search,
  User,
  ShoppingBag,
  X,
  ArrowRight,
  Plus,
  Star,
  ChevronLeft,
  Minus,
  Heart,
  Mail } from "lucide-react";

import { Navbar } from "./app/components/Navbar";
import { ProductDetail } from "./app/components/ProductDetail"
import { PRODUCTS, Product } from "./data/products";


const NAV_CATEGORIES = ["LIPS", "EYES", "FACE", "SKIN", "SETS", "NEW IN"];

const MARQUEE_TEXT = "FREE SHIPPING ON ORDERS OVER $50 · NEW DROP: ORBITAL COLLECTION · SHADE FINDER NOW LIVE · ";

// ─── Glassmorphism helpers ────────────────────────────────────────────────────
const glass = "bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/50";
const glassCard = "bg-white/80 backdrop-blur-lg backdrop-saturate-150 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.07)]";

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Estado para controlar qué producto está siendo "hovereado"
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const handleAdd = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se abra el detalle al hacer clic en el botón +
    setAddedId(id);
    setCartCount(prev => prev + 1);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />
    );
  }

  const filteredProducts = activeCategory 
    ? PRODUCTS.filter(p => p.category === activeCategory) 
    : PRODUCTS;

  return (
    
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        cartCount={cartCount} 
        products={PRODUCTS}
        onProductSelect={setSelectedProduct}
      />

      {/* Hero */}
      {/* bg-foreground hace que el fondo sea negro / sino, sería blanco */}
      <section className="relative h-[88vh] flex items-end overflow-hidden bg-foreground select-none">
        <img
          src="/images/model/model-6.png"
          alt="ASTRA BEAUTY hero"
          // opacity-90 -> define la opacidad de la img
          className="absolute inset-0 w-full h-full object-cover opacity-90 saturate-120"
        />
        <div className="relative z-10 w-full px-20 pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[14px] tracking-[0.4em] text-white mb-5">SS-26 COLLECTION</p>
            <h1 className="text-white text-6xl md:text-8xl font-bold uppercase" style={{ lineHeight: 0.9 }}>
              ORBITAL<br /><span className="text-primary-dark">EDITION</span>
            </h1>
          </div>
          <div className={`${glass} rounded-3xl p-7 md:max-w-xs`}>
            <p className="text-foreground/70 text-[12px] tracking-[0.1em] leading-relaxed mb-5">
              Designed for every orbit. Formulas that move with you through every phase.
            </p>
            <button className="w-full flex items-center justify-center gap-3 bg-primary text-white text-[14px] tracking-[0.25em] font-bold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_8px_24px_rgb(var(--primary-rgb)_/_0.8)] hover:shadow-[0_8px_24px_rgb(var(--primary-rgb)_/_0.6)]">
              SHOP NOW <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Filter strip */}
      <section className="border-b border-border/60 select-none ml-10 mr-10">
        <div className="flex items-center justify-between px-12 py-5">
          <p className="text-[14px] tracking-[0.25em] text-foreground font-medium">
            {filteredProducts.length} PRODUCTS{activeCategory && ` · ${activeCategory}`}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-[12px] tracking-[0.15em] px-4 py-2 rounded-xl border transition-all duration-300 ${!activeCategory ? "border-foreground bg-foreground text-background" : "border-border"} hover:shadow-[0_2px_48px_rgb(var(--primary-rgb)_/_0.5)]`}
            >
              ALL
            </button>
            {NAV_CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-[12px] tracking-[0.15em] px-4 py-2 rounded-xl border transition-all duration-300 ${activeCategory === cat ? "border-primary bg-primary text-white" : "border-border"} hover:shadow-[0_2px_48px_rgb(var(--primary-rgb)_/_0.5)]`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-12 py-14 select-none ml-10 mr-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className={`group flex flex-col ${glassCard} rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)] text-left w-full`}
            >
              <div className="relative overflow-hidden bg-secondary aspect-[5/3]"> 
                {/* Imagen Base */}
                <img
                  src={product.image}
                  alt={product.name}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                    hoveredProduct === product.id && product.gallery.length > 0
                      ? "opacity-0 scale-105"
                      : "opacity-100 scale-100"
                  }`}
                />
                {/* Imagen de Galería (Hover) */}
                {product.gallery && product.gallery.length > 0 && (
                  <img
                    src={product.gallery[0]}
                    alt={`${product.name} secondary`}
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                      hoveredProduct === product.id ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                  />
                )}
                
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-[11px] tracking-[0.2em] font-bold px-3 py-1.5 rounded-full z-10">
                    {product.tag}
                  </span>
                )}
                <button
                  onClick={(e) => handleAdd(product.id, e)}
                  className={`absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 z-10 ${
                    addedId === product.id
                      ? "bg-primary text-white"
                      : `${glass} opacity-0 group-hover:opacity-100`
                  }`}
                >
                  {addedId === product.id ? <span className="text-[22px] font-bold">✓</span> : <Plus size={24} />}
                </button>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <p className="text-[11px] tracking-[0.25em] text-muted-foreground">{product.category}</p>
                <h3 className="text-[20px] tracking-[0.08em] font-bold leading-tight">{product.name}</h3>
                
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} strokeWidth={0} fill={i < Math.floor(product.rating) ? "#c0384e" : "#e0e0e0"} />
                    ))}
                  </div>
                  <span className="text-[14px] text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-[17px] font-bold">{product.price}</span>
                  <button
                    onClick={(e) => handleAdd(product.id, e)}
                    className="text-[12px] tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
                  >
                    ADD TO BAG
                  </button>
                </div>
                  
                </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mid banner */}
      <section className="mx-12 mb-14 rounded-3xl bg-foreground relative overflow-hidden flex items-center min-h-[280px] select-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #c0384e 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8">
          <div>
            <p className="text-[14px] tracking-[0.4em] text-primary mb-3">FIND YOUR FORMULA</p>
            <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none">
              SHADE
              <br />
              FINDER
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="text-white/50 text-[13px] tracking-[0.1em] leading-relaxed mb-6">
              Our AI-powered shade matching tool analyzes your undertone and recommends your perfect match across all 42 shades.
            </p>
            <button className="inline-flex items-center gap-3 bg-primary text-white text-1xl md:text-1xl tracking-[0.25em] font-bold px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors transition-all duration-300 shadow-[0_8px_24px_rgb(var(--primary-rgb)_/_0.3)] hover:shadow-[0_6px_24px_rgb(var(--primary-rgb)_/_0.3)]">
              START MATCHING <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Skincare editorial */}
      <section className="px-12 mb-14 select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${glassCard} rounded-3xl p-10 flex flex-col justify-between min-h-[320px]`}>
            <p className="text-[9px] tracking-[0.35em] text-muted-foreground">01 / RITUAL</p>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4">
                THE VOID
                <br />
                SKIN RITUAL
              </h2>
              <p className="text-[11px] tracking-[0.08em] text-muted-foreground leading-relaxed mb-6 max-w-xs">
                A 3-step system formulated for every atmosphere. Cleanser, serum, and shield — in one orbit.
              </p>
              <button className="inline-flex items-center gap-2 text-[14px] md:text-[18px] tracking-[0.2em] font-bold bg-primary text-white px-5 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_8px_24px_rgb(var(--primary-rgb)_/_0.5)] hover:shadow-[0_6px_24px_rgb(var(--primary-rgb)_/_0.3)]">
                EXPLORE RITUAL <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden bg-secondary rounded-3xl min-h-[500px]">
            <img
              src="/images/collections/collection-1.png"
              alt="Skincare products arranged on a shelf"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-12 mb-14 select-none">
        <div className={`${glassCard} rounded-3xl px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8`}>
          <div>
            <p className="text-[11px] md:text-[11px] tracking-[0.35em] text-primary mb-2">TRANSMISSIONS</p>
            <h3 className="text-3xl font-bold tracking-tight uppercase">JOIN THE SIGNAL</h3>
            <p className="text-[14px] tracking-[0.1em] text-muted-foreground mt-2">
              Early access · New drops · Exclusive edits
            </p>
          </div>
          <div className="flex w-full md:w-auto md:min-w-[600px] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-border ">
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              className="flex-1 bg-white/80 text-[13px] tracking-[0.15em] placeholder:text-muted-foreground px-5 py-3.5 outline-none"
              style={{ fontFamily: "'Space Mono', monospace" }}
            />
            {/* rounded-3xl -> lo podria incluir en el btn o div -> para redondear bordes */}
            <button className="bg-primary text-white w-12 h-12 flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Mail size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 px-12 py-12 select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-[13px] tracking-[0.3em] font-bold mb-5">ASTRA BEAUTY</p>
            <p className="text-[13px] tracking-[0.08em] text-muted-foreground leading-relaxed">
              Minimal formulas.
              <br />
              Maximum orbit.
            </p>
          </div>
          {[
            { heading: "SHOP", links: ["New In", "Lips", "Eyes", "Face", "Skin", "Sets"] },
            { heading: "INFO", links: ["Our Story", "Shade Finder", "Ingredients", "Sustainability"] },
            { heading: "SUPPORT", links: ["FAQ", "Shipping", "Returns", "Contact"] },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-[13px] tracking-[0.3em] font-bold mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-border/60 pt-6 gap-4">
          <p className="text-[9px] tracking-[0.2em] text-muted-foreground">
            © 2026 ASTRA BEAUTY · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6">
            {["INSTAGRAM", "TIKTOK", "PINTEREST"].map((s) => (
              <a key={s} href="#" className="text-[9px] tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
    </div>
  );
}
