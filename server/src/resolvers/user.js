const userResolver = {
  Query: {
    users: (parent, args, { db }) => object.value(db.users),
    user: (parent, { id }, { db }) => db.users[id]
  }
}

export default userResolver;