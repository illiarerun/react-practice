import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function findCategory(productId) {
  const product = categoriesFromServer
    .find(category => category.id === productId);

  return product;
}

function findUser(ownerId) {
  const users = usersFromServer.find(user => user.id === ownerId);

  return users;
}

const products = productsFromServer.map((product) => {
  const category = findCategory(product.categoryId); // find by product.categoryId
  const user = findUser(category.ownerId); // find by category.ownerId

  return { ...product, category, user };
});

export const App = () => {
  const [currentProducts, setCurrentProducts] = useState(products);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [inputSearch, setInputSearch] = useState('');

  // const handleFilterByInput = () => {
  //   const filtered = products.filter(product => product.name
  //     .includes(inputSearch.toLowerCase())
  //   || product.name.includes(inputSearch.toUpperCase()));

  //   setCurrentProducts(filtered);
  // };

  const handleFilterByUser = (userId) => {
    const filtered = products
      .filter(product => (product.category.ownerId === userId)
      && (product.name.toLowerCase().includes(inputSearch.trim().toLowerCase())
      || product.name.toUpperCase().includes(inputSearch.trim().toUpperCase())
      ));

    setCurrentProducts(filtered);
  };

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
                className={classNames({ 'is-active': currentUserId === 0 })}
                onClick={() => {
                  setCurrentUserId(0);
                  setCurrentProducts(products);
                }}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames(
                    { 'is-active': currentUserId === user.id },
                  )}
                  onClick={() => {
                    setCurrentUserId(user.id);
                    handleFilterByUser(user.id);
                  }}
                >
                  {user.name}
                </a>
              )) }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={inputSearch}
                  onChange={(event) => {
                    setInputSearch(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {inputSearch.length === 0 || (
                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => {
                      setInputSearch('');
                    }}
                  />
                </span>
                )}

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
                onClick={() => {
                  setCurrentProducts(products);
                  setCurrentUserId(0);
                  setInputSearch('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {currentProducts.length !== 0
          || (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
          )}

          {currentProducts.length === 0
          || (
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
              {currentProducts.map(product => (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={classNames(
                      { 'has-text-link': product.user.sex === 'm' },
                      { 'has-text-danger': product.user.sex === 'f' },
                    )}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
};
