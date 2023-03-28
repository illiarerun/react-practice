import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryID => (
    categoryID.id === product.categoryId));

  const user = usersFromServer.find(userId => userId.id === category.ownerId);

  return {
    ...product,
    user,
    category,

  };
});

export const App = () => {
  const [activeUserId, setActiveUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const visibleProducts = products.filter((product) => {
    const { user, name } = product;

    return (activeUserId === 0 || user.id === activeUserId)
      && name.toLowerCase().includes(query.toLowerCase());
  });

  /* eslint-disable-next-line */
  const handleCategorySelect = (id) => {
    const isSelected = selectedCategories.includes(id);
    const updatedSelectedCategoriesIds = isSelected
      ? selectedCategories.filter(selectedId => selectedId !== id)
      : [
        ...selectedCategories,
        id,
      ];

    setSelectedCategories(updatedSelectedCategoriesIds);
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
              >
                All
              </a>
              {usersFromServer.map((user) => {
                const { id, name } = user;

                return (
                  <a
                    data-cy="FilterUser"
                    className={classNames(
                      { 'is-active': activeUserId === id },
                    )}
                    key={id}
                    href="#/"
                    onClick={() => setActiveUserId(id)}
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
                  onChange={event => setQuery(event.target.value)}
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
              {categoriesFromServer.map((category) => {
                const { title, id } = category;

                return (
                  <a
                    data-cy="Category"
                    className={classNames(
                      'button',
                      'mr-2',
                      'mr-1',
                      { 'is-info': selectedCategories.includes(id) },
                    )}
                    href="#/"
                  >
                    {title}
                  </a>
                );
              })}
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
          {visibleProducts.length > 0
            ? (
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
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
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
                  {visibleProducts.map((product) => {
                    const {
                      id,
                      name,
                      user,
                      category,
                    } = product;

                    return (
                      <tr data-cy="Product" key={id}>
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {id}
                        </td>
                        <td data-cy="ProductName">{name}</td>
                        <td data-cy="ProductCategory">
                          <span role="img">{category.icon}</span>
                          {`- ${category.title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={classNames(
                            { 'has-text-link': user.sex === 'm' },
                            { 'has-text-danger': user.sex === 'f' },
                          )}
                        >
                          {user.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};
