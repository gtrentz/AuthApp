const express = require('express');
const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../config/db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;

        //Make sure email hasn't been used already
        const checkUserQuery = `SELECT * FROM Users WHERE email = @Email`;
        const checkUserRequest = pool.request();
        checkUserRequest.input('Email', sql.NVarChar, email);
        const userResult = await checkUserRequest.query(checkUserQuery);

        if (userResult.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        //I <3 mssql
        const insertUserQuery = `
            INSERT INTO Users (email, password) 
            VALUES (@Email, @Password)
        `;
        const insertUserRequest = pool.request();
        insertUserRequest.input('Email', sql.NVarChar, email);
        insertUserRequest.input('Password', sql.NVarChar, hashedPassword);
        await insertUserRequest.query(insertUserQuery);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;
        const checkUserQuery = `SELECT * FROM Users WHERE email = @Email`;
        const checkUserRequest = pool.request();
        checkUserRequest.input('Email', sql.NVarChar, email);
        const userResult = await checkUserRequest.query(checkUserQuery);

        if (userResult.recordset.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = userResult.recordset[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
