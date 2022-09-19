export default function authHeader() {

  const accessToken = JSON.parse(localStorage.getItem("token") || "");
  if (accessToken) {
    return { authorization : accessToken };
  } else {
    return {};
  }
}
