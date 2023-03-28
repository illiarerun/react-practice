import React from 'react';
import { Product } from './Product';

export const ProductsTable = ({ products }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User
            <a href="#/">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      {products.map(product => (
        <Product product={product} key={product.id} />
      ))}
    </tbody>
  </table>
);
