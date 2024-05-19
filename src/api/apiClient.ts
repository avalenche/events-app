import { ApiClientOptions } from '../types';
import { buildQueryString } from "../utils/queryString";

const BASE_URL = "http://localhost:5000/api";

const apiClient = async <T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const { params, ...config } = options;
  const queryString = params ? buildQueryString(params) : "";

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    ...config,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

export default apiClient;
