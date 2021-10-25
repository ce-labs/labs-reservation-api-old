let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'https://labs-reservation-api.herokuapp.com/';


describe('BLOCKADES - Communication with the database', () => {

    it('getAllBlockades ', function(done){
        chai.request(url)
            .get('/api/v1/blockades/all')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });

    it('getSingleBlockade ', function(done){
        chai.request(url)
            .get('/api/v1/blockades/F207&all&15001650&Lunes')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });


});