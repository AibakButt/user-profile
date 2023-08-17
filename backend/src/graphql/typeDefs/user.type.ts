import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    linkedIn: String!
    company: String!
  }

  type UsersWithTotalCount {
    users: [User]
    totalCount: Int 
  }

  type Query {
    getUsers(page: Int!, limit: Int!, sortField: String, sortOrder: Int, searchQuery: String): UsersWithTotalCount!
  }
`;

export default userTypeDefs;