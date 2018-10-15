import Header from './Header'
import Meta from './Meta'

export default ({ children }) => (
  <div>
    <Meta />
    <Header />
    {children}
  </div>
)
