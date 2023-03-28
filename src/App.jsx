import React, { useEffect, useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './components/Table';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );
  const user = usersFromServer.find(
    userFromServ => userFromServ.id === category.ownerId,
  );

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [selectedUser, setSelectedUser] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleUserChange();
    handleSearchChange();
  }, [searchQuery, selectedUser]);

  const handleUserChange = () => {
    if (selectedUser !== 'All') {
      setVisibleProducts(products.filter(
        prod => prod.user.name === selectedUser,
      ));
    } else {
      setVisibleProducts(products);
    }
  };

  const handleSearchChange = () => {
    setVisibleProducts(prevVisProd => prevVisProd.filter(
      prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ));
  };

  const handleResetAll = () => {
    setSelectedUser('All');
    setSearchQuery('');
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
                  'is-active': selectedUser === 'All',
                })}
                onClick={() => {
                  setSelectedUser('All');
                }}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({
                  'is-active': selectedUser === 'Roma',
                })}
                onClick={() => {
                  setSelectedUser('Roma');
                }}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({
                  'is-active': selectedUser === 'Anna',
                })}
                onClick={() => {
                  setSelectedUser('Anna');
                }}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={classNames({
                  'is-active': selectedUser === 'Max',
                })}
                onClick={() => {
                  setSelectedUser('Max');
                }}
              >
                Max
              </a>

            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
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
                onClick={handleResetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length
            ? <Table products={visibleProducts} />
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
