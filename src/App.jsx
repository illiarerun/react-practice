import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getCategoryById(categoryId) {
  const finded = categoriesFromServer.find(category => (
    category.id === categoryId
  ));

  return finded || null;
}

function getCUserById(ownerId) {
  const finded = usersFromServer.find(user => (
    user.id === ownerId
  ));

  return finded || null;
}

const products = productsFromServer.map((product) => {
  const category = getCategoryById(product.categoryId);
  const user = getCUserById(category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [listOfProducts, setProducts] = useState(products);
  const [query, setGuery] = useState('');

  const clearInput = () => {
    if (query) {
      setGuery('');
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;

    setGuery(value);
    setProducts(filterProducts(products));
  };

  function filterProducts() {
    products.filter((product) => {
      const loverCaseProduct = product.name.toLowerCase();
      const loverCasequery = query.toLowerCase();

      return loverCaseProduct.includes(loverCasequery);
    });
  }

  const filterByName = (userId) => {
    const filter = products.filter(product => (
      product.category.ownerId === userId
    ));

    return setProducts(filter);
  };

  const cleanFilter = () => (
    setProducts(products)
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={cleanFilter}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => filterByName(1)}
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                // className={classNames(
                //   {'is-active': }
                // )}
                onClick={() => filterByName(2)}
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => filterByName(3)}
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleInput}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={clearInput}
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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
              {listOfProducts.map(product => (
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>
                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={classNames(
                      { 'has-text-danger': product.user.sex === 'f' },
                      { 'has-text-link': product.user.sex === 'm' },
                    )}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
