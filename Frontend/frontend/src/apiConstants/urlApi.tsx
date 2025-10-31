export const URL_API = {
  GENERATE_SHORT_URL: "/url/create-short-url",
  GET_USER_URL_HISTORY: (userId: string) => `/url/get-user-url/${userId}`,
  REDIRECT_URL: (userId: string, shortUrl: string) =>
    `/url/redirect-url/${userId}/${shortUrl}`,
};
