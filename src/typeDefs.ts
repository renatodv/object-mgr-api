import { gql } from "apollo-server";

export default gql`
  type Object {
    value: Int
    free: Boolean
  }
  type ObjectOuput {
    value: Int
  }
  type Query {
    _dummy: String
  }
  input ObjectInput {
    value: Int!
  }
  type Mutation {
    createObject(input: ObjectInput!): Object
    freeObject(input: ObjectInput!): Object
    getObject: ObjectOuput
  }
`;
