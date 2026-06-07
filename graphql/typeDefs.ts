import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int!
    department: String!
    image: String
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createStudent(
      name: String!
      email: String!
      age: Int!
      department: String!
      image: String
    ): Student!
    updateStudent(
      id: ID!
      name: String
      email: String
      age: Int
      department: String
      image: String
    ): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
