import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { Products } from './components/Products';
import { Filter } from './components/Filter';

const productsList = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categor => categor.id === product.categoryId); // find by product.categoryId

  const user = usersFromServer.find(usr => usr.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(productsList);

  useEffect(() => {
    setProducts(productsList);
  }, []);

  const handleQuery = useCallback((event) => {
    setQuery(event.target.value);
  });

  const handleReset = useCallback((event) => {
    setQuery('');
    setUserId(0);
  });

  const filterProduct = useMemo(() => (userId
    ? products.filter(products.user.id === userId)
    : products), [userId, products]);

  const filterQuery = useMemo(() => filterProduct
    .filter(product => product.name
      .toLowerCase().includes(query.toLowerCase())), [filterProduct, query]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filter
            userId={userId}
            setUserId={setUserId}
            query={query}
            changeQuery={handleQuery}
            users={usersFromServer}
            categories={categoriesFromServer}
            resetFilter={handleReset}
          />
        </div>

        <div className="box table-container">
          {filterQuery.length === 0 && (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <Products products={filterQuery} key={products.id} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
