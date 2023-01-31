export const API = process.env.API ?? "http://localhost:3001/api/v1/";

export const loginEndpoint = API + "auth/token/obtain";
export const refreshEndpoint = API + "auth/token/refresh";
export const verifyEndpoint = API + "auth/token/verify";

export const registrationEndpoint = API + "auth/register";

export const currentUserEndpoint = API + "accounts/me";
export const logoutEndpoint = API + "auth/token/logout";
