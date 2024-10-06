const express = require('express');
const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../config/db');
const router = express.Router();
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;
        const checkUserQuery = `SELECT * FROM Users WHERE email = @Email`;
        const checkUserRequest = pool.request();
        checkUserRequest.input('Email', sql.NVarChar, email);
        const userResult = await checkUserRequest.query(checkUserQuery);
        if (userResult.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = `INSERT INTO Users (email, password) VALUES (@Email, @Password)`;
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

// Login Route
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

        //Store as most recent login (last_login in Users table)
        const updateLastLoginQuery = `UPDATE Users SET last_login = @LastLogin WHERE email = @Email`;
        const updateLastLoginRequest = pool.request();
        updateLastLoginRequest.input('LastLogin', sql.DateTime, new Date());
        updateLastLoginRequest.input('Email', sql.NVarChar, email);
        await updateLastLoginRequest.query(updateLastLoginQuery);
        console.log('Session before login:', req.session); // Debugging line
        req.session.user = { email: user.email };
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
