import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import Item from './Item'
import { perPage } from '../config'
import Pagination from './Pagination'
import { ALL_ITEMS_QUERY } from '../graphql/queries'

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

export default ({ page }) => (
  <Center>
    <Pagination page={page} />
    <Query query={ALL_ITEMS_QUERY} variables={{ skip: page * perPage - perPage }}>
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
    <Pagination page={page} />
  </Center>
)
