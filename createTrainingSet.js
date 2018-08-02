const { min, max, normalize } = require("./utils");

const DAY_COUNT_ENTROPY = 30;

module.exports = (pair, cb) => {
  const data = require(`./${pair}.json`);
  const clearValues = data.map(({ value }) => value);

  const normalizedData = clearValues.map(
    normalize(min(clearValues), max(clearValues))
  );

  cb(normalizedData.map((_, i) => {
    if (i + DAY_COUNT_ENTROPY < normalizedData.length) {
      let input = [];

      for (let j = 0; j < DAY_COUNT_ENTROPY; j++) {
        input.push(normalizedData[i + j]);
      }
      
      const normalizedValues = input.map(
        normalize(min(input), max(input))
      );
      
      /**
       * Input: Last 29 days
       * Output: 30 Day
       */

      return {
        input: normalizedValues.slice(0, -1),
        output: [normalizedValues[normalizedValues.length - 1]]
      }
    }
  }).filter(item => !!item));
}