let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'https://labs-reservation-api.herokuapp.com/';


describe('UTILS - Communication with the database', () => {

    it('getCourses ', function(done){
        chai.request(url)
            .get('/api/v1/utils/courses')
            .end((err, res) => {
                //expect(res).to.have.text('[{"_id":"6173076c5cf308ba2d6a9e1e","courseId":"CE1101","courseName":"CE1101 - INTRODUCCIÓN A LA PROGRAMACIÓN"},{"_id":"617307845cf308ba2d6a9e1f","courseId":"CE1102","courseName":"CE1102 - TALLER DE PROGRAMACIÓN"},{"_id":"617307925cf308ba2d6a9e20","courseId":"CE1103","courseName":"CE1103 - ALGORITMOS Y ESTRUCTURAS DE DATOS I"},{"_id":"6173079d5cf308ba2d6a9e21","courseId":"CE2103","courseName":"CE2103 - ALGORITMOS Y ESTRUCTURAS DE DATOS II"},{"_id":"617307ac5cf308ba2d6a9e22","courseId":"CE2201","courseName":"CE2201 - LABORATORIO DE CIRCUITOS ELÉCTRICOS"},{"_id":"617307bb5cf308ba2d6a9e23","courseId":"CE3101","courseName":"CE3101 - BASES DE DATOS"},{"_id":"617307ca5cf308ba2d6a9e24","courseId":"CE3104","courseName":"CE3104 - LENGUAJES, COMPILADORES E INTERPRETES"},{"_id":"617307ec5cf308ba2d6a9e25","courseId":"CE3102","courseName":"CE3102 - ANÁLISIS NUMÉRICO PARA INGENIERÍA"},{"_id":"617307f95cf308ba2d6a9e26","courseId":"CE3201","courseName":"CE3201 - TALLER DE DISEÑO DIGITAL"},{"_id":"617308075cf308ba2d6a9e27","courseId":"CE4101","courseName":"CE4101 - ESPECIFICACIÓN Y DISEÑO DE SOFTWARE"},{"_id":"617308125cf308ba2d6a9e28","courseId":"CE4202","courseName":"CE4202 - TALLER DE DISEÑO ANALÓGICO"},{"_id":"617308205cf308ba2d6a9e29","courseId":"CE4301 ","courseName":"CE4301 - ARQUITECTURA DE COMPUTADORES I"},{"_id":"6173082d5cf308ba2d6a9e2a","courseId":"CE4302","courseName":"CE4302 - ARQUITECTURA DE COMPUTADORES II"},{"_id":"6173083f5cf308ba2d6a9e2b","courseId":"CE4303","courseName":"CE4303 - PRINCIPIOS DE SISTEMAS OPERATIVOS"},{"_id":"617308495cf308ba2d6a9e2c","courseId":"CE5301","courseName":"CE5301 - REDES DE COMPUTADORES"},{"_id":"617308575cf308ba2d6a9e2d","courseId":"CE5302","courseName":"CE5302 - PROYECTO DE DISEÑO DE INGENIERÍA EN COMPUTADORES"},{"_id":"617308635cf308ba2d6a9e2e","courseId":"CE5401 ","courseName":"CE5401 - FORMULACIÓN Y ADMINISTRACIÓN DE PROYECTOS"},{"_id":"617308705cf308ba2d6a9e2f","courseId":"CE5508","courseName":"CE5508 - ARQUITECTURA DE SOFTWARE"},{"_id":"6173087c5cf308ba2d6a9e30","courseId":"CE0001","courseName":"ASUNTOS ADMINISTRATIVOS"}]')
                expect(res).to.have.status(405);
                done();
            });
    });

    it('getLabs ', function(done){
        chai.request(url)
            .get('/api/v1/utils/labs')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });

    it('getScheduleData ', function(done){
        chai.request(url)
            .get('/api/v1/utils/scheduleData')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });

    it('getScheduleDays ', function(done){
        chai.request(url)
            .get('/api/v1/utils/scheduleDays')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });


    it('getStaff ', function(done){
        chai.request(url)
            .get('/api/v1/utils/staff')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });

    it('getUserTypes ', function(done){
        chai.request(url)
            .get('/api/v1/utils/userTypes')
            .end((err, res) => {
                expect(res).to.have.status(405);
                done();
            });
    });
    



});