import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    username
    description
  }
}
`;

export const QUERY_ME = gql`
query Query {
  me {
    _id
    username
    description
  }
}
`;

export const QUERY_MESSAGES = gql`
query messages {
  messages {
    _id
    username
    text
  }
}
`;

export const QUERY_DAYS = gql`
  query days {
    days {
      _id
      date
      disabled
      hours
    }
  }
`;

export const QUERY_DAY = gql`
query day($date: string) {
  day(date: $date) {
    _id
    date
    disabled
    hours
  }
}
`;

export const QUERY_MESSAGES_TO_RECIPIENT = gql`
query messagesToRecipient($username: String!, $recipient: String!) {
  messagesToRecipient(username: $username, recipient: $recipient) {
    _id
    username
    recipient
    createdAt
    text
  }
}
`;