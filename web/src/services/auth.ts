import history from "./history";
import jwtDecode from "jwt-decode";
import { userVar } from "./apollo/cache";
import client from "./apollo/client";

interface IDecodedJWT {
  uid: string;
  iat: number;
  exp: number;
}

export function logout(): void {
  const user = userVar();

  localStorage.removeItem("token");
  userVar({
    ...user,
    data: null,
  });
  
  client.resetStore();

  history.push("/login");
}

export function checkIfTokenExpired(): void {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode<IDecodedJWT>(token);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("token");
    }
  }
}