import { apolloClient } from '@/apollo.js';
import gql from 'graphql-tag';

export const loginUser = async (userid, password) => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        user: loginUser(userid:"${userid}",password:"${password}") {
          _id
          userid
          logins
          forceReset
          name
          containers {
            nickname
          }
          preferences {
            theme
          }
          scope
        }
      }`
    }),
    credentials: 'include',
  });
  response = await response.json();
  return response;
}

export const getUser = async () => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
        user: getUser {
          _id
          userid
          logins
          name
          containers
          preferences {
            theme
          }
          scope
        }
      }`
    }),
    credentials: 'include',
  });
  response = await response.json();
  return response;
}

export const signOutUser = async () => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        status: signOutUser
      }`
    }),
    credentials: 'include',
  });
  response = await response.json();
  return response;
}

export const updateUser = async (userid, newUser) => {
  return await apolloClient.mutate({
    mutation: gql`
      mutation($userid: String!, $user: UserInput!) {
        user: updateUser(userid: $userid, user: $user) {
          _id
          userid
          logins
          forceReset
          name
          containers {
            nickname
          }
          preferences {
            theme
          }
          scope
        }
      }
    `,
    variables: {
      userid: userid,
      user: newUser
    }
  });
}