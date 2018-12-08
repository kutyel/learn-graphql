import React from 'react'
import Head from 'next/head'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import ErrorMessage from './ErrorMessage'
import { SINGLE_ITEM_QUERY } from '../graphql/queries'

const Item = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-style: 2rem;
  }
`

export default ({ id }) => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
    {({ data, error, loading }) =>
      loading ? (
        <span>Loading...</span>
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <Item>
          <Head>
            <title>Sick Fits | {data.item.title}</title>
          </Head>
          <img src={data.item.largeImage} alt={data.item.title} />
          <div className="details">
            <h2>Viewing {data.item.title}</h2>
            <p>{data.item.description}</p>
          </div>
        </Item>
      )
    }
  </Query>
)
