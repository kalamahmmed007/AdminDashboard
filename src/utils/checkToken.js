export const checkToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  } catch {
    return false;
  }
};
