import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// function FindUser(users, userId) {
//   return users.find(user => user.id === userId);
// }

// function products(categories, productsWithOwner, users) {
//   return categories.map(category => ({
//     ...category,
//     owner: FindUser(users, category.ownerId),
//     products: productsWithOwner.filter(product => (
//       product.categoryId === category.id
//     )),
//   }));
// }
productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    categori => categori.id === product.categoryId,
  );
  const users = usersFromServer.find(
    user => category.ownerId === user.id,
  );

  return ({
    ...product,
    category,
    users,
  });
});

const getProducts = (selectedUser) => {
  if (selectedUser === 'all') {
    return productsFromServer;
  }

  return productsFromServer.filter(
    product => product.user.id === selectedUser.id,
  );
};

// const prepareCategory = products(
//   categoriesFromServer,
//   productsFromServer,
//   usersFromServer,
// );

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [search, setSearch] = useState('');
  const [] =
  const handleSearch = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = () => {
    setSearch('');
  };

  const handleReset = () => {
    setSelectedUser('all');
    setSearch('');
  };

  const reoederedProduct = getProducts(selectedUser);

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
                  'is-active': selectedUser === 'all',
                })}
                onClick={() => handleSelectedUser('all')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': selectedUser.id === user.id,
                  })}
                  onClick={() => handleSelectedUser(user)}

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
                  value={search}
                  onChange={handleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {search && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={handleDelete}
                    />
                  )}
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

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
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
              {reoederedProduct.map((product) => {
                const {
                  id,
                  category,
                  name,
                  user,
                } = product;

                const isMale = 'm';
                const isFemale = 'f';

                return (
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
                      className={classNames({
                        'has-text-link': isMale,
                        'has-text-danger': isFemale,

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
