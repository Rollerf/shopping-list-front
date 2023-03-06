export const authHeader = () => {
  const tokenStr = localStorage.getItem("token");
  let token = null;

  if (tokenStr)
    token = JSON.parse(tokenStr);

  if (token) {
    return { 'Authorization': token };
  }

  return { 'Authorization': null };
}

export const saveToken = (token: string, type: string) => {
  token = type + " " + token;
  localStorage.setItem("token", JSON.stringify(token));
}

export const removeToken = () => {
  localStorage.removeItem("token");
}
