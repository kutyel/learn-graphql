import Link from 'next/link'
import styled from 'styled-components'

import Nav from './Nav'

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  transform: skew(-7deg);
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const Bar = styled.header`
  border-bottom: 10px solid ${({ theme }) => theme.black};
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: stretch;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
}
`

const SubBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
`

export default () => (
  <header>
    <Bar>
      <Logo>
        <Link href="/">
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </Bar>
    <SubBar>
      <p>Search</p>
    </SubBar>
    <div>Cart</div>
  </header>
)
