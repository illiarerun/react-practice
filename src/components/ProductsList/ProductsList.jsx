import React from 'react';

export const ProductsList = ({ productsList }) => (
  productsList.map(({
    id, name, user, category,
  }) => (
    <tr data-cy="Product" key={id}>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">
        {`${category.icon} - ${category.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className="has-text-link"
      >
        {user.name}
      </td>
    </tr>
  ))
);
