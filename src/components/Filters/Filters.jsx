/* eslint-disable arrow-body-style */
import React from 'react';
import classNames from 'classnames';

export const Filters = ({
  users,
  categories,
  userId,
  onUserSelect,
  query,
  onChangeQuery,
  onResetFilter,
  selectedCategories,
  onSelectCategory,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={classNames(
            { 'is-active': userId === 0 },
          )}
          onClick={() => onUserSelect(0)}
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
            onClick={() => onUserSelect(user.id)}
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
            onChange={onChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {query && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={onChangeQuery}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          // className="button is-success mr-6 is-outlined"
          className={classNames(
            'button is-success mr-6',
            { 'is-outlined': selectedCategories.length !== 0 },
          )}
          onClick={() => onSelectCategory()}
        >
          All
        </a>

        {categories.map((category) => {
          const {
            id,
            title,
          } = category;

          return (
            <a
              data-cy="Category"
              className={classNames(
                'button mr-2 my-1',
                { 'is-info': selectedCategories.includes(id) },
              )}
              href="#/"
              key={id}
              onClick={() => onSelectCategory(id)}
            >
              {title}
            </a>
          );
        })}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={onResetFilter}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
