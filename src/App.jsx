import React, { useState, useEffect } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const allProducts = productsFromServer.map((product) => {
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
  const [searchValue, setSearchValue] = useState('');
  // const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [user, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState({
    column: null,
    direction: null,
  });

  useEffect(() => {
    setProducts(productsFromServer);
    setCategories(categoriesFromServer);
    setUsers(usersFromServer);
  }, []);

  /* const sortedProducts = () => {
    if (sortBy.column && sortBy.direction) {
      return products.sort((a, b) => {
        const aValue = a[sortBy.column];
        const bValue = b[sortBy.column];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortBy.direction === 'asc'
            ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortBy.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
      });
    } else {
      return products;
    }
  };
*/
  const filteredProducts = sortedProducts()
    .filter(product => selectedCategories.length === 0
      || selectedCategories.includes(product.categoryId))
    .filter(product => !selectedUsers || product.ownerId === selectedUsers.id)
    .filter(product => product.name
      .toLowerCase().includes(searchValue.toLowerCase()));

  const handleUserSelect = (user) => {
    setSelectedUsers(user === selectedUsers ? null : user);
  };

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleResetFilters = () => {
    setSelectedUsers(null);
    setSelectedCategories([]);
    setSearchValue('');
    setSortBy({ column: null, direction: null });
  };

  const handleSortBy = (column) => {
    if (sortBy.column === column) {
      setSortBy({
        ...sortBy,
        direction: sortBy.direction === 'asc'
          ? 'desc' : sortBy.direction === 'desc' ? null : 'asc',
      });
    } else {
      setSortBy({ column, direction: 'asc' });
    }
  };

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
                onClick={() => handleUserSelect(null)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  className={`${selectedUsers && selectedUsers.id === user.id ? 'is-active' : ''} ${user.gender === 'male' ? 'has-text-link' : 'has-text-danger'}`}
                  onClick={() => handleUserSelect(user)}
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
              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  1
                </td>

                <td data-cy="ProductName">Milk</td>
                <td data-cy="ProductCategory">🍺 - Drinks</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Max
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  2
                </td>

                <td data-cy="ProductName">Bread</td>
                <td data-cy="ProductCategory">🍞 - Grocery</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-danger"
                >
                  Anna
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  3
                </td>

                <td data-cy="ProductName">iPhone</td>
                <td data-cy="ProductCategory">💻 - Electronics</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Roma
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
