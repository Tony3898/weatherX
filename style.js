const chalk = require("chalk");

//initilizaling
const error = chalk.red;
const warning = chalk.keyword('orange');
const success = chalk.green;

module.exports = {
    error:error,
    warning:warning,
    success:success
};
