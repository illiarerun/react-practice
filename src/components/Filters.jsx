import classNames from 'classnames';
import React, { useState } from 'react';

const CategoryButton = ({
  title,
  onCategoryClick,
  isActive,
}) => (
  <button
    type="button"
    data-cy="Category"
    className={classNames(
      'button mr-2 my-1',
      {
        'is-info': isActive,
      },
    )}
    aria-label={`${title} filter button`}
    onClick={onCategoryClick}
  >
    {title}
  </button>
);

export const Filters = ({
  users,
  categories,
  selectedCategories,
  onUserFilterChange,
  onCategoryFilterChange,
  onQueryFilterChange,
}) => {
  const [query, setQuery] = useState('');
  const [currentUserIdFilter, setCurrentUserIdFilter] = useState(0);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;

    onQueryFilterChange(newQuery);
    setQuery(newQuery);
  };

  const handleCategoryFilterChange = (id) => {
    if (selectedCategories.includes(id)) {
      onCategoryFilterChange(prev => (
        prev.filter(categoryId => categoryId !== id)
      ));
    } else {
      onCategoryFilterChange(prev => [...prev, id]);
    }
  };

  const handleUserFilterChange = (id) => {
    onUserFilterChange(id);

    if (id === currentUserIdFilter) {
      setCurrentUserIdFilter(0);
    } else {
      setCurrentUserIdFilter(id);
    }
  };

  const handleInputClear = () => {
    onQueryFilterChange('');
    setQuery('');
  };

  const handleResetFilters = () => {
    onCategoryFilterChange([]);
    setCurrentUserIdFilter(0);
    setQuery('');
    onUserFilterChange(0);
    onCategoryFilterChange(0);
    onQueryFilterChange('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={classNames({
            'is-active': currentUserIdFilter === 0,
          })}
          onClick={() => handleUserFilterChange(0)}
        >
          All
        </a>

        {users.map(user => (
          <a
            data-cy="FilterUser"
            href="#/"
            key={user.id}
            className={classNames({
              'is-active': currentUserIdFilter === user.id,
            })}
            onClick={() => handleUserFilterChange(user.id)}
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
            onChange={handleQueryChange}
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
                aria-label="clear-button"
                onClick={handleInputClear}
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
            {
              'is-outlined': selectedCategories.length,
            },
          )}
          onClick={() => onCategoryFilterChange([])}
        >
          All
        </a>

        {categories.map(category => (
          <CategoryButton
            title={category.title}
            key={category.title}
            isActive={selectedCategories.includes(category.id)}
            onCategoryClick={() => handleCategoryFilterChange(category.id)}
          />
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
