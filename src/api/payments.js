import { request } from "./client";

export function createPaymentOrder(transformationData) {
  return request({
    method: "POST",
    url: "/payments/create-order",
    data: { transformationData },
  });
}

export function verifyPayment(payload) {
  return request({
    method: "POST",
    url: "/payments/verify",
    data: payload,
  });
}
