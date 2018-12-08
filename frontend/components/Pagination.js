import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Query } from 'react-apollo'

import { perPage } from '../config'
import { PaginationStyles } from './styles'
import { PAGINATION_QUERY } from '../graphql/queries'

const getCount = ({ itemsConnection }) =>
  itemsConnection && itemsConnection.aggregate && itemsConnection.aggregate.count

export default ({ page }) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, error, loading }, count = getCount(data), pages = Math.ceil(count / perPage)) =>
      loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits | Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: '/items',
              query: {
                page: page - 1,
              },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ← Prev
            </a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: '/items',
              query: {
                page: page + 1,
              },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              Next →
            </a>
          </Link>
        </PaginationStyles>
      )
    }
  </Query>
)
