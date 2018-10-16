import styled, { ThemeProvider } from 'styled-components'

import Meta from './Meta'
import Header from './Header'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

const Page = styled.div`
  background: white;
  color: ${({ theme }) => theme.color};
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 3rem;
`

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Page>
      <Meta />
      <Header />
      <Inner>{children}</Inner>
    </Page>
  </ThemeProvider>
)
