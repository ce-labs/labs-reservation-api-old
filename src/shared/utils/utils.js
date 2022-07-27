function getFullDate() {
  const date = new Date();
  var day = date.getDate().toString();
  var month = (date.getMonth() + 1).toString();
  var year = date.getFullYear().toString();
  return month + "/" + day + "/" + year;
}

function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

function setReservationId(year, semester, week, lab, scheduleSection, day) {
  var input = year
    .concat(semester)
    .concat(week)
    .concat("&")
    .concat(lab)
    .concat("&")
    .concat(scheduleSection)
    .concat(day);
  var reservationId = input
    .replace("/", "")
    .replace("/", "")
    .replace(":", "")
    .replace(":", "")
    .replace("-", "");
  return reservationId;
}

function setBlockadeId(year, semester, lab, scheduleSection, day) {
  var input = year
    .concat(semester)
    .concat("&")
    .concat(lab)
    .concat("&")
    .concat(scheduleSection)
    .concat("&")
    .concat(day);
  var blockadeId = input
    .replace("/", "")
    .replace("/", "")
    .replace(":", "")
    .replace(":", "")
    .replace("-", "");
  return blockadeId;
}

const generateRecoveryCode = (length = 4, wishlist = "0123456789") =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join("");

module.exports = {
  getFullDate,
  jsonConcat,
  setReservationId,
  setBlockadeId,
  generateRecoveryCode,
};
