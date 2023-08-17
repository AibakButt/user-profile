import { gql } from "@apollo/client";

export const GET_USERS = gql`
 query GetUsersWithTotalCount(
  $page: Int!
  $limit: Int!
  $sortField: String
  $sortOrder: Int
  $searchQuery: String
) {
  getUsers(
    page: $page
    limit: $limit
    sortField: $sortField
    sortOrder: $sortOrder
    searchQuery: $searchQuery
  ) {
    users {
      _id
      name
      email
      phone
      linkedIn
      company
    }
    totalCount
  }
}

`