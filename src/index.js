const express = require('express');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth.routes');
const blocksRoutes = require('./routes/blockades.routes');
const reservationsRoutes = require('./routes/reservations.routes');
const usersRoutes = require('./routes/users.routes');
const utilsRoutes = require('./routes/utils.routes');

const app = express();

app.use('/v1/auth', authRoutes);
app.use('/v1/blockades', blocksRoutes);
app.use('/v1/reservations', reservationsRoutes);
app.use('/v1/users', usersRoutes);
app.use('/v1/utils', utilsRoutes);

app.get('/', (req, res) => { 
    res.status(200).send('Labs Reservation API 📅 \n email: celabscr@gmail.com \n For more information visit: https://github.com/ce-labs/labs-reservation-api'); 
});
app.get('*', (req, res)  => { 
    res.status(405).send('Method does not exist'); 
});
app.post('*', (req, res) => { 
    res.status(405).send('Method does not exist'); 
});
app.put('*', (req, res)  => {
     res.status(405).send('Method does not exist'); 
});
app.delete('*', (req, res)  => { 
    res.status(405).send('Method does not exist'); 
});

app.listen(PORT, () => console.log(`Server running 🚀 on port: ${PORT}...`));
