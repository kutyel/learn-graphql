import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import Page from '../components/Page'
import withData from '../lib/withData'

export default withData(
  class extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
          // this exposes the query to the user
          query: ctx.query,
        },
      }
    }
    render() {
      const { Component, apollo, pageProps } = this.props
      return (
        <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
        </Container>
      )
    }
  }
)
