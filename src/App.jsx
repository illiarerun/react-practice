import React, {
  useState,
  useEffect,
} from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [productsToShow, setProductsToShow] = useState(productsFromServer);
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // const userId = usersFromServer
    //   .find(({ name }) => name === selectedUser).id;

    // const categories = categoriesFromServer
    //   .filter(({ ownerId }) => ownerId === userId);

    const productsByUser = [...productsToShow];

  //   // const productsByUser = selectedUser === 'All'
  //   //   ? products
  //   //   : products.filter(
  //   //     ({ categoryId }) => categories.find(({ id }) => id === categoryId),
  //   //   );

    setProductsToShow(productsByUser);
  }, [
    selectedUser,
    selectedCategory,
  ]);

  // const products = productsFromServer.map((product) => {
  //   // const productsCopy = [...products];
  //   const category = categoriesFromServer.find(selectedCategory); // find by product.categoryId
  //   const user = findByOwnerId(productsCopy, selectedUser); // find by category.ownerId

  //   return null;
  // });

  const handleUserPick = (event) => {
    const userName = event.target.innerText;

    setSelectedUser(userName);
  };

  const handleCategoryPick = (event) => {
    const categoryTitle = event.target.innerText;

    setSelectedCategory(categoryTitle);
  };

  const handleResetAll = () => {
    setSelectedUser('All');
    setSelectedCategory('All');
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
                onClick={handleUserPick}
                className={classNames({
                  'is-active': selectedUser === 'All',
                })}
              >
                All
              </a>

              {usersFromServer.map(({ name }) => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={handleUserPick}
                  className={classNames({
                    'is-active': selectedUser === `${name}`,
                  })}
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
                onClick={handleCategoryPick}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={classNames('button', 'mr-2', 'my-1',
                    { 'is-info': selectedCategory === `${category.title}` })}
                  href="#/"
                  onClick={handleCategoryPick}
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
                onClick={handleResetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!productsToShow.length
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
                  {productsToShow.map((product) => (
                    <tr data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{product.category}</td>

                      <td
                        data-cy="ProductUser"
                        className="has-text-link"
                      >
                        Max
                      </td>
                    </tr>
                  ))}

                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      2
                    </td>

                    <td data-cy="ProductName">Bread</td>
                    {/* <td data-cy="ProductCategory">🍞 - Grocery</td> */}

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
                    {/* <td data-cy="ProductCategory">💻 - Electronics</td> */}

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      Roma
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
