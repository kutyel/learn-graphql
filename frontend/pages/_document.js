import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    return { ...page, styleTags: sheet.getStyleElement() }
  }

  render = () => (
    <html>
      <Head>{this.props.styleTags}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  )
}
