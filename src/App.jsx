import React, { useState } from 'react';
import { ProductsTable } from './components/ProductsTable';
import { Filters } from './components/Filters';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import './App.scss';
import { getFilteredProducts } from './helpers/getFilteredProducts';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    ({ id }) => id === product.categoryId,
  );

  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [userIdFilter, setUserIdFilter] = useState(0);
  const [categoryIdsFilter, setCategoryIdsFilter] = useState([]);
  const [queryFilter, setQueryFilter] = useState('');

  const filteredProducts = getFilteredProducts(
    products,
    userIdFilter,
    categoryIdsFilter,
    queryFilter,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            users={usersFromServer}
            categories={categoriesFromServer}
            selectedCategories={categoryIdsFilter}
            onUserFilterChange={setUserIdFilter}
            onCategoryFilterChange={setCategoryIdsFilter}
            onQueryFilterChange={setQueryFilter}
          />
        </div>

        <div className="box table-container">
          {filteredProducts.length > 0 ? (
            <ProductsTable products={filteredProducts} />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
