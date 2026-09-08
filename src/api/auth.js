import { request } from "./client";

export function getCurrentUser() {
  return request({ method: "GET", url: "/users/me" });
}
