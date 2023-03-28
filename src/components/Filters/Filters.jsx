import classNames from 'classnames';
import React from 'react';
import usersFromServer from '../../api/users';
import categoriesFromServer from '../../api/categories';

export const Filters = ({
  selectedUser,
  setUser,
  query,
  setQuery,
  categories,
  setCategories,
}) => {
  const resetAll = () => {
    setUser('all');
    setQuery('');
    setCategories([]);
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            className={classNames({
              'is-active': selectedUser === 'all',
            })}
            data-cy="FilterAllUsers"
            href="#/"
            onClick={() => setUser('all')}
          >
            All
          </a>

          {usersFromServer.map(user => (
            <a
              className={classNames({
                'is-active': selectedUser === user,
              })}
              data-cy="FilterUser"
              href="#/"
              onClick={() => setUser(user)}
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
              onChange={event => setQuery(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              {query && (
                <button
                  data-cy="ClearButton"
                  type="button"
                  className="delete"
                  onClick={() => setQuery('')}
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
              'button is-success mr-6',
              { 'is-outlined': categories.length !== 0 },
            )}
            onClick={() => setCategories([])}
          >
            All
          </a>

          {categoriesFromServer.map(category => (
            <a
              data-cy="Category"
              className={classNames(
                'button mr-2 my-1',
                { 'is-info': categories.includes(category) },
              )}
              href="#/"
              onClick={() => {
                if (categories.includes(category)) {
                  setCategories(
                    categories.filter(sCategory => category !== sCategory),
                  );
                } else {
                  setCategories([...categories, category]);
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
            onClick={resetAll}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
