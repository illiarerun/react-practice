import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const productCopy = { ...product };
  const currentCategory = categoriesFromServer.find(category => (
    category.id === product.categoryId
  ));

  const currentUser = usersFromServer.find(user => (
    user.id === currentCategory.ownerId
  ));

  productCopy.category = currentCategory;
  productCopy.user = currentUser;

  return productCopy;
});

export const App = () => (
  <div className="section">
    <div className="container">
      <h1 className="title">Product Categories</h1>

      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <p className="panel-tabs has-text-weight-bold">
            <a data-cy="FilterAllUsers" href="#/">
              All
            </a>

            {usersFromServer.map(({ name }) => (
              <a data-cy="FilterUser" href="#/">
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
            <a
              href="#/"
              data-cy="AllCategories"
              className="button is-success mr-6 is-outlined"
            >
              All
            </a>

            {categoriesFromServer.map(({ title }) => (
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                {title}
              </a>
            ))}
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
            {products.map(product => (
              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  {product.id}
                </td>

                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {`${product.category.icon} - ${product.category.title}`}
                </td>

                <td
                  data-cy="ProductUser"
                  className={product.user.sex === 'm'
                    ? 'has-text-link'
                    : 'has-text-danger'
                  }
                >
                  {product.user.name}
                </td>
              </tr>
            ))}

            {/* <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                1
              </td>

              <td data-cy="ProductName">Milk</td>
              <td data-cy="ProductCategory">🍺 - Drinks</td>

              <td data-cy="ProductUser" className="has-text-link">
                Max
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                2
              </td>

              <td data-cy="ProductName">Bread</td>
              <td data-cy="ProductCategory">🍞 - Grocery</td>

              <td data-cy="ProductUser" className="has-text-danger">
                Anna
              </td>
            </tr>

            <tr data-cy="Product">
              <td className="has-text-weight-bold" data-cy="ProductId">
                3
              </td>

              <td data-cy="ProductName">iPhone</td>
              <td data-cy="ProductCategory">💻 - Electronics</td>

              <td data-cy="ProductUser" className="has-text-link">
                Roma
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
