import React from 'react';
import classNames from 'classnames';

export const Filter = ({
  users,
  categories,
  userId,
  query,
  changeQuery,
  resetFilter,
  setUserId,
}) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={classNames(
          { 'is-active': userId === 0 },
        )}
        onClick={() => setUserId(0)}
      >
        All
      </a>

      {users.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user.id}
          className={classNames(
            { 'is-active': user.id === userId },
          )}
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
          onChange={changeQuery}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          { query && (
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={resetFilter}
          />
          )}
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
        onClick={resetFilter}
      >
        Reset all filters
      </a>
    </div>
  </nav>
);
