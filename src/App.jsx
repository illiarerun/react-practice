import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const categoryForProduct = categoriesFromServer
    .find(category => product.categoryId === category.id || null);

  const userWithCategory = usersFromServer
    .find(user => user.id === categoryForProduct.ownerId || null);

  return {
    ...product,
    category: categoryForProduct,
    user: userWithCategory,
  };
});

const getVisibleProductsAfterInput = (visibleProducts, input) => (
  visibleProducts.filter(product => (
    product.name.toLowerCase().includes(input.toLowerCase())
  ))
);

export const App = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const visibleProductsAfterInput
   = getVisibleProductsAfterInput(visibleProducts, inputValue);

  const handlerFilterBySelectedUser = (selectUser) => {
    setSelectedUser(selectUser);

    const filteredVisibleProducts
      = products
        .filter((product) => {
          const { user } = product;

          if (selectUser === null) {
            return true;
          }

          return user === selectUser;
        });

    setVisibleProducts(filteredVisibleProducts);
  };

  const handlerFilterByInput = (event) => {
    setInputValue(event.target.value);
  };

  const handlerReset = () => {
    setInputValue('');
    setSelectedUser(null);
    setVisibleProducts(products);
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
                className={classNames({
                  'is-active': !selectedUser,
                })}
                onClick={() => handlerFilterBySelectedUser(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  onClick={() => handlerFilterBySelectedUser(user)}
                  className={classNames({
                    'is-active': selectedUser === user,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={inputValue}
                  onChange={handlerFilterByInput}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {inputValue
                  && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setInputValue('')}
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
                onClick={handlerReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProductsAfterInput.length === 0
          && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              {visibleProductsAfterInput.length !== 0
              && (
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
              )}
            </thead>

            <tbody>
              {visibleProductsAfterInput.map((product) => {
                const { id, name, category, user } = product;

                return (
                  <tr
                    data-cy="Product"
                    key={id}
                  >
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">
                      {`${category.icon} - ${category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames({
                        'has-text-link': user.sex === 'm',
                        'has-text-danger': user.sex === 'f',
                      })}
                    >
                      {user.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
