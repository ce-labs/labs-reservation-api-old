const { getFullDate, setReservationId } = require('./utils');

function runTests(){
    var date = getFullDate();
    console.log('Get Full Date: ' + date);
    var reservationId = setReservationId('F208', '10/18/2021', '7:30-9:20');
    console.log('Reservation Id: ' + reservationId);


}

module.exports = { runTests } 