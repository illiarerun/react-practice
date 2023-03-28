import React, { useEffect, useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './components/Table';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    catFrServ => catFrServ.id === product.categoryId,
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
  const [category, setCategory] = useState([]);

  useEffect(() => {
    handleUserChange();
    handleSearchChange();
    handleCategory();
  }, [searchQuery, selectedUser, category]);

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

  const handleCategory = () => {
    if (category.length) {
      setVisibleProducts(prevVisProd => prevVisProd.filter(
        prod => category.includes(prod.categoryId),
      ));
    }
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

              {usersFromServer.map(userFrServ => (
                <a
                  key={userFrServ.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={classNames({
                    'is-active': selectedUser === userFrServ.name,
                  })}
                  onClick={() => {
                    setSelectedUser(userFrServ.name);
                  }}
                >
                  {userFrServ.name}
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
                className={classNames(
                  'button',
                  'is-success',
                  'mr-6',
                  { 'is-outlined': !category.length },
                )}
                onClick={() => setCategory([])}
              >
                All
              </a>

              {categoriesFromServer.map(currCategory => (
                <a
                  data-cy="Category"
                  className={classNames(
                    'button',
                    'mr-2',
                    'my-1',
                    { 'is-info': category.includes(currCategory.id) },
                  )}
                  href="#/"
                  key={currCategory.id}
                  onClick={() => setCategory(
                    prevCategory => [...prevCategory, currCategory.id],
                  )}
                >
                  {`${currCategory.title}`}
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
