import {gql} from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    nickName: String!
  }
  
  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }
`

export default userSchema;
