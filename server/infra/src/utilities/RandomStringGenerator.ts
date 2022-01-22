export const generateRandomString = (length: number): string => {
  let password = "";
  for (let i = 0; i < length; ++i) {
    const randomNo = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    if (randomNo === 1) {
      let temp = Math.floor(Math.random() * (90 - 65 + 1) + 65);
      password += String.fromCharCode(temp);
    } else if (randomNo === 2) {
      let temp = Math.floor(Math.random() * (122 - 97 + 1) + 97);
      password += String.fromCharCode(temp);
    } else {
      let temp = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      password += temp.toString();
    }
  }
  return password;
};
