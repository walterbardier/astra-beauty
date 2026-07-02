
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

export const PRODUCTS: Product[] = [
  // Highlighter
  {
    id: 1,
    name: "LUNAR GLOW HIGHLIGHTER",
    category: "FACE",
    price: "$35.00",
    priceNum: 35,
    shade: "Moonlight Silver",
    image: "../../public/images/products/highlighter-1.png",
    tag: "NEW",
    rating: 4.8,
    reviews: 118,
    description: "A pressed powder highlighter with a silky texture that reflects light like stardust. Brilliant silver finish, ideal for a dimensional and ethereal look.",
    shades: [
      { name: "Eternal Lavander", color: "#d7aaff" },
      { name: "Moonlight Silver", color: "#E0E0E0" },
      { name: "Beige Rose", color: "#ffaab4" },
      { name: "Nebula Blue", color: "#8876ff" },
    ],
    gallery: [
      "../../public/images/products/highlighter-2.png",
      "../../public/images/products/highlighter-3.png",
      "../../public/images/products/highlighter-4.png",
    ],
  },

  // Gloss
  {
    id: 2,
    name: "STELLAR GLOSS",
    category: "LIPS",
    price: "$22.00",
    priceNum: 22,
    shade: "Perigee",
    image: "../../public/images/products/gloss-1.png",
    tag: "NEW",
    rating: 4.5,
    reviews: 67,
    description: "High-shine, non-sticky lip gloss that delivers dimensional color and plump-looking volume. Buildable from sheer to bold in one sweep.",
    shades: [
      { name: "Perigee", color: "#e8a0a0" },
      { name: "Aphelion", color: "#894c76" },
    ],
    gallery: [
      // "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=240&fit=crop&auto=format",
      // "https://images.unsplash.com/photo-1626895872564-b691b6877b83?w=200&h=240&fit=crop&auto=format",
      // "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=200&h=240&fit=crop&auto=format",
      "../../public/images/products/gloss-2.png",
    ],
  },

  // Eyeshadow palette
  {
    id: 3,
    name: "NEBULA DREAM EYESHADOW PALETTE",
    category: "EYES",
    price: "$52.00",
    priceNum: 52,
    shade: "Lavander-Blue-Silver-White",
    image: "../../public/images/products/eyeshadow-palette-1.png",
    tag: "NEW",
    rating: 4.9,
    reviews: 156,
    description: "A celestial palette with 16 shades that navigate between soft lavenders, deep blues, and glimmers of silver and white. High-pigmentation matte and metallic finishes.",
    shades: [
      { name: "Lavender", color: "#B57EDC" },
      { name: "Crimson", color: "#9E2A2B" },
      // { name: "Silver", color: "#C0C0C0" },
      // { name: "White", color: "#FFFFFF" }
    ],
    gallery: [
      "../../public/images/products/eyeshadow-palette-2.png",
    ],
  },
  
  // Lipstick
  {
    id: 4,
    name: "ZENITH LIPSTICK",
    category: "LIPS",
    price: "$18.00",
    priceNum: 18,
    shade: "Lunar Rose",
    image: "../../public/images/products/lipstick-1.png",
    tag: "BESTSELLER",
    rating: 4.8,
    reviews: 312,
    description: "A precise, long-wearing lip liner that defines and shapes with effortless control. Glides on smoothly for a bold, clean edge that lasts all day.",
    shades: [
      { name: "Lunar Rose", color: "#d4736a" },
      { name: "Midnight Plum", color: "#5c2d4a" },
      { name: "Bare Transit", color: "#c4906e" },
    ],
    gallery: [
      // "https://images.unsplash.com/photo-1626895872564-b691b6877b83?w=200&h=240&fit=crop&auto=format",
      // "https://images.unsplash.com/photo-1631214524049-0ebbbe6d81aa?w=200&h=240&fit=crop&auto=format",
      // "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=200&h=240&fit=crop&auto=format",
      "../../public/images/products/lipstick-2.png",
      "../../public/images/products/lipstick-3.png",
    ],
  },

  // Lip Liner
  {
    id: 5,
    name: "ORBIT PRECISION LIPLINER",
    category: "LIPS",
    price: "$22.00",
    priceNum: 22,
    shade: "Multi-Shade",
    image: "../../public/images/products/lipliner-1.png",
    tag: "NEW",
    rating: 4.7,
    reviews: 135,
    description: "A high-definition, creamy lip liner designed for cosmic precision. Its long-lasting, transfer-proof formula effortlessly defines and contours your lips for a flawless finish.",
    shades: [
      { name: "Cosmic Lavender", color: "#B57EDC" },
      { name: "Lunar Beige", color: "#D7B5A6" },
      { name: "Deep Bordo", color: "#660202" }
    ],
    gallery: [
      "../../public/images/products/lipliner-2.png",
      "../../public/images/products/lipliner-3.png",
    ],
  },
  
  // Liquid Eyeliner
  {
    id: 6,
    name: "VOID INK LIQUID EYELINER",
    category: "EYES",
    price: "$42.00",
    priceNum: 42,
    shade: "Black",
    image: "../../public/images/products/liquid-eyeliner-1.png",
    tag: "NEW",
    rating: 4.6,
    reviews: 89,
    description: "High-precision liquid eyeliner with a deep matte finish. Long-lasting formula inspired by the darkness of the cosmic void.",
    shades: [
      { name: "Void Black", color: "#000000" },
      { name: "Lunar White", color: "#FFFFFF" },
    ],
    gallery: [
      "../../public/images/products/liquid-eyeliner-2.png",
    ],
  },
  {
    id: 7,
    name: "LUNAR MIST LIQUID EYELINER",
    category: "EYES",
    price: "$42.00",
    priceNum: 42,
    shade: "White",
    image: "../../public/images/products/liquid-eyeliner-2.png",
    tag: "NEW",
    rating: 4.8,
    reviews: 72,
    description: "Pure white liquid eyeliner with a luminous finish. Its ultra-bright formula evokes the clarity of starlight in space.",
    shades: [
      { name: "Lunar White", color: "#FFFFFF" },
      { name: "Void Black", color: "#000000" },
    ],
    gallery: [
      "../../public/images/products/liquid-eyeliner-1.png",
    ],
  },

  // Blush
  {
    id: 8,
    name: "NEBULA BLUSH STICK",
    category: "FACE",
    price: "$24.00",
    priceNum: 24,
    shade: "Rose Red",
    image: "../../public/images/products/blush-1.png",
    tag: "BEST SELLER",
    rating: 4.8,
    reviews: 120,
    description: "Blush en barra de alta pigmentación con acabado dewy. Una textura cremosa que se funde con la piel para un toque de color galáctico.",
    shades: [
      { name: "Cosmic Rose", color: "#d13658" },
    ],
    gallery: [
      "../../public/images/products/blush-2.png",
    ],
  },

  // Concealer & Contour
  {
    id: 9,
    name: "GRAVITY LIFT CONCEALER",
    category: "FACE",
    price: "$22.00",
    priceNum: 22,
    shade: "Multi-Shade",
    image: "../../public/images/products/concealer-1.png",
    tag: "ESSENTIAL",
    rating: 4.9,
    reviews: 215,
    description: "Corrector líquido de larga duración con tecnología de cobertura total. Corrige, ilumina y define con un acabado sedoso estilo metalizado.",
    shades: [
      { name: "Light Orbit", color: "#f3e5d3" },
      { name: "Medium Planet", color: "#d2b48c" },
      { name: "Dark Galaxy", color: "#7a5c48" },
    ],
    gallery: [
      "../../public/images/products/concealer-2.png",
      "../../public/images/products/concealer-3.png",
    ],
  },
  {
    id: 10,
    name: "ORBITAL CONTOUR PALETTE",
    category: "FACE",
    price: "$32.00",
    priceNum: 32,
    shade: "Universal",
    image: "../../public/images/products/concealer-contour-1.png",
    tag: "PRO",
    rating: 4.7,
    reviews: 98,
    description: "Paleta multifuncional para esculpir y resaltar tus rasgos. Formulación mate y brillante para una dimensión espacial perfecta.",
    shades: [
      { name: "Lunar Highlight", color: "#f8f0e5" },
      { name: "Deep Space Contour", color: "#6b4f42" },
    ],
    gallery: [],
  },

  // Skin
  {
    id: 21,
    name: "LUNA B-GLOW SERUM",
    category: "SKIN",
    price: "$34.00",
    priceNum: 34,
    shade: "Silver Glow",
    image: "../../public/images/products/serum-1.png",
    tag: "NEW",
    rating: 4.9,
    reviews: 52,
    description: "Serum facial iluminador de textura ligera. Formulado con activos aclarantes para unificar el tono de la piel y devolverle su resplandor natural con un acabado de cristal líquido.",
    shades: [
      { name: "Clear Radiance", color: "#e0e0e0" },
    ],
    gallery: [
      "../../public/images/products/serum-2.png",
    ],
  },
  {
    id: 11,
    name: "VOID FACE SERUM",
    category: "SKIN",
    price: "$42.00",
    priceNum: 42,
    shade: "Universal",
    image: "https://images.unsplash.com/photo-1764694071508-e4b1efcd39bc?w=600&h=720&fit=crop&auto=format",
    tag: "NEW",
    rating: 4.6,
    reviews: 89,
    description: "A weightless, fast-absorbing serum that visibly smooths, plumps, and illuminates. Formulated with hyaluronic acid and peptides for every atmosphere.",
    shades: [
      { name: "Universal", color: "#e8d5be" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1764694071462-db50e50a3925?w=200&h=240&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1777840347880-747242e0db00?w=200&h=240&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1767360963892-3353defd6584?w=200&h=240&fit=crop&auto=format",
    ],
  },
  {
    id: 12,
    name: "ORBITAL DETOX MIST",
    category: "SKIN",
    price: "$28.00",
    priceNum: 28,
    shade: "Rose Water",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=720&fit=crop&auto=format",
    tag: "NEW",
    rating: 4.5,
    reviews: 84,
    description: "Bruma facial refrescante infundida con agua de rosas y antioxidantes. Un boost de hidratación instantánea que revitaliza la piel y fija tu ritual de cuidado.",
    shades: [
      { name: "Rose Cream", color: "#ffeef6" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1767360963892-3353defd6584?w=200&h=240&fit=crop&auto=format",
    ],
  },
  
];