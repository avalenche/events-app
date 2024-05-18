export const buildQueryString = (params: Record<string, any>): string => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : "";
};
