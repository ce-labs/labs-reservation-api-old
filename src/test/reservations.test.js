let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';


describe('RESERVATIONS - Comunicación con la base de datos', () => {

    it('getAllReservations ', function(done){
        chai.request(url)
            .get('/api/v1/reservations/all')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('getSingleReservation ', function(done){
        chai.request(url)
            .get('/api/v1/reservations/F207&10252021&730920')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


});