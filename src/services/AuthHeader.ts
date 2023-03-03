export const authHeader = () => {
  const tokenStr = localStorage.getItem("token");
  let token = null;

  if (tokenStr)
    token = JSON.parse(tokenStr);

  console.log(token);

  if (token) {
    return { 'Authorization': token };
  } else {
    return { 'Authorization': null };
  }
}

export const saveToken = (token: string, type: string) => {
  token = type + " " + token;
  console.log("setToken" + token);
  localStorage.setItem("token", JSON.stringify(token));
  console.log("getToken" + localStorage.getItem("token"));
}

export const isTokenPresent = () => {
  let token = localStorage.getItem("token");

  return token !== null;
}
