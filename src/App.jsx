import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function findUser(id) {
  return usersFromServer.find(user => user.id === id);
}

function findCategorie(id) {
  return categoriesFromServer.find(category => category.ownerId === id);
}

export const newProducts = productsFromServer.map(product => ({
  ...product,
  user: findUser(categoriesFromServer.ownerId),
  category: findCategorie(product.id),
}));

export const App = () => {
  const [products, setProducts] = useState(newProducts);
  const [chosenPerson, setChosenPerson] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filtred = products.filter(product => {
      const { category } = product;
      const { title } = category;
      const lowerCasedTitle = title.toLowerCase();
      const lowerCasedQuery = query.toLowerCase().trim();

      return lowerCasedTitle.includes(lowerCasedQuery);
    });

    setProducts(filtred);
  }, [query]);

  // useEffect(() => {
  //   const filtred = products.filter(product => {
  //     return
  //   })
  // }, [chosenPerson]);

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

              {products.map(product => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={product.user.id}
                  value={chosenPerson}
                  onChange={event => setChosenPerson(event.target.value)}
                >
                  {product.user.name}
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
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
                )
                }
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

              {products.map(product => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {product.category.title}
                </a>
              ))
              }
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

            {products.map(product => (
              <tbody>
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {product.category.icon}
                    `-`
                    {product.category.title}
                  </td>

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
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
