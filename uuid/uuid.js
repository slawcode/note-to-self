// Export a function that creates a random string of numbers and letters
module.exports = () =>
    Math.floor((1 + Math.random()) * 0X10000)
.toString(16)
.substring(1);