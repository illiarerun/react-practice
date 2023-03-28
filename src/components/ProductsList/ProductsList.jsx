import React from 'react';
import classNames from 'classnames';

export const ProductsList = ({ products }) => (
  <tbody>
    {products.map((product) => {
      const {
        id,
        name,
        icon,
        title,
        user,
      } = product;

      return (
        <tr data-cy="Product" key={id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {id}
          </td>

          <td data-cy="ProductName">{name}</td>
          <td data-cy="ProductCategory">{`${icon} - ${title}`}</td>

          <td
            data-cy="ProductUser"
            className={classNames({
              'has-text-link': user.sex === 'm',
              'has-text-danger': user.sex === 'f',
            })}
          >
            {user}
          </td>
        </tr>
      );
    })}
  </tbody>
);
