const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { swaggerOptions } = require('./routes/api-docs/docs');
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({origin: 'http://localhost:5000'}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/api/v1/auth', require('./routes/api/auth.routes'));
app.use('/api/v1/blockades', require('./routes/api/blockades.routes'));
app.use('/api/v1/reservations', require('./routes/api/reservations.routes'));
app.use('/api/v1/users', require('./routes/api/users.routes'));
app.use('/api/v1/utils', require('./routes/api/utils.routes'));

app.get('/', (req, res) => { res.status(200).send('Labs Reservation API 📅 \n email: celabscr@gmail.com \n For more information visit: https://github.com/ce-labs/labs-reservation-api'); });
app.get('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.post('*', (req, res) => { res.status(405).send('Method does not exist'); });
app.put('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.delete('*', (req, res)  => { res.status(405).send('Method does not exist'); });

app.listen(PORT, () => console.log(`Server running 🚀 on port: ${PORT}...`));
