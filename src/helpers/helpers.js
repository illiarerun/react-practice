import usersFromServer from '../api/users';
import categoriesFromServer from '../api/categories';
import productsFromServer from '../api/products';

function getCategory(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function getOwner(ownerId) {
  return usersFromServer.find(user => user.id === ownerId);
}

export const products = productsFromServer.map((product) => {
  const category = getCategory(product.categoryId);
  const owner = getOwner(category.ownerId);

  return {
    ...product,
    category,
    owner,
  };
});

const findProducts = (content, query) => content.toLowerCase()
  .includes(query.toLowerCase().trim());

export const filterProducts = (
  productArray,
  query,
  person,
  selectedCategories,
) => {
  let shownProducts = productArray.filter(
    ({ name }) => findProducts(name, query),
  );

  if (person) {
    shownProducts = shownProducts.filter(
      product => product.owner.name === person.name,
    );
  }

  if (selectedCategories.length > 0) {
    return shownProducts.filter(product => (
      selectedCategories.some(
        selCategory => selCategory.id === product.category.id,
      )));
  }

  return shownProducts;
};
