let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'https://labs-reservation-api.herokuapp.com/';


describe('USERS - Communication with the database', () => {

    it('getAllUsers ', function(done){
        chai.request(url)
            .get('/api/v1/users/all')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('getSingleUser ', function(done){
        chai.request(url)
            .get('/api/v1/users/301230132')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('setUserStatus ', function(done){
        chai.request(url)
            .put('/api/v1/users/301230132')
            .send({"userStatus":"active"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


});