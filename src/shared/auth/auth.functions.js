function isCorrect(input, stored) {
  if (input != stored) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isCorrect };
