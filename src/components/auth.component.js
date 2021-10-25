const jwt = require('jsonwebtoken');
const { getConnection } = require('../shared/connection');
const { isCorrectPassword } = require('../shared/auth/auth.functions');

const secret = 'mysecretsshhh';

const verifyUser = (req, res) => {
    console.log(req.body)
    const { userId, password } = req.body;

    const databaseConnection = getConnection();
    databaseConnection.collection('users').findOne({ userId }, (error, user) => {
        if(error) {
            res.status(400).send('⛔️ An error occurred verifying the user ... \n[Error]: ' + error);  
        } else if (!user) {
            res.status(401).send('⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect email or password');
        } 
        else {
            let response = isCorrectPassword(password, user.password);
            if(!response) {
                res.status(401).send('⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect email or password');
            } else {
                const payload = { userId };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true }).sendStatus(200);
            }
        }
    })
};

module.exports = { verifyUser }