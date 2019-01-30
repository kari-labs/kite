export const loginUser = async (userid, password) => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials':true
    },
    body: JSON.stringify({
      query: `{
        user: loginUser(userid:"${userid}",password:"${password}") {
          userid
          name
          scope
        }
      }`
    }),
  });
  response = await response.json();
  return response.data;
}

export const getUserScope = async () => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        scope: getUserScope
      }`
    }),
  });
  response = await response.json();
  return response.data;
}