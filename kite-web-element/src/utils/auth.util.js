export const loginUser = async (userid, password) => {
  let response = await fetch('https://localhost/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{ loginUser(userid:"${userid}",password:"${password}") }`
    }),
  });
  response = await response.json();

  return response.data;
}