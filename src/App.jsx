import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedCategories([]);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setSelectedUser(null);
  };

  const handleSortColumnClick = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'up' ? 'down' : 'up');
    } else {
      setSortColumn(column);
      setSortOrder('up');
    }
  };

  const clearFilters = () => {
    setFilter('');
    setSelectedUser(null);
    setSelectedCategories([]);
    setSortColumn(null);
    setSortOrder('default');
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...productsFromServer];

    if (selectedUser !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.ownerId === selectedUser.id
      );
    }

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(
          categoriesFromServer.find((category) => category.id === product.categoryId)
        )
      );
    }

    if (filter !== '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );
    }

    if (sortColumn !== null) {
      filteredProducts.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortOrder === 'up' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'up' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredProducts;
  };

  return (
    <div className="section">
  <div className="container">
  <div className="columns">
    <div className="column">
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <span className="icon is-small is-right" onClick={clearSearch}>
              <i className="fas fa-times"></i>
            </span>
          )}
          <div className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field">
        <label className="label">Owner</label>
        <div className="buttons">
          <button
            className={`button${selectedOwner === "All" ? " is-active" : ""}`}
            onClick={() => handleOwnerFilter("All")}
          >
            All
          </button>
          {owners.map((owner) => (
            <button
              key={owner.id}
              className={`button${
                selectedOwner === owner.id ? " is-active" : ""
              } ${
                owner.sex === "m" ? "has-text-link" : "has-text-danger"
              }`}
              onClick={() => handleOwnerFilter(owner.id)}
            >
              {owner.name}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field">
        <label className="label">Category</label>
        <div className="buttons">
          <button
            className={`button${
              selectedCategories.length === 0 ? " is-active" : ""
            }`}
            onClick={() => handleCategoryFilter("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`button${
                selectedCategories.includes(category.id)
                  ? " is-active is-info"
                  : " is-outlined"
              }`}
              onClick={() => handleCategoryFilter(category.id)}
            >
              <span className="icon">{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
  <table className="table is-fullwidth"></table>
    <thead>
      <tr>
        <th onClick={() => handleSort("id")}>
          ID {sortBy === "id" && sortDirectionIcon}
        </th>
        <th onClick={() => handleSort("name")}>
          Name {sortBy === "name" && sortDirectionIcon}
        </th>
        <th onClick={() => handleSort("category")}>
          Category {sortBy === "category" && sortDirectionIcon}
        </th>
        <th onClick={() => handleSort("owner")}>
          Owner {sortBy === "owner" && sortDirectionIcon}
        </th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.length === 0 && (
        <tr>
          <td colSpan="4" className="has-text-centered">
            No results
          </td>
        </tr>
      )}
      {filteredProducts.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{getCategoryIcon(product.categoryId)} {getCategoryTitle(product.categoryId)}</td>
          <td>{user.name}</td>
        </tr>
      )
  </tbody>
      </table>
    </div>

  );
};

