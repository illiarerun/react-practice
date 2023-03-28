/* eslint-disable jsx-a11y/accessible-emoji */
import classNames from 'classnames';
import React from 'react';

/* eslint-disable arrow-body-style */
export const Table = ({ products }) => {
  return (
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
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
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
              {products.map((product) => {
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
        )
        }
    </div>
  );
};
