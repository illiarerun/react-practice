import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import columnsFromServer from './api/columns';

function getCategoryById(categoryId) {
  const finded = categoriesFromServer.find(category => (
    category.id === categoryId
  ));

  return finded || null;
}

function getCUserById(ownerId) {
  const finded = usersFromServer.find(user => (
    user.id === ownerId
  ));

  return finded || null;
}

const products = productsFromServer.map((product) => {
  const category = getCategoryById(product.categoryId);
  const user = getCUserById(category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

// function getSortedProducts(products, category) {
//   const sorted = products.sort((p1, p2) => (
//     p1[category].toLocaleCompare(p2[category])
//   ));
// }

export const App = () => {
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState(0);
  const [selectedCategories, setSelectedCategory] = useState([]);
  const [columnName, setColumnName] = useState('ID');
  const [orderingState, setOrderingState] = useState(0);
  // const [isReversed, setIsReversed] = useState(false);

  let visibleCProducts = [...products];

  const handleInput = (event) => {
    const { value } = event.target;

    setQuery(value);
  };

  if (query) {
    visibleCProducts = visibleCProducts.filter((product) => {
      const loverCaseProduct = product.name.toLowerCase();
      const loverCasequery = query.toLowerCase();

      return loverCaseProduct.includes(loverCasequery);
    });
  }

  if (userId) {
    visibleCProducts = visibleCProducts.filter(product => (
      product.user.id === userId
    ));
  }

  if (selectedCategories.length > 0) {
    visibleCProducts = visibleCProducts.filter(product => (
      selectedCategories.includes(product.categoryId)
    ));
  }

  if (columnName !== 'ID') {
    visibleCProducts = visibleCProducts.sort((p1, p2) => {
      switch (columnName) {
        case 'Product':
          return p1.name.localeCompare(p2.name);
        case 'Category':
          return p1.category.title.localeCompare(p2.category.title);
        case 'User':
          return p1.user.name.localeCompare(p2.user.name);
        default:
          return 'ID';
      }
    });
  }

  if (orderingState === 2) {
    visibleCProducts = visibleCProducts.reverse();
  }

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
                className={classNames(
                  { 'is-active': !userId },
                )}
                href="#/"
                onClick={() => setUserId(0)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  className={classNames(
                    { 'is-active': userId === user.id },
                  )}
                  href="#/"
                  onClick={() => setUserId(user.id)}
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
                  value={query}
                  onChange={handleInput}
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
                className={classNames(
                  'button is-success mr-6',
                  { 'is-outlined': selectedCategories.length > 0 },
                )}
                onClick={() => setSelectedCategory([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={classNames(
                    'button mr-2 my-1',
                    { 'is-info': selectedCategories.includes(category.id) },
                  )}
                  href="#/"
                  onClick={() => {
                    if (selectedCategories.includes(category.id)) {
                      setSelectedCategory(prevState => (
                        prevState.filter(id => id !== category.id)
                      ));
                    } else {
                      setSelectedCategory(prevCategories => ([
                        ...prevCategories,
                        category.id,
                      ]));
                    }
                  }}
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
                onClick={() => {
                  setQuery('');
                  setUserId(0);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleCProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {columnsFromServer.map(column => (
                      <th key={column.id}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {column.title}

                          <a
                            href="#/"
                            onClick={() => {
                              setColumnName((prevState) => {
                                if (prevState !== column.title) {
                                  setOrderingState(1);
                                }

                                return column.title;
                              });

                              setOrderingState((prevState) => {
                                let newState = prevState + 1;

                                if (newState === 3) {
                                  newState = 0;
                                }

                                return newState;
                              });
                            }}
                          >
                            <span className="icon">
                              <i
                                data-cy="SortIcon"
                                className={classNames(
                                  'fas',
                                  {
                                    'fa-sort': orderingState === 0
                                      || column.title !== columnName,
                                    'fa-sort-up': orderingState === 1
                                      && column.title === columnName,
                                    'fa-sort-down': orderingState === 2
                                      && column.title === columnName,
                                  },
                                )}
                              />
                            </span>
                          </a>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {visibleCProducts.map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>
                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {`${product.category.icon} - ${product.category.title}`}
                      </td>
                      <td
                        data-cy="ProductUser"
                        className={classNames(
                          { 'has-text-danger': product.user.sex === 'f' },
                          { 'has-text-link': product.user.sex === 'm' },
                        )}
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
