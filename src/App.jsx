import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const findCategoryById = (id) => (
  categoriesFromServer.find(category => category.id === id)
);

const findUserById = (id) => (
  usersFromServer.find(user => user.id === id)
);

const fullproducts = productsFromServer.map(product => {
  const currentCategory = findCategoryById(product.categoryId);

  return {
    ...product,
    category: currentCategory,
    user: findUserById(currentCategory.ownerId),
  }
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [foundProduct, setFoundProduct] = useState('');

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
                onClick={() => setSelectedUser(null)}
                className={classNames(
                  {'is-active': selectedUser === null}
                )}
              >
                All
              </a>
              {usersFromServer.map(user => {
                const { name, id } = user;

                return (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    key={id}
                    onClick={() => setSelectedUser(user)}
                    className={classNames(
                      {'is-active': selectedUser && selectedUser.id === id}
                    )}
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
                  value={foundProduct}
                  onChange={(event) => setFoundProduct(event.target.value)}
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

            <tbody>
              {fullproducts.map(product => {
                const {
                  id,
                  name,
                  category,
                  user,
                } = product;

                return (
                  <>
                    {selectedUser === null
                      ? (<tr data-cy="Product" key={id}>
                          <td className="has-text-weight-bold" data-cy="ProductId">
                            {id}
                          </td>

                          <td data-cy="ProductName">{name}</td>
                          <td data-cy="ProductCategory">{category.icon} - {category.title}</td>

                          <td
                            data-cy="ProductUser"
                            className={classNames(
                              {'has-text-link': user.sex === 'm'},
                              {'has-text-danger': user.sex === 'f'}
                            )}
                          >
                            {user.name}
                          </td>
                        </tr>)
                      : user.id === selectedUser.id
                        && (<tr data-cy="Product" key={id}>
                          <td className="has-text-weight-bold" data-cy="ProductId">
                            {id}
                          </td>

                          <td data-cy="ProductName">{name}</td>
                          <td data-cy="ProductCategory">{category.icon} - {category.title}</td>

                          <td
                            data-cy="ProductUser"
                            className={classNames(
                              {'has-text-link': user.sex === 'm'},
                              {'has-text-danger': user.sex === 'f'}
                            )}
                          >
                            {user.name}
                          </td>
                        </tr>)
                    }
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
