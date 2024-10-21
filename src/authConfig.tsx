export const msalConfig = {
  auth: {
    clientId: "6ad33993-d441-47e7-a254-bcfa085d3e8c",
    authority:
      "https://login.microsoftonline.com/aa26dc99-35aa-47ee-b1f5-d892b9d8f2e2",
    redirectUri: `${import.meta.env.VITE_BASE_URL}/`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};
