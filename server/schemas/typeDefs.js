/// -- import the gql tagged template function -- ///
const { gql } = require("graphql-tag");

/// ----  create our typeDefs ---- ///
const typeDefs = gql`

  type Message {
    _id: ID
    username: String
    text: String
    createdAt: String
    recipient: String
  }

  type Day {
    _id: ID
    date: String
    disabed: Boolean
    hours: [String]
  }

  type User {
    _id: ID
    username: String
    description: String
    messages: [Message]
  }


  type Auth {
    token: ID!
    user: User
  }

  type Subscription {
    messagePosted: Message
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    usersById(_id: [ID!]): [User]
    messages: [Message!]  
    messagesToRecipient(username: String!, recipient: String!): [Message!]
    day(date: String!): Day
    days: [Day]
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(username: String, description: String, ): Auth
    postMessage(username: String, text: String, recipient: String): Message
  }
`;

// export the typeDefs
module.exports = typeDefs;
