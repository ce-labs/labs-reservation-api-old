let chai = require('chai');
const expect = require('chai').expect;
var assert = require('assert');

const { setReservationId, setBlockadeId } = require('./../shared/utils/utils');


describe('LOCAL FUNCTIONS ', () => {

    it('setReservationId : remove spaces and unwanted letters', function () {
        assert.equal(setReservationId('F208', '10/18/2021', '7:30-9:20'), 'F208&10182021&730920');
    });

    it('setBlockadeId : remove spaces and unwanted letters', function () {
        assert.equal(setBlockadeId('F209', 'all', '7:30-9:20', 'Lunes'), 'F209&all&730920Lunes');
    });


});