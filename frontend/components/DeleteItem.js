import React from 'react'
import { Mutation } from 'react-apollo'

import { DELETE_ITEM_MUTATION } from '../graphql/mutations'
import { ALL_ITEMS_QUERY as query } from '../graphql/queries'

const update = (cache, payload) => {
  const { items } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: {
      items: items.filter(({ id }) => id !== payload.data.deleteItem.id),
    },
  })
}

export default ({ id }) => (
  <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={update}>
    {(deleteItem /*, { error }*/) => (
      <button onClick={() => confirm('Are you sure?') && deleteItem()}>Delete Item</button>
    )}
  </Mutation>
)
