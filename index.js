const brain = require("brain.js");
const { whitelist } = require("./utils");
const pair = process.argv[2];

if (whitelist.indexOf(pair) === -1) {
  console.log("ОШИБКА: Неверный идентификатор пары")
  return process.exit();
}

/**
 * Подготоваливаем данные
 */
require("./getLastDays")(pair, example => {
  require("./createTrainingSet")(pair, trainingSet => {
    const net = new brain.NeuralNetwork();
    
    net.train(trainingSet, {
      errorThresh: 0.0005, 
      logPeriod: 500,
    });

    const output = net.run(example); 
    const last = example[example.length - 1];

    console.log("КОЭФ. ПРЕДЫДУЩЕГО ДНЯ: ", last);
    console.log("КОЭФ. СЛЕДУЮЩЕГО ДНЯ: ", output);
    console.log("ЦЕНА ИЗМЕНИТСЯ ОТНОСИТЕЛЬНО ВСЕГО МЕСЯЧНОГО ПЕРИОДА: ", (output - last)/0.01, "%")
  })
});
