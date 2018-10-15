import App, { Container } from 'next/app'

import Page from '../components/Page'

export default class extends App {
  render() {
    const { Component } = this.props
    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
}
