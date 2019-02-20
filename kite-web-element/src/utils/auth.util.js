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