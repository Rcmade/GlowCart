import { api } from '../../lib/api';
import { Product } from './types';
export type FetchProductsParams = {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
};

export interface CosmeticProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** ---------- Helpers to "cosmetic-ize" DummyJSON data ---------- */

const COSMETIC_BRANDS = [
  'Viorra',
  'Lumineux',
  'Roselle',
  'Aurea',
  'BelleVie',
  'Nouveau',
  'Serein',
];

const COSMETIC_ADJECTIVES = [
  'Glow',
  'Velvet',
  'Silk',
  'Radiant',
  'Luxe',
  'Pure',
  'Dew',
];

function getCosmeticBrand(id: number) {
  return COSMETIC_BRANDS[id % COSMETIC_BRANDS.length];
}

function getCosmeticName(originalTitle: string, id: number) {
  const base = originalTitle?.split(' ')[0] ?? 'Serum';
  const adj = COSMETIC_ADJECTIVES[id % COSMETIC_ADJECTIVES.length];
  return `${getCosmeticBrand(id)} ${adj} ${base}`;
}

function getCosmeticDescription(originalDescription?: string) {
  const short = originalDescription
    ? originalDescription.split('.').slice(0, 2).join('.').trim()
    : 'A premium cosmetic product for everyday beauty.';
  return `${short}. Expertly formulated to enhance natural radiance.`;
}

function safeNumber(n: unknown, fallback = 0) {
  const parsed = Number(n);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Map a raw DummyJSON product to your cosmetic Product shape */
function mapDummyToCosmetic(product: any): Product {
  const id = safeNumber(product?.id, Math.floor(Math.random() * 100000));
  const title = getCosmeticName(product?.title ?? 'Beauty Item', id);
  const price = Math.round(safeNumber(product?.price, 100) * 0.8);
  const description = getCosmeticDescription(product?.description);
  const image =
    product?.thumbnail || (product?.images && product.images[0]) || '';
  const ratingRate = safeNumber(product?.rating, Math.random() * 2 + 3);
  const ratingCount = Math.max(0, Math.floor(Math.random() * 200) + 50);

  return {
    id,
    title,
    price,
    description,
    category: 'cosmetics',
    image,
    rating: {
      rate: Math.round(ratingRate * 100) / 100,
      count: ratingCount,
    },
    discountPercentage: product?.discountPercentage ?? undefined,
    stock: safeNumber(product?.stock, undefined) || undefined,
    brand: product?.brand ?? getCosmeticBrand(id),
    thumbnail: product?.thumbnail ?? undefined,
    images: product?.images ?? (product?.thumbnail ? [product.thumbnail] : []),
    dimensions: {
      width: product?.dimensions?.width ?? undefined,
      height: product?.dimensions?.height ?? undefined,
      depth: product?.dimensions?.depth ?? undefined,
    },
    warrantyInformation: product?.warrantyInformation ?? undefined,
    shippingInformation: product?.shippingInformation ?? undefined,
    reviews: Array.isArray(product?.reviews) ? product.reviews : [],
    tags: Array.isArray(product?.tags)
      ? product.tags.map((t: any) => String(t))
      : undefined,
  };
}

/** ---------- Main fetch function (returns CosmeticProductsResponse) ---------- */

export async function fetchProducts(
  params: FetchProductsParams = {},
): Promise<CosmeticProductsResponse> {
  const { limit = 20, skip = 0, search, category } = params;

  try {
    let res;
    if (search && search.trim().length > 0) {
      res = await api.get('/products/search', {
        params: { q: search.trim(), limit, skip },
      });
    } else if (category && category.trim().length > 0) {
      // keep using the category endpoint for server-side filtering, but we will
      // still map results to 'cosmetics' category in the returned items.
      res = await api.get(
        `/products/category/${encodeURIComponent(category)}`,
        {
          params: { limit, skip },
        },
      );
    } else {
      res = await api.get('/products', { params: { limit, skip } });
    }

    const data = res?.data ?? {};
    const rawProducts: any[] = Array.isArray(data.products)
      ? data.products
      : [];

    const cosmeticProducts = rawProducts.map(mapDummyToCosmetic);

    const total = safeNumber(data.total, cosmeticProducts.length);
    const returnedSkip = safeNumber(data.skip, skip);
    const returnedLimit = safeNumber(data.limit, limit);

    return {
      products: cosmeticProducts,
      total,
      skip: returnedSkip,
      limit: returnedLimit,
    };
  } catch (err) {
    // normalize error for caller
    const message =
      err instanceof Error ? err.message : 'Failed to fetch products';
    throw new Error(message);
  }
}


export async function fetchProductById(id: number | string): Promise<Product> {
  const numericId = typeof id === 'string' ? Number(id) : id;
  if (!Number.isFinite(numericId)) {
    throw new Error('Invalid product id');
  }

  try {
    const res = await api.get(`/products/${numericId}`);
    const raw = res?.data ?? null;
    if (!raw) throw new Error('Product not found');

    // Raw DummyJSON product structure may be directly returned.
    // Map to cosmetic Product shape:
    return mapDummyToCosmetic(raw);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch product';
    throw new Error(message);
  }
}