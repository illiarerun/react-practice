import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categ => categ.id === product.categoryId) || null;

  const user = usersFromServer
    .find(person => person.id === category.ownerId) || null;

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedOwner, setSelectedOwners] = useState('');
  const [query, setQuery] = useState('');

  const handleReset = () => {
    setSelectedOwners('');
    setQuery('');
  };

  const handleQuery = (event) => {
    setQuery(event.currentTarget.value);
  };

  const visibleProduct = products.filter((product) => {
    const normalizeQuery = query.trim().toLowerCase();
    const normalizeNameProduct = product.name.toLowerCase();

    return normalizeNameProduct.includes(normalizeQuery);
  });

  const filteredByName = visibleProduct.filter((product) => {
    const { user } = product;

    return selectedOwner
      ? user.id === selectedOwner
      : products;
  });

  const showTheTable = Boolean(filteredByName.length);

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
                className={classNames(
                  {
                    'is-active': selectedOwner === '',
                  },
                )}
                value={selectedOwner}
                onClick={() => setSelectedOwners('')}
              >
                All
              </a>

              {usersFromServer.map((user) => {
                const {
                  id,
                  name,
                } = user;

                return (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    key={id}
                    className={classNames(
                      {
                        'is-active': selectedOwner === id,
                      },
                    )}
                    value={id}
                    onClick={() => setSelectedOwners(id)}
                  >
                    {name}
                  </a>
                );
              })}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleQuery}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
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
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!showTheTable && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {showTheTable && (
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
                {filteredByName.map((product) => {
                  const {
                    id,
                    name,
                    category,
                    user,
                  } = product;

                  return (
                    <tr
                      data-cy="Product"
                      key={id}
                    >
                      <td
                        className="has-text-weight-bold"
                        data-cy="ProductId"
                      >
                        {id}
                      </td>

                      <td data-cy="ProductName">
                        {name}
                      </td>

                      <td data-cy="ProductCategory">
                        <span>{category.icon}</span>
                        {' - '}
                        {category.title}
                      </td>

                      <td
                        data-cy="ProductUser"
                        className={classNames(
                          {
                            'has-text-link': user.sex === 'm',
                          },
                          {
                            'has-text-danger': user.sex === 'f',
                          },
                        )}
                      >
                        {user.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
