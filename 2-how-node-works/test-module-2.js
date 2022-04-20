// alternative to module.exports iss to add properties to the export itself
// when we import this modulee in the other file, we will get access to this exports object

exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;