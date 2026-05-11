export interface Product {
  id: string;
  slug: string;
  name: string;
  flavor: string;
  price: number;
  formattedPrice: string;
  content: string;
  creatinePerServing: string;
  formula: string;
  description: string;
  image: string;
  accentColor: "lime" | "red" | "green";
}

export const products: Product[] = [
  {
    id: "kreatonite-limon",
    slug: "kreatonite-limon",
    name: "KREATONITE Limón",
    flavor: "Limón",
    price: 24990,
    formattedPrice: "$24.990",
    content: "300g",
    creatinePerServing: "4.5g",
    formula: "Creatina monohidratada + Electrolitos + Magnesio + Vitamina B12",
    description: "Energía cítrica explosiva para entrenamientos de alto rendimiento.",
    image: "/images/products/kreatonite-limon.jfif",
    accentColor: "lime"
  },
  {
    id: "kreatonite-frutos-rojos",
    slug: "kreatonite-frutos-rojos",
    name: "KREATONITE Frutos Rojos",
    flavor: "Frutos Rojos",
    price: 24990,
    formattedPrice: "$24.990",
    content: "300g",
    creatinePerServing: "4.5g",
    formula: "Creatina monohidratada + Electrolitos + Magnesio + Vitamina B12",
    description: "Potencia intensa y sabor salvaje para superar tus límites.",
    image: "/images/products/kreatonite-frutos-rojos.jfif",
    accentColor: "red"
  },
  {
    id: "kreatonite-manzana",
    slug: "kreatonite-manzana",
    name: "KREATONITE Manzana",
    flavor: "Manzana",
    price: 24990,
    formattedPrice: "$24.990",
    content: "300g",
    creatinePerServing: "4.5g",
    formula: "Creatina monohidratada + Electrolitos + Magnesio + Vitamina B12",
    description: "Frescura verde, enfoque y energía para máximo rendimiento.",
    image: "/images/products/kreatonite-manzana.jfif",
    accentColor: "green"
  }
];
