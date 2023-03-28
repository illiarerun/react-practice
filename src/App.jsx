import React, { useEffect, useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(({ id }) => (
    id === product.categoryId
  ));
  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [selectedUser, setSelectedUser] = useState(0);
  const [filterValue, setFilterValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortStyle, setSortStyle] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length !== 0) {
      result = result.filter(({ category: { title } }) => (
        selectedCategories.includes(title)
      ));
    }

    if (selectedUser !== 0) {
      result = result.filter(({ user: { id } }) => id === selectedUser);
    }

    if (filterValue !== '') {
      result = result.filter(({ name }) => {
        const lowercasedName = name.toLowerCase();
        const lowercasedFilterValue = filterValue.toLowerCase().trim();

        return lowercasedName.includes(lowercasedFilterValue);
      });
    }

    result.sort((prev, next) => {
      switch (sortStyle) {
        case 'id':
          return prev.id - next.id;

        case 'productName':
          return prev.name.localeCompare(next.name);

        case 'categoryTitle':
          return prev.category.title.localeCompare(next.category.title);

        case 'userName':
          return prev.user.name.localeCompare(next.user.name);

        default:
          return 0;
      }
    });

    if (isReversed) {
      result.reverse();
    }

    setVisibleProducts(result);
  }, [selectedUser, filterValue, selectedCategories, sortStyle, isReversed]);

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleClearButtonClick = () => {
    setFilterValue('');
  };

  const handleAllCategoriesSelect = () => {
    setSelectedCategories([]);
  };

  const handleResetAllFilters = () => {
    setFilterValue('');
    setSelectedUser(0);
    setSelectedCategories([]);
    setSortStyle('none');
    setIsReversed(false);
  };

  const handleSortClick = (title) => {
    if (sortStyle === title) {
      setIsReversed(prev => !prev);
    }

    setSortStyle(title);
  };

  const handleCategorySelect = (title) => {
    if (selectedCategories.includes(title)) {
      setSelectedCategories(prevSelectedCategories => (
        prevSelectedCategories.filter(category => category !== title)
      ));
    } else {
      setSelectedCategories(prevSelectedCategories => ([
        ...prevSelectedCategories,
        title,
      ]));
    }
  };

  const getSortClass = (title) => {
    if (title === sortStyle) {
      return isReversed
        ? 'fa-sort-up'
        : 'fa-sort-down';
    }

    return 'fa-sort';
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
                className={classNames({
                  'is-active': selectedUser === 0,
                })}
                onClick={() => {
                  setSelectedUser(0);
                }}
              >
                All
              </a>

              {usersFromServer.map(({ id, name }) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': selectedUser === id,
                  })}
                  onClick={() => {
                    setSelectedUser(id);
                  }}
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
                  value={filterValue}
                  onChange={handleFilter}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {filterValue && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={handleClearButtonClick}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedCategories.length !== 0,
                })}
                onClick={handleAllCategoriesSelect}
              >
                All
              </a>

              {categoriesFromServer.map(({ title }) => (
                <a
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': selectedCategories.includes(title),
                  })}
                  href="#/"
                  onClick={() => {
                    handleCategorySelect(title);
                  }}
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
                onClick={handleResetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length
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

                        <a
                          href="#/"
                          onClick={() => {
                            handleSortClick('id');
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames(
                                'fas',
                                getSortClass('id'),
                              )}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a
                          href="#/"
                          onClick={() => {
                            handleSortClick('productName');
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames(
                                'fas',
                                getSortClass('productName'),
                              )}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a
                          href="#/"
                          onClick={() => {
                            handleSortClick('categoryTitle');
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames(
                                'fas',
                                getSortClass('categoryTitle'),
                              )}
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a
                          href="#/"
                          onClick={() => {
                            handleSortClick('userName');
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames(
                                'fas',
                                getSortClass('userName'),
                              )}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleProducts.map(({ id, name, category, user }) => (
                    <tr data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {id}
                      </td>

                      <td data-cy="ProductName">{name}</td>
                      <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'}
                      >
                        {user.name}
                      </td>
                    </tr>
                  ))}
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
