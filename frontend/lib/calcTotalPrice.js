export default cart =>
  cart.reduce((tally, cart) => (!cart.item ? tally : tally + cart.quantity * cart.item.price), 0)
