const crypto = require('crypto');

function getFullDate(){
    const date = new Date();
    var day = date.getDate().toString();
    var month = (date.getMonth()+1).toString();
    var year = date.getFullYear().toString();
    return month + "/" + day + "/" + year;
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

function setReservationId(lab, date, scheduleSection){
    var input = lab.concat('&').concat(date).concat('&').concat(scheduleSection);
    var reservationId = input.replace('/','').replace('/','').replace(':','').replace(':','').replace('-','');
    return reservationId;
}

function setBlockadeId(lab, date, scheduleSection, day){
    var input = lab.concat('&').concat(date).concat('&').concat(scheduleSection).concat(day);
    var blockadeId = input.replace('/','').replace('/','').replace(':','').replace(':','').replace('-','');
    return blockadeId;
}

const generateRandomPassword = (
    length = 10,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
    ) => 
        Array.from(crypto.randomFillSync(new Uint32Array(length)))
             .map((x) => wishlist[x % wishlist.length])
             .join('')
    {/*var randomString = Math.random().toString(36).slice(-8);
    return randomString;*/}


module.exports = { getFullDate, jsonConcat, setReservationId, setBlockadeId,generateRandomPassword } 