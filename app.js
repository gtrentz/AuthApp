const express = require('express');
const session = require('express-session');
const { poolPromise } = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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
