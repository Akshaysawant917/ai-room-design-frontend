import { request } from "./client";

export function getTransformation(id) {
  return request({ method: "GET", url: `/transformations/${id}` });
}

export function getTransformations(page = 1, limit = 20) {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  return request({
    method: "GET",
    url: `/transformations?page=${page}&limit=${safeLimit}`,
  });
}
