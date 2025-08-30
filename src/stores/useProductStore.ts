import { create } from 'zustand';
import { Product } from '../types';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  wishlist: number[];
  fetchProducts: () => Promise<void>;
  toggleWishlist: (productId: number) => void;
  searchProducts: (query: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  wishlist: [],

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://dummyjson.com/products?limit=50');
      const data = await response.json();

      // Filter and map products to mimic cosmetic items
      const cosmeticProducts = (data.products || []).map(
        (product: any): Product => ({
          id: product.id,
          title: getCosmeticName(product.title, product.id),
          price: Math.round(product.price * 0.8),
          description: getCosmeticDescription(product.description),
          category: 'cosmetics',
          image: product.thumbnail || product.images?.[0],
          rating: {
            rate: product.rating || Math.random() * 2 + 3,
            count: Math.floor(Math.random() * 200) + 50,
          },
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          brand: getCosmeticBrand(product.id),
          thumbnail: product.thumbnail,
          images: product.images || [product.thumbnail],
          dimensions: {
            depth: product?.dimensions?.depth || 0,
            width: product?.dimensions?.width || 0,
            height: product?.dimensions?.height || 0,
          },
          warrantyInformation: product?.warrantyInformation,
          shippingInformation: product?.shippingInformation,
          reviews: product?.reviews || [],
        }),
      );

      set({ products: cosmeticProducts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  toggleWishlist: (productId: number) => {
    const { wishlist } = get();
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    set({ wishlist: newWishlist });
  },

  searchProducts: (query: string) => {
    const { products } = get();
    return products.filter(
      product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    );
  },
}));

// Helper functions to create cosmetic-themed names
const getCosmeticName = (originalTitle: string, id: number): string => {
  const cosmeticNames = [
    'Essence Mascara Lash Princess',
    'Eyeshadow Palette Pro',
    'Powder Canister',
    'Lipstick Collection',
    'Foundation Perfect Match',
    'Concealer Pro Coverage',
    'Blush Natural Glow',
    'Highlighter Shimmer',
    'Eyeliner Precision',
    'Lip Gloss Shine',
    'Bronzer Sun-Kissed',
    'Setting Spray All-Day',
    'Primer Smooth Base',
    'Brow Pencil Define',
    'Lip Balm Hydrating',
  ];

  return cosmeticNames[id % cosmeticNames.length] || `Beauty Essential ${id}`;
};

const getCosmeticDescription = (originalDescription: string): string => {
  const descriptions = [
    originalDescription,
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long lasting and cruelty free formula',
    'Professional eyeshadow palette with highly pigmented colors. Perfect for creating stunning eye looks from natural to dramatic.',
    'Lightweight powder compact for setting makeup and reducing shine. Provides a smooth, matte finish that lasts all day.',
    'Rich, creamy lipstick collection with intense color payoff. Long-wearing formula keeps lips moisturized and vibrant.',
    'Full coverage foundation that matches your skin tone perfectly. Buildable formula provides a natural, flawless finish.',
    'High-coverage concealer that hides imperfections and brightens under-eyes. Blends seamlessly for a natural look.',
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getCosmeticBrand = (id: number): string => {
  const brands = ['Essence', 'Viorra', 'GlowCart', 'BeautyPro', 'Luxe'];
  return brands[id % brands.length];
};
