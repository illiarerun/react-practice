import React from 'react';

export const CategoriesList = ({ categories }) => (
  categories.map(({ title, id }) => (
    <a
      key={id}
      data-cy="Category"
      className="button mr-2 my-1 is-info"
      href="#/"
    >
      {title}
    </a>
  ))
);
