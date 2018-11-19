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
}

module.exports = Mutations
