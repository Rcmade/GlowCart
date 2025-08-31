import { getItem, setItem } from '../../lib/asyncStorage';

export async function getWishlistByEmail(email: string): Promise<number[]> {
  const wishlists = (await getItem('wishlists')) ?? {};
  return wishlists[email] ?? [];
}

export async function setWishlistByEmail(
  email: string,
  wishlist: number[],
): Promise<void> {
  const wishlists = (await getItem('wishlists')) ?? {};
  wishlists[email] = wishlist;
  await setItem('wishlists', wishlists);
}

export async function toggleWishlistItem(
  email: string,
  productId: number,
): Promise<number[]> {
  const wishlist = await getWishlistByEmail(email);
  const exists = wishlist.includes(productId);

  const updated = exists
    ? wishlist.filter(id => id !== productId)
    : [...wishlist, productId];

  await setWishlistByEmail(email, updated);
  return updated;
}
