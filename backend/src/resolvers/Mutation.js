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
}

module.exports = Mutations
