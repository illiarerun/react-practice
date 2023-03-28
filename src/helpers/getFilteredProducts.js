export const getFilteredProducts = (
  products,
  userId,
  categoryIds,
  query,
) => {
  let filteredProducts = [...products];

  if (userId > 0) {
    filteredProducts = filteredProducts.filter(
      product => product.user.id === userId,
    );
  }

  if (categoryIds.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => categoryIds.includes(product.categoryId),
    );
  }

  if (query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(normalizedQuery),
    );
  }

  return filteredProducts;
};
