import { useState, useRef } from "react";
import React from "react";

import { Search, User, ShoppingBag, X, ChevronLeft, Menu, Star, ArrowRight } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  shade: string;
  image: string;
  tag: string | null;
  rating: number;
  reviews: number;
  description: string;
  shades: { name: string; color: string }[];
  gallery: string[];
}

export const NAV_CATEGORIES = ["LIPS", "EYES", "FACE", "SKIN"];

// bg-white/30 -> para cambiar el blanco de fondo
// backdrop-blur-xl o backdrop-blur-sm -> cambia la intenisdad del blur
const glass = "bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/30";
const glassCard = "bg-white/80 backdrop-blur-lg backdrop-saturate-150 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.07)]";


export function Navbar({
  activeCategory,
  setActiveCategory,
  cartCount,
  onBack,
  showBack,
  products = [],
  onProductSelect,
}: {
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  cartCount: number;
  onBack?: () => void;
  showBack?: boolean;
  products?: Product[];
  onProductSelect?: (p: Product) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCat = (cat: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredCat(cat);
  };

  const scheduleCatClose = () => {
    closeTimer.current = setTimeout(() => setHoveredCat(null), 120);
  };

  const handleCatClick = (cat: string) => {
    if (activeCategory === cat) {
      setActiveCategory(null);
      setHoveredCat(null);
    } else {
      setActiveCategory(cat);
    }
  };

  const dropdownProducts = hoveredCat
    // (0, 4) indica la cantidad de productos mostrados
    ? products.filter((p) => p.category === hoveredCat).slice(0, 7)
    : [];

  // Estado para rastrear producto al ser "hoveado"
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className={`sticky top-0 z-50 ${glass}`}
        style={{ fontFamily: "'Latto', sans-serif" }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-8 h-16 select-none">

          {/* Left */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-[12px] tracking-[0.15em] text-foreground/50 hover:text-foreground transition-colors"
              >
                <ChevronLeft size={18} strokeWidth={1.5} /> BACK
              </button>
            ) : (
              <div className="cursor-pointer transition-opacity hover:opacity-100">
                <img 
                  src="/images/logo/logo-1.png" 
                  alt="ASTRA BEAUTY" 
                  className="h-9 md:h-12 w-auto object-contain" 
                />
              </div>
            )}
          </div>

          {/* Center — desktop nav with hover dropdown */}
          {!showBack ? (
            <nav
              className="hidden md:flex items-center gap-8"
              onMouseLeave={scheduleCatClose}
            >
              {NAV_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCatClick(cat)}
                  onMouseEnter={() => openCat(cat)}
                  className={`text-[15px] tracking-[0.1em] font-bold transition-all duration-200 ${
                    activeCategory === cat || hoveredCat === cat
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground/50 hover:text-foreground border-b border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          ) : (
            // <span className="hidden md:block text-[17px] font-bold tracking-[0.3em] uppercase text-center">
            //   ASTRA BEAUTY
            // </span>

            <div className="cursor-pointer transition-opacity hover:opacity-100">
              <img 
                src="/images/logo/logo-1.png" 
                alt="ASTRA BEAUTY" 
                className="h-12 md:h-13 w-auto object-contain" 
              />
            </div>
          )}

          {/* Right icons */}
          <div className="flex items-center justify-end gap-4 md:gap-5">
            <button
              onClick={() => { setSearchOpen((s) => !s); setMobileOpen(false); }}
              className="text-foreground/50 hover:text-foreground transition-colors"
            >
              {searchOpen ? <X size={22} strokeWidth={1.5} /> : <Search size={26} strokeWidth={1.5} />}
            </button>
            <button className="text-foreground/50 hover:text-foreground transition-colors">
              <div className="relative">
                <ShoppingBag size={26} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
            {/* Desktop profile — hidden on mobile */}
            <button className="hidden md:block text-foreground/50 hover:text-foreground transition-colors">
              <User size={26} strokeWidth={1.5} />
            </button>
            {/* Mobile hamburger */}
            {!showBack && (
              <button
                onClick={() => { setMobileOpen((o) => !o); setSearchOpen(false); }}
                className="md:hidden text-foreground/50 hover:text-foreground transition-colors"
              >
                {mobileOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden transition-all duration-300 border-t border-white/40 ${
            searchOpen ? "max-h-14 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center px-8 h-12 gap-4">
            <Search size={22} strokeWidth={1.5} className="text-foreground/30" />
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="SEARCH PRODUCTS..."
              className="flex-1 bg-transparent text-[14px] tracking-[0.15em] text-foreground placeholder:text-foreground/30 outline-none"
              style={{ fontFamily: "'Space Mono', monospace" }}
            />
          </div>
        </div>
      </header>

      {/* ── Desktop mega dropdown ── */}
      {hoveredCat && dropdownProducts.length > 0 && (
        <div
          className={`fixed top-[4rem] left-0 right-0 z-40 ${glass} border-t-0 border-b border-white/40 shadow-[0_16px_48px_rgba(0,0,0,0.08)] select-none`}
          onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
          onMouseLeave={() => setHoveredCat(null)}
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {/* py-8 cambia el espacio arriba */}
          <div className="w-full pl-[calc((100vw-1152px)/2)] py-8">
            <div className="flex items-start gap-10 relative">
              
              {/* Category label */}
              <div className="shrink-0 pt-1" style={{ fontFamily: "'Latto', sans-serif" }}>
                <p className="text-[11px] tracking-[0.35em] text-muted-foreground mb-1">BROWSING</p>
                <p className="text-[26px] font-bold tracking-[0.1em] text-primary">{hoveredCat}</p>
                <button
                  onClick={() => { handleCatClick(hoveredCat); setHoveredCat(null); }}
                  className="mt-4 flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-foreground/50 hover:text-primary transition-colors"
                >
                  VIEW ALL <ArrowRight size={10} />
                </button>
              </div>

              {/* Divider */}
              <div className="w-px self-stretch bg-border/60" />

              {/* Products */}
              {/* py-7 px-3 cambia el padding en y o x */}
              {/* el overflow-hidden hace que los elementos no se salgan del div ej.: sombras */}
              
              {/* Products Container con Scroll Horizontal */}
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide pt-3 pl-6 -ml-10"> 
                {dropdownProducts.map((p) => (
                  <button
                  key={p.id}
                  onMouseEnter={() => setHoveredProduct(p.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={(e) => {
                    // 1. Aseguramos que el evento de clic se procese
                    onProductSelect?.(p);
                    // 2. Cerramos el dropdown tras el clic
                    setHoveredCat(null);
                    setHoveredProduct(null);
                  }}
                  className={`group flex flex-col w-[280px] shrink-0 rounded-2xl overflow-hidden ${glassCard} hover:-translate-y-1 transition-all duration-200`}
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-secondary">
                    {/* 1. Imagen Principal */}
                    <img
                      src={p.image.replace("w=600&h=720", "w=320&h=400")}
                      alt={p.name}
                      className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                        hoveredProduct === p.id && p.gallery.length > 0
                          ? "opacity-0 scale-105"
                          : "opacity-100 scale-100"
                      }`}
                    />
                    
                    {/* 2. Imagen de Hover */}
                    {p.gallery && p.gallery.length > 0 && (
                      <img
                        src={p.gallery[0].replace("w=200&h=240", "w=320&h=400")}
                        alt={`${p.name} variant`}
                        // AGREGADO: pointer-events-none para que el click pase al botón padre
                        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                          hoveredProduct === p.id ? "opacity-100 scale-105" : "opacity-0 scale-100"
                        }`}
                      />
                    )}
                    
                    {p.tag && (
                      <span className="absolute top-2 left-2 bg-primary/90 text-white text-[9px] tracking-[0.15em] font-bold px-2 py-0.5 rounded-full z-10">
                        {p.tag}
                      </span>
                    )}
                  </div>
                    
                    <div className="p-3 text-left">
                      <p className="text-[13px] tracking-[0.08em] font-bold leading-tight mb-1 line-clamp-2">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            strokeWidth={0}
                            fill={i < Math.floor(p.rating) ? "#c0384e" : "#e0e0e0"}
                          />
                        ))}
                      </div>
                      <p className="text-[13px] font-bold text-primary">{p.price}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Gradiente derecho transparente */}
              {/* <div className="absolute top-0 right-0 bottom-6 w-24 bg-gradient-to-l from-white/90 via-white/40 to-transparent pointer-events-none" /> */}

              {/* Gradiente izquierdo transparente */}
              {/* <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white/90 via-white/40 to-transparent pointer-events-none" /> */}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div
            className={`absolute top-16 right-0 bottom-0 w-72 ${glass} shadow-[-8px_0_32px_rgba(0,0,0,0.1)] overflow-y-auto`}
          >
            <div className="p-6 flex flex-col gap-1">
              {/* Categories */}
              {NAV_CATEGORIES.map((cat) => (
                <div key={cat}>
                  <button
                    onClick={() => setMobileCat(mobileCat === cat ? null : cat)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[11px] tracking-[0.2em] font-bold transition-all duration-200 ${
                      mobileCat === cat
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/60 hover:bg-white/60 hover:text-foreground"
                    }`}
                  >
                    {cat}
                    <span className={`text-[10px] transition-transform duration-200 ${mobileCat === cat ? "rotate-90" : ""}`}>
                      ›
                    </span>
                  </button>

                  {/* Mobile category products */}
                  {mobileCat === cat && (
                    <div className="pl-3 pr-1 pb-3 flex flex-col gap-2">
                      {products
                        .filter((p) => p.category === cat)
                        .slice(0, 4)
                        .map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onProductSelect?.(p);
                              setMobileOpen(false);
                              setMobileCat(null);
                            }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl ${glassCard} hover:shadow-md transition-all duration-200 text-left`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary shrink-0">
                              <img
                                src={p.image.replace("w=600&h=720", "w=96&h=96")}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] tracking-[0.05em] font-bold truncate">{p.name}</p>
                              <p className="text-[10px] text-primary font-bold mt-0.5">{p.price}</p>
                            </div>
                          </button>
                        ))}
                      <button
                        onClick={() => {
                          setActiveCategory(cat);
                          setMobileOpen(false);
                          setMobileCat(null);
                        }}
                        className="flex items-center gap-1.5 px-2 py-1 text-[9px] tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                      >
                        VIEW ALL {cat} <ArrowRight size={9} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="h-px bg-border/60 my-3" />

              {/* Profile link */}
              <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-[11px] tracking-[0.2em] font-bold text-foreground/60 hover:bg-white/60 hover:text-foreground transition-all duration-200">
                <User size={15} strokeWidth={1.5} />
                MY ACCOUNT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
