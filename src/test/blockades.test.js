let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';


describe('BLOCKADES - Comunicación con la base de datos', () => {

    it('getAllBlockades ', function(done){
        chai.request(url)
            .get('/api/v1/blockades/all')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('getSingleBlockade ', function(done){
        chai.request(url)
            .get('/api/v1/blockades/F207&all&15001650&Lunes')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


});