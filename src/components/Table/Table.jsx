/* eslint-disable jsx-a11y/accessible-emoji */
import classNames from 'classnames';
import React from 'react';
import { Product } from '../Product';

const categories = ['ID', 'Product', 'Category', 'User'];

export const Table = ({
  products,
  onSortChange,
  sortBy,
  sortDesc,
}) => (
  <div className="box table-container">
    {products.length === 0
      ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {categories.map((category) => {
                const small = category.toLowerCase();

                return (
                  <th key={category}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {category}

                      <a
                        href="#/"
                        onClick={() => onSortChange(small)}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={classNames(
                              'fas',
                              {
                                'fa-sort-up': sortBy === small && !sortDesc,
                                'fa-sort-down': sortBy === small && sortDesc,
                                'fa-sort': sortBy !== small,
                              },
                            )}
                          />
                        </span>
                      </a>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      )
        }
  </div>
);
