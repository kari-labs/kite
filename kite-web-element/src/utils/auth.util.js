export const loginUser = async (userid, password) => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
        user: loginUser(userid:"${userid}",password:"${password}") {
          _id
          userid
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