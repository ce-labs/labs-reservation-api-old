
//Swagger documentation
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Reservación de Laboratorios CE',
            version: '1.0.0',
            description: 'Labs-reservation es una herramienta que tiene como propósito principal la consulta y reserva sobre disponibilidad de los laboratorios del Área Académica de Ingeniería en Computadores. Está destinada para que operadores, profesores y personal administrativo realicen la gestión de reservaciones desde su computadora.'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['../api/*.js']
}

module.exports = { swaggerOptions }
