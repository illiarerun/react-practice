import React, { useState } from 'react';

import './App.scss';

import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    findCategory => findCategory.id === product.categoryId,
  );
  const user = usersFromServer.find(
    findUser => category.ownerId === findUser.id,
  );

  return {
    ...product,
    category,
    user,
  };
});

const getReorderedProducts = (
  selectedUser,
  searchInput,
  selectedCategories,
) => {
  const lowerCasedSearchInput = searchInput.trim().toLowerCase();
  let searchProducts = products.filter(
    product => product.name.toLowerCase().includes(lowerCasedSearchInput),
  );

  if (selectedCategories.length > 0) {
    searchProducts = searchProducts.filter(product => (
      selectedCategories.some(
        category => category.title === product.category.title,
      )
    ));
  }

  return selectedUser !== 'all'
    ? searchProducts.filter(
      product => product.user.id === selectedUser.id,
    )
    : searchProducts;
};

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState([]);

  const handleSelectedUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const handleDeleteButton = () => {
    setSearchInput('');
  };

  const handleFiltersReset = () => {
    setSelectedUser('all');
    setSearchInput('');
    setSelectedCategories([]);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat.id !== category.id);
      }

      return [
        ...prev,
        category,
      ];
    });
  };

  const handleCategoriesReset = () => {
    setSelectedCategories([]);
  };

  const reorderedProducts = getReorderedProducts(
    selectedUser,
    searchInput,
    selectedCategories,
  );

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
                onClick={() => handleSelectedUserChange('all')}
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
                  onClick={() => handleSelectedUserChange(user)}
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
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchInput && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={handleDeleteButton}
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
                  'button',
                  'is-success',
                  'mr-6',
                  {
                    'is-outlined': selectedCategories.length !== 0,
                  },
                )}
                onClick={handleCategoriesReset}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  href="#/"
                  onClick={() => handleCategorySelect(category)}
                  className={classNames(
                    'button',
                    'mr-2',
                    'my-1',
                    {
                      'is-info': selectedCategories.includes(category),
                    },
                  )}
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
                onClick={handleFiltersReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {reorderedProducts.length === 0
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
                  {reorderedProducts.map((product) => {
                    const {
                      name,
                      id,
                      category,
                      user,
                    } = product;
                    const isMale = user.sex === 'm';
                    const isFemale = user.sex === 'f';

                    return (
                      <tr key={id} data-cy="Product">
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
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
            )
          }
        </div>
      </div>
    </div>
  );
};
