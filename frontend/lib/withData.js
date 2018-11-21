import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

import { endpoint } from '../config'

export default withApollo(
  ({ headers }) =>
    new ApolloClient({
      uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
      request: ({ setContext }) =>
        setContext({
          fetchOptions: {
            credentials: 'include',
          },
          headers,
        }),
    })
)
