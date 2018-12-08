import Items from '../components/Items'

export default ({ query: { page = 1 } }) => (
  <div>
    <Items page={+page} />
  </div>
)
