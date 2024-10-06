const express = require('express');
const { poolPromise } = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');

const app = express();

//CORS b/c I was having some issues testing requests in Postman
app.use(express.json());
app.use(cors());

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'public')));


poolPromise
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} :)`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database. Server not started.', err);
    });
