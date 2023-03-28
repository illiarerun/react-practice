import React from 'react';
import classNames from 'classnames';

export const Product = ({ product }) => {
  const {
    id,
    name,
    category,
    user,
  } = product;

  const { icon, title } = category;

  return (
    <tr data-cy="Product" key={id}>
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>

      <td
        data-cy="ProductUser"
        className={classNames(
          'has-text-link',
          { 'has-text-danger': user.sex === 'f' },
        )}
      >
        {user.name}
      </td>
    </tr>
  );
};
