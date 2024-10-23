const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const convertCamelToSnake = (req, res, next) => {
  req.body = Object.keys(req.body).reduce((acc, key) => {
    acc[camelToSnake(key)] = req.body[key];
    return acc;
  }, {});
  next();
};

export default convertCamelToSnake;
