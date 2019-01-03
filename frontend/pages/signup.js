import styled from 'styled-components'

import Signup from '../components/Signup'

const Columns = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export default () => (
  <Columns>
    <Signup />
    <Signup />
    <Signup />
  </Columns>
)
