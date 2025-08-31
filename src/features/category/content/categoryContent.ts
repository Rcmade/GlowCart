export const categoryList = [
  {
    slug: 'all',
    name: 'All',
  },
  {
    slug: 'beauty',
    name: 'Beauty',
  },
  {
    slug: 'fragrances',
    name: 'Fragrances',
  },

  {
    slug: 'mens-shoes',
    name: 'Mens Shoes',
  },
  {
    slug: 'mens-watches',
    name: 'Mens Watches',
  },

  {
    slug: 'skin-care',
    name: 'Skin Care',
  },

  {
    slug: 'tops',
    name: 'Tops',
  },

  {
    slug: 'womens-bags',
    name: 'Womens Bags',
  },
  {
    slug: 'womens-dresses',
    name: 'Womens Dresses',
  },
  {
    slug: 'womens-jewellery',
    name: 'Womens Jewellery',
  },
  {
    slug: 'womens-shoes',
    name: 'Womens Shoes',
  },
  {
    slug: 'womens-watches',
    name: 'Womens Watches',
  },
];

// const BASE_URL = 'https://dummyjson.com/products/category/';

// async function fetchTagsFromCategory(slug) {
//   const url =
//     slug === 'all'
//       ? 'https://dummyjson.com/products?limit=0'
//       : `${BASE_URL}${slug}?limit=0`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     const products = data.products || [];

//     const tags = products.flatMap(product => product.tags || []);
//     return [...new Set(tags)]; // Unique tags
//   } catch (error) {
//     console.error(`Error fetching ${slug}:`, error);
//     return [];
//   }
// }

// async function fetchAllTags() {
//   const allTags = new Set();

//   for (const category of categoryList) {
//     const tags = await fetchTagsFromCategory(category.slug);
//     tags.forEach(tag => allTags.add(tag));
//   }

//   console.log('Unique Tags across all categories:');
//   console.log({ allTags });
// }

// fetchAllTags();
