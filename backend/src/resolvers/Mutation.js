const jwt = require('jsonwebtoken')
const encrypt = require('bcryptjs')

const toWhere = id => ({ where: { id } })

const Mutations = {
  createItem: (_, data, { db }, info) =>
    // TODO: check if logged in
    db.mutation.createItem({ data }, info),
  updateItem: (_, { id, ...data }, { db }, info) =>
    db.mutation.updateItem({ data, ...toWhere(id) }, info),
  deleteItem: (_, { id }, { db }, info) =>
    // TODO: check permissions
    db.mutation.deleteItem(toWhere(id), info),
  signup: async (_, data, { db, response }, info) => {
    data.email = data.email.toLowerCase()
    const password = await encrypt.hash(data.password, 10)
    const user = await db.mutation.createUser(
      {
        data: {
          ...data,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    )
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    return user
  },
}

module.exports = Mutations
