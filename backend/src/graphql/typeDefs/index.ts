import { gql, concatenateTypeDefs } from 'apollo-server-express';
import userTypeDefs from './user.type';

const typeDefs = gql`
  ${concatenateTypeDefs([
    userTypeDefs,
  ])}
`;

export default typeDefs;