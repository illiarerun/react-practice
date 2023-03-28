import React from 'react';
import classNames from 'classnames';

export const ProductsTable = ({ products, sort, setSort }) => {
  const { field, order } = sort;

  const handleSortClick = (title) => {
    if (field === title && order === 'asc') {
      setSort({ ...sort, order: 'desc' });
    } else if (field === title && order === 'desc') {
      setSort({ field: '', order: 'asc' });
    } else {
      setSort({ field: title, order: 'asc' });
    }
  };

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['ID', 'Product', 'Category', 'User'].map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}

                <a
                  href="#/"
                  onClick={() => handleSortClick(title)}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={classNames(
                        'fas',
                        {
                          'fa-sort': field !== title,
                          'fa-sort-up': title === field && order === 'asc',
                          'fa-sort-down': title === field && order === 'desc',
                        },
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map((product) => {
          const { id, name, category: { icon, title }, user } = product;

          return (
            <tr data-cy="Product" key={id}>
              <td className="has-text-weight-bold" data-cy="ProductId">
                {id}
              </td>

              <td data-cy="ProductName">
                {name}
              </td>
              <td data-cy="ProductCategory">
                {`${icon} - ${title}`}
              </td>

              <td
                data-cy="ProductUser"
                className={classNames(
                  'has-text-link',
                  {
                    'has-text-link': user.sex === 'm',
                    'has-text-danger': user.sex === 'f',
                  },
                )}
              >
                {user.name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
