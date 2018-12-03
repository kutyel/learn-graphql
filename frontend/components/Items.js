import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Item from './Item'

const Center = styled.div`
  text-align: center;
`

const ItemList = styled.div`
  display: grid;
  grid-gap: 60px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  max-width: ${({ theme }) => theme.maxWidth};
`

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

export default () => (
  <Center>
    <Query query={ALL_ITEMS_QUERY}>
      {({ data, error, loading }) =>
        loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>{error.message}</span>
        ) : (
          <ItemList>
            {data.items.map(item => (
              <Item key={item.id} {...item} />
            ))}
          </ItemList>
        )
      }
    </Query>
  </Center>
)
