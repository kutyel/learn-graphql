const Mutations = {
  createItem(_, args, { db }, info) {
    // TODO: check if logged in
    return db.mutation.createItem(
      {
        data: { ...args },
      },
      info
    )
  },
  updateItem(_, { id, ...args }, { db }, info) {
    return db.mutation.updateItem(
      {
        data: { ...args },
        where: { id },
      },
      info
    )
  },
  deleteItem(_, { id }, { db }, info) {
    const where = { id }
    // const item = await db.query.item({ where }, `{ id title }`)
    // TODO: check permissions
    return db.mutation.deleteItem({ where }, info)
  },
}

module.exports = Mutations
