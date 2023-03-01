/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

function isCorrect(input, stored) {
  if (input != stored) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isCorrect };
