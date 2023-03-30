import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => product.categoryId === id);
  const user = usersFromServer.find(({ id }) => category.ownerId === id);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  // filtering products by UserId

  const [selectedUserId, setSelectedUserId] = useState(0);

  let visibleProducts = [...products];

  if (selectedUserId) {
    visibleProducts = visibleProducts
      .filter(({ user }) => user.id === selectedUserId);
  }

  // searching products by its name from input field

  const [query, setQuery] = useState('');

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visibleProducts = visibleProducts
      .filter(({ name }) => name.toLocaleLowerCase().includes(lowerQuery));
  }

  // filtering products by its CategoryId

  const [selectedCategory, setSelectedCategory] = useState(0);

  if (selectedCategory) {
    visibleProducts = visibleProducts
      .filter(({ category }) => category.id === selectedCategory);
  }

  const resetAll = () => {
    setQuery('');
    setSelectedCategory(0);
    setSelectedUserId(0);
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
                onClick={() => setSelectedUserId(0)}
              >
                All
              </a>

              {usersFromServer.map(({ name, id }) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': id === selectedUserId,
                  })}
                  key={id}
                  onClick={() => setSelectedUserId(id)}
                >
                  {name}
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
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {query && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames(
                  'button is-success mr-6',
                  {
                    'is-outlined': selectedCategory !== 0,
                  },
                )}
                onClick={() => setSelectedCategory(0)}
              >
                All
              </a>

              {categoriesFromServer.map(({ title, id }) => (
                <a
                  data-cy="Category"
                  className={classNames(
                    'button mr-2 my-1',
                    {
                      'is-info': id === selectedCategory,
                    },
                  )}
                  href="#/"
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                >
                  {title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length > 0 ? (
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
                {visibleProducts.map(({ id, name, category, user }) => (
                  <tr data-cy="Product" key={id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">
                      {`${category.icon} - ${category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames(
                        'has-text-link',
                        {
                          'has-text-danger': user.sex === 'f',
                        },
                      )}
                    >
                      {user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
