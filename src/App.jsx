/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

const getCategory = (idCategory) => {
  const caegory = categoriesFromServer
    .find(category => idCategory === category.id);

  return caegory;
};

const getUser = (idUser) => {
  const users = usersFromServer
    .find(user => user.id === idUser);

  return users;
};

const initialList = productsFromServer.map(prod => ({
  id: prod.id,
  product: prod.name,
  category: getCategory(prod.categoryId),
}));

const InitialLIstFull = initialList.map(point => ({
  ...point,
  user: getUser(point.category.ownerId),
}));

export const App = () => {
  const [prodList, setProdList] = useState(InitialLIstFull);
  const [selectedUser, setSelectedUser] = useState(0);
  const [query, setQuery] = useState('');

  const filterBy = (IDUSer) => {
    setSelectedUser(+IDUSer);

    const newProd = InitialLIstFull.filter(point => point.user.id === +IDUSer);

    return setProdList(newProd);
  };

  useEffect(() => {
    const visibleProdList = InitialLIstFull.filter(prod => prod
      .product.toLowerCase().includes(query.toLowerCase().trim()));

    setProdList(visibleProdList);
  }, [query]);

  const reset = () => {
    setSelectedUser(0);
    setQuery('');
    setProdList(InitialLIstFull);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <button
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames(
                  selectedUser === 0
                    ? ('is-active')
                    : (''),
                )}
                value={0}
                onClick={reset}
              >
                All
              </button>
              {
                usersFromServer.map(user => (
                  <button
                    data-cy="FilterUser"
                    href="#/"
                    value={user.id}
                    className={classNames(
                      selectedUser === user.id
                        ? ('is-active')
                        : (''),
                    )}
                    key={user.id}
                    onClick={event => filterBy(event.target.value)}
                  >
                    {user.name}
                  </button>
                ))
              }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {query !== ''
                    && (
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={reset}
                      />
                    )
                  }
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
              {
                prodList.map(prod => (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {prod.id}
                    </td>

                    <td data-cy="ProductName">{prod.product}</td>
                    <td data-cy="ProductCategory">
                      {`${prod.category.icon} - ${prod.category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={classNames(
                        prod.user.sex === 'm'
                          ? ('has-text-link')
                          : ('has-text-danger'),
                      )}
                    >
                      {prod.user.name}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
