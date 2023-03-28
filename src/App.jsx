import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const categories = categoriesFromServer
    .find(category => category.id === product.categoryId);

  const users = usersFromServer
    .find(user => user.id === categories.ownerId);

  return {
    ...product,
    categories,
    users,
  };
});

export const App = () => {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [nameFilter, setNameFilter] = useState('');

  const handleOwnerClickMouse = (owner) => {
    setSelectedOwner(owner);
  };

  const handleSelectAll = () => {
    setSelectedOwner(null);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleClear = () => {
    setNameFilter('');
  };

  const filteredProducts = selectedOwner
    ? products.filter(product => product.categoryId === selectedOwner)
    : products;

  const nameFilteredProds = filteredProducts
    .filter(product => product.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase()),
);

    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <button
                type="button"
                data-cy="FilterAllUsers"
                href="#/"
                onClick={handleSelectAll}
              >
                All
              </button>

              <button
                type="button"
                data-cy="FilterUser"
                href="#/"
                onClick={handleOwnerClickMouse}
              >
                User 1
              </button>

              <button
                type="button"
                data-cy="FilterUser"
                href="#/"
                className="is-active"
                onClick={handleOwnerClickMouse}
              >
                User 2
              </button>

              <button
                type="button"
                data-cy="FilterUser"
                href="#/"
                onClick={handleOwnerClickMouse}
              >
                User 3
              </button>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
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
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <button
                type="button"
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </button>

              <button
                type="button"
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={handleNameFilterChange}
              >
                Category 1
              </button>

              <button
                type="button"
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
                onClick={handleNameFilterChange}
              >
                Category 2
              </button>

              <button
                type="button"
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                onClick={handleNameFilterChange}
              >
                Category 3
              </button>
              <button
                type="button"
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
                onClick={handleNameFilterChange}
              >
                Category 4
              </button>
            </div>

            <div className="panel-block">
              <button
                type="button"
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleClear}
              >
                Reset all filters
              </button>
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
              <tr data-cy="Product" key={products.id}>
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {products.id}
                </td>

                <td data-cy="ProductName">{products.name}</td>
                <td data-cy="ProductCategory">
                  <span>
                    {products.categories.icon}
                    -
                    {products.categories.title}
                  </span>
                </td>

                <td
                  data-cy="ProductUser"
                  className={users.sex === 'm'
                    ? 'has-text-link'
                    : 'has-text-danger'}
                >
                  {users.name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
