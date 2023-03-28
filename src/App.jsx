import React, { useState } from 'react';
import './App.scss';

import { Filters } from './components/Filters';
import { ProductsTable } from './components/ProductsTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const initialProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(el => el.id === product.categoryId);

  const user = usersFromServer.find(el => el.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const filterProducts = (products, selectedUser, query, categories) => {
  let filtered = [...products];

  if (selectedUser !== 'all') {
    filtered = filtered.filter(product => product.user === selectedUser);
  }

  if (categories.length > 0) {
    filtered = filtered
      .filter(product => categories.includes(product.category));
  }

  return filtered.filter((product) => {
    const lowerCasedName = product.name.toLowerCase();
    const lowerCasedQuery = query.toLowerCase();

    return (
      lowerCasedName.includes(lowerCasedQuery)
    );
  });
};

const sortProducts = (filteredProducts, sort) => {
  const sorted = [...filteredProducts];

  const sortAsStrings = (str1, str2) => (
    str1.localeCompare(str2)
  );

  switch (sort.field) {
    case 'ID':
      sorted.sort((a, b) => a.id - b.id);
      break;

    case 'Product':
      sorted.sort((a, b) => sortAsStrings(a.name, b.name));
      break;

    case 'Category':
      sorted.sort((a, b) => sortAsStrings(a.category.title, b.category.title));
      break;

    case 'User':
      sorted.sort((a, b) => sortAsStrings(a.user.name, b.user.name));
      break;

    default:
      break;
  }

  if (sort.order === 'desc') {
    return sorted.reverse();
  }

  return sorted;
};

export const App = () => {
  const [user, setUser] = useState('all');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState({ field: '', order: 'asc' });

  const filteredProducts = filterProducts(
    initialProducts,
    user,
    query,
    categories,
  );

  const sortedProducts = sortProducts(filteredProducts, sort);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          selectedUser={user}
          setUser={setUser}
          query={query}
          setQuery={setQuery}
          categories={categories}
          setCategories={setCategories}
        />

        <div className="box table-container">
          {filteredProducts.length > 0
            ? (
              <ProductsTable
                products={sortedProducts}
                sort={sort}
                setSort={setSort}
              />
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
