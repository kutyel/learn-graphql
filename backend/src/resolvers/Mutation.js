const toWhere = id => ({ where: { id } })

const Mutations = {
  createItem: (_, data, { db }, info) =>
    // TODO: check if logged in
    db.mutation.createItem({ data }, info),
  updateItem: (_, { id, ...data }, { db }, info) =>
    db.mutation.updateItem({ data, ...toWhere(id) }, info),
  deleteItem: (_, { id }, { db }, info) =>
    // const item = await db.query.item({ where }, `{ id title }`)
    // TODO: check permissions
    db.mutation.deleteItem(toWhere(id), info),
}

module.exports = Mutations
