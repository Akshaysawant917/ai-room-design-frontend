import axios from "axios";

export const TOKEN_KEY = "ai_home_token";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (config.data) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export function getApiError(error) {
  const responseError = error.response?.data?.error;
  const apiError = new Error(
    responseError?.message ||
      error.message ||
      "Something went wrong. Please try again.",
  );

  apiError.code =
    responseError?.code ||
    (error.response?.status === 401 ? "UNAUTHENTICATED" : "NETWORK_ERROR");
  apiError.status = error.response?.status;
  return apiError;
}

export async function request(config) {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new CustomEvent("ai-home:unauthorized"));
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/auth/callback"
      ) {
        window.location.assign("/login");
      }
    }
    throw getApiError(error);
  }
}
