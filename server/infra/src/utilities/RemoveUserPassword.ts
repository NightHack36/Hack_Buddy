export const removeUserPassword = (user: any): any => {
  let obj: any = {};
  Object.keys(user).forEach((key) => {
    if (!(key === "password")) {
      obj[key] = user[key];
    }
  });
  return obj;
};
