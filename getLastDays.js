const { min, max, normalize } = require("./utils");

module.exports = (pair, cb) => {
  const data = require(`./${pair}.json`);

  const clearValues = data
    .map((item) => item.value).slice(data.length - 29, data.length);
    
  return cb(clearValues.map(normalize(
    min(clearValues), max(clearValues)
  )));
}