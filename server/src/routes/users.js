import { readDB } from '../dbController.js'

const getUsers = () => readDB('users');

const userRoute = [
  {
    method: 'get',
    route: '/users',
    handler: (req, res) => {
      const users = getUsers()
      res.send(users)
    }
  },
  {
    method: 'post',
    route: '/users/:id',
    handler: ({ params: {id}}, res) => {
      try {
        const users = getUsers()
        const user = users[id]
        if(!user) throw Error('사용자가 없습니다.')
        res.send(users)
      } catch (err) {
        console.err("err", err);
      }
    }
  },
  {
    method: 'get',
    route: 'users',
    handler: (req, res) => {
      const users = getUsers()
      res.send(users)
    }
  }
]

export default userRoute;