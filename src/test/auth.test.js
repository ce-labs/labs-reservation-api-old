let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'https://labs-reservation-api.herokuapp.com/';


describe('AUTH - Communication with the database', () => {

    it('login request - incorrect userId', (done) => {
        chai.request(url)
            .post('/api/v1/auth/login')
            .send({"userId": "123","password": "asdfghjk."})
            .end(function (err, res) {
                //console.log(res);
                expect(res).to.have.status(401);
                done();
            });
    });

    it('login request - incorrect password', (done) => {
        chai.request(url)
            .post('/api/v1/auth/login')
            .send({"userId": "2021000004","password": "asd."})
            .end(function (err, res) {
                //console.log(res);
                expect(res).to.have.status(401);
                done();
            });
    });

    it('login request - correct userId and password', (done) => {
        chai.request(url)
            .post('/api/v1/auth/login')
            .send({"userId": "2021000004","password": "asdfghjk."})
            .end(function (err, res) {
                //console.log(res);
                expect(res).to.have.status(200);
                done();
            });
    });

});