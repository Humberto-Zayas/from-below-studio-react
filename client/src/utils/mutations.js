import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($username: String, $description: String,) {
    editUser(username: $username, description: $description) {
      token
      user {
        _id
        username
        description
      }
    }
  }
`;

export const EDIT_DAY = gql`
  mutation editDay($date: String!, $disabled: Boolean, $hours: [String]) {
    editDay(date: $date, disabled: $disabled, hours: $hours) {
      day {
        _id
        date
        disabled
        hours
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const POST_MESSAGE = gql`
mutation postMessage($username: String, $text: String, $recipient: String) {
  postMessage (username: $username, text: $text, recipient: $recipient) {
    _id
    text
    username
    recipient
    createdAt
  }
}
`;
