const generateRandomString = (len = 100) => {
  let chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = chars.length;
  let random = "";

  for (let i = 1; i <= len; i++) {
    let posn = Math.ceil(Math.random() * (length - 1));
    random += chars[posn];
  }
  return random;
};

module.exports = { generateRandomString };
