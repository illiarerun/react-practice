/* eslint-disable arrow-body-style */
import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import { Filters } from './components/Filters';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Table } from './components/Table';

const rawProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => product.categoryId === cat.id);
  const user = usersFromServer
    .find(us => us.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const sortProducts = (products, sortBy, sortOrder) => {
  const newProducts = [...products];

  switch (sortBy) {
    case 'id':
      newProducts.sort((first, second) => first.id - second.id);
      break;
    case 'product':
      newProducts.sort((first, second) => (
        first.name.localeCompare(second.name)
      ));
      break;
    case 'category':
      newProducts.sort((first, second) => (
        first.category.title.localeCompare(second.category.title)
      ));
      break;
    case 'user':
      newProducts.sort((first, second) => (
        first.user.name.localeCompare(second.user.name)
      ));
      break;
    default:
      break;
  }

  if (sortOrder) {
    newProducts.reverse();
  }

  return newProducts;
};

export const App = () => {
  const [userId, selectUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [desc, setSortDesc] = useState(false);

  const handleCategorySelecting = useCallback((id) => {
    if (!id) {
      setSelectedCategoriesId([]);

      return;
    }

    setSelectedCategoriesId(selectedCategoriesId.includes(id)
      ? selectedCategoriesId.filter(curId => curId !== id)
      : [...selectedCategoriesId, id]);
  });

  const handleQueryChange = useCallback((event) => {
    setQuery(event.target.value);
  });

  const handleAllFilterReseting = useCallback(() => {
    setQuery('');
    selectUserId(0);
    setSelectedCategoriesId([]);
  }, []);

  const handleSortChange = (category) => {
    if (sortBy !== category) {
      setSortBy(category);
      setSortDesc(false);
    }

    if (sortBy === category && !desc) {
      setSortDesc(true);
    }

    if (sortBy === category && desc) {
      setSortBy('');
      setSortDesc(false);
    }
  };

  const filterCatProducts = useMemo(() => {
    return userId
      ? rawProducts.filter(product => product.user.id === userId)
      : rawProducts;
  }, [userId, rawProducts]);

  const filterQueryProducts = useMemo(() => {
    return filterCatProducts.filter(product => (
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  }, [filterCatProducts, query]);

  const filterCategories = useMemo(() => {
    if (selectedCategoriesId.length !== 0) {
      return filterQueryProducts.filter(product => (
        selectedCategoriesId.includes(product.categoryId)
      ));
    }

    return filterQueryProducts;
  }, [filterQueryProducts, selectedCategoriesId]);

  const sorted = useMemo(() => (
    sortProducts(filterCategories, sortBy, desc)
  ), [filterCategories, sortBy, desc]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            userId={userId}
            onUserSelect={selectUserId}
            query={query}
            onChangeQuery={handleQueryChange}
            users={usersFromServer}
            categories={categoriesFromServer}
            onResetFilter={handleAllFilterReseting}
            selectedCategories={selectedCategoriesId}
            onSelectCategory={handleCategorySelecting}
          />
        </div>

        <Table
          products={sorted}
          onSortChange={handleSortChange}
          sortBy={sortBy}
          sortDesc={desc}
        />
      </div>
    </div>
  );
};
