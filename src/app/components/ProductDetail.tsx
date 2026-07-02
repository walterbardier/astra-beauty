import React, { useState } from "react";;

import { Star, ChevronLeft, Minus, Plus, Heart } from "lucide-react";
// Importaciones necesarias:
import { Product, PRODUCTS } from "../../data/products"; 
import { Navbar } from "../components/Navbar"; 

const PAIR_WITH = PRODUCTS.slice(1, 3); // Definimos la constante aquí o la importamos

const glass = "bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/50";
const glassCard = "bg-white/80 backdrop-blur-lg backdrop-saturate-150 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.07)]";

export function ProductDetail({
  product,
  onBack,
  cartCount,
  setCartCount,
}: {
  product: Product;
  onBack: () => void;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [activeShade, setActiveShade] = useState(0);
  const [mainImage, setMainImage] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = () => {
    setCartCount((c) => c + qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const thumbnails = [product.image, ...product.gallery];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Space Mono', monospace" }}>
        {/* Navbar correctamente llamado */}
        <Navbar
            activeCategory={null}
            setActiveCategory={() => {}}
            cartCount={cartCount}
            onBack={onBack}
            showBack={true}
        />

        <div className="max-w-6xl mx-auto px-8 py-10">
            {/* Breadcrumb */}
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground mb-8">
            HOME /{" "}
            <span
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={onBack}
            >
                {product.category}
            </span>{" "}
            / {product.name}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12">
                
                {/* ── Left: images ── */}
                <div className="flex gap-4 select-none">
                    {/* Thumbnail strip */}
                    <div className="flex flex-col gap-3 w-[72px] shrink-0">
                        {thumbnails.map((src, i) => (
                            <button
                            key={i}
                            onClick={() => setMainImage(src)}
                            className={`rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-200 ${
                                mainImage === src
                                ? "border-primary shadow-[0_4px_16px_rgba(192,56,78,0.25)]"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                            >
                            <img
                                src={src.replace("w=600&h=720", "w=200&h=200")}
                                alt={`${product.name} view ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className={`flex-1 rounded-3xl overflow-hidden ${glassCard} relative`}>
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover min-h-[480px] transition-all duration-500"
                        />
                        {product.tag && (
                            <span className="absolute top-5 left-5 bg-primary/90 backdrop-blur-sm text-white text-[12px] tracking-[0.2em] font-bold px-3 py-1.5 rounded-full">
                            {product.tag}
                            </span>
                        )}
                        <button
                            onClick={() => setWishlisted((w) => !w)}
                            className={`absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center ${glass} transition-all duration-200 ${
                            wishlisted ? "text-primary" : "text-foreground/40"
                            }`}
                        >
                            <Heart size={16} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                {/* ── Right: info ── */}
                <div className="flex flex-col gap-6">
                    {/* Name + price */}
                    <div>
                        <p className="text-[14px] tracking-[0.35em] text-primary mb-2">{product.category}</p>
                        <h1 className="text-[30px] text-2xl font-bold tracking-tight uppercase leading-tight mb-3">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 select-none">
                            <span className="text-xl font-bold">{product.price}</span>
                            <div className="flex items-center gap-1.5">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        strokeWidth={0}
                                        fill={i < Math.floor(product.rating) ? "#c0384e" : "#e0e0e0"}
                                    />
                                    ))}
                                </div>
                                <span className="text-[12px] tracking-[0.1em] text-muted-foreground ml-3">
                                    {product.rating} · {product.reviews} reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shade selector */}
                    <div className={`p-5 rounded-2xl ${glassCard} select-none`}>
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] tracking-[0.25em] text-muted-foreground">SHADE</p>
                            <p className="text-[13px] tracking-[0.1em] font-bold">
                            {product.shades[activeShade].name}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {product.shades.map((shade, i) => (
                            <button
                                key={shade.name}
                                onClick={() => setActiveShade(i)}
                                title={shade.name}
                                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                                activeShade === i
                                    ? "ring-2 ring-offset-2 ring-primary scale-110 shadow-md"
                                    : "hover:scale-105 ring-1 ring-black/10"
                                }`}
                                style={{ backgroundColor: shade.color }}
                            />
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] tracking-[0.08em] text-muted-foreground leading-relaxed">
                    {product.description}
                    </p>

                    {/* Qty + Add to cart */}
                    <div className="flex flex-col gap-3 select-none">
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-4 px-4 py-2.5 rounded-2xl ${glassCard}`}>
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="text-foreground/60 hover:text-foreground transition-colors"
                                >
                                    <Minus size={16} strokeWidth={2} />
                                </button>
                                <span className="text-[15px] font-bold w-4 text-center">{qty}</span>
                                <button
                                    onClick={() => setQty((q) => q + 1)}
                                    className="text-foreground/60 hover:text-foreground transition-colors"
                                >
                                    <Plus size={16} strokeWidth={2} />
                                </button>
                            </div>
                            <p className="text-[15px] tracking-[0.1em] text-muted-foreground">
                            ${(product.priceNum * qty).toFixed(2)} total
                            </p>
                        </div>

                        <div className="flex gap-3 w-full">
                            {/* Botón de Agregar (70%) */}
                            <div className="w-[70%]">
                                <button
                                onClick={handleAdd}
                                className={`w-full py-4 rounded-2xl text-[13px] tracking-[0.25em] font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_24px_rgb(var(--primary-rgb)_/_0.6)] ${
                                    added
                                    ? "bg-foreground text-background"
                                    : "bg-primary text-white hover:bg-primary/90 hover:shadow-[0_12px_32px_rgb(var(--primary-rgb)_/_0.4)] hover:-translate-y-0.5"
                                }`}
                                >
                                {added ? (
                                    <>✓ ADDED TO BAG</>
                                ) : (
                                    <>
                                    ADD TO BAG
                                    <span className="opacity-60">·</span>
                                    {product.price}
                                    </>
                                )}
                                </button>
                            </div>

                            {/* Botón de Wishlist (30%) */}
                            <div className="w-[30%]">
                                <button className={`w-full h-full py-3.5 rounded-2xl text-[10px] tracking-[0.2em] font-bold border border-border hover:border-foreground transition-all duration-200 ${glass}`}>
                                WISHLIST
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap select-none">
                        {["CRUELTY-FREE", "VEGAN", "DERMATOLOGIST TESTED"].map((tag) => (
                            <span
                            key={tag}
                            className="text-[8px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border"
                            >
                            {tag}
                            </span>
                        ))}
                    </div>

                    {/* Pair with */}
                    <div className={`p-5 rounded-2xl ${glassCard} select-none`}>
                        <p className="text-[9px] tracking-[0.3em] text-muted-foreground mb-4">PAIR IT WITH</p>
                        
                        <div className="flex flex-col gap-3">
                            {PAIR_WITH.filter((p) => p.id !== product.id).slice(0, 2).map((p) => (
                            <div key={p.id} className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary shrink-0">
                                
                                    <img
                                        src={p.image.replace("w=600&h=720", "w=120&h=120")}
                                        alt={p.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] tracking-[0.08em] font-bold truncate">{p.name}</p>
                                    <p className="text-[9px] tracking-[0.05em] text-muted-foreground">{p.price}</p>
                                </div>

                                <button className="shrink-0 text-[8px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all duration-200 border border-border">
                                + ADD
                                </button>

                            </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <style>{`
            @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }
            .animate-marquee { animation: marquee 28s linear infinite; }
            ::-webkit-scrollbar { width: 4px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: #c0384e; border-radius: 99px; }
            `}
        </style>
    </div>
  );
}