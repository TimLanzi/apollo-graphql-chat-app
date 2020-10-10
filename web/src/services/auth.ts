import { History } from "history";
import { userVar } from "./apollo/cache";
import client from "./apollo/client";

export function logout(history: History): void {
  const user = userVar();

  localStorage.removeItem("token");
  userVar({
    ...user,
    data: null,
  });
  
  client.resetStore();

  history.push("/login");
}