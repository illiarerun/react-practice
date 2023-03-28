import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import { ProductsList } from './components/ProductsList';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => id === product.categoryId);
  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

function checkFilter(user, selectedUserId, filterInput) {
  return filterInput
    ? user.toLowerCase()
      .includes(filterInput.toLowerCase().trim())
    : user.id === selectedUserId;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [filteredProducts, setfilteredProducts] = useState(products);
  const [filterInput, setfilterInput] = useState('');

  const filteredProductsByUser = (selectedUserId, filterInput) => {
    products.filter(product => {
    const {
      user,
    } = product;

    return checkFilter(user, selectedUserId, filterInput);
  })};

  const showAllUsers = () => {
    setfilteredProducts(products);
  };

  const handleFilterInput = (event) => {
    setfilterInput(event.target.value);
    setfilteredProducts(filteredProductsByUser);
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
                onClick={showAllUsers}
              >
                All
              </a>

              {usersFromServer.map((user) => {
                const {
                  id,
                  name,
                } = user;
                const isUserActive = id === selectedUserId;

                const handleClick = (isUserActive) => {
                  if (!isUserActive) {
                    setSelectedUserId(id);
                    setfilteredProducts(filteredProductsByUser(id));
                  }
                }

                return (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    key={id}
                    className={classNames({
                      'is-active': isUserActive,
                    })}
                    onClick={() => handleClick(isUserActive)}
                  >
                    {name}
                  </a>
                )
              })}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  name="filterInput"
                  value={filterInput}
                  onChange={handleFilterInput}
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

            <ProductsList products={filteredProducts} />
          </table>
        </div>
      </div>
    </div>
  )
};
