export const signIn = (idp: string) => {
  window.location.href = `/auth/login?idp=${idp}`;
};

export const signOut = () => {
  window.location.href = "/auth/logout";
};
