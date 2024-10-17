const BASE_URL = 'https://fakestoreapi.com';

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return res.json();
};

export const getProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return res.json();
};