module.exports.min = value => Math.min.apply(this, value);
module.exports.max = value => Math.max.apply(this, value);

module.exports.normalize = (min, max) => {
  var delta = max - min;
  return (val) => (val - min) / delta;
}

module.exports.whitelist = [
  "USDEUR",
  "USDGBP"
]