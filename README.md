
# Authentication App

Welcome to my authentication app, a simple user authentication system built with Node.js, Express, and MSSQL. This application provides user registration, login functionality, session management, and admin access, demonstrating best practices for user authentication.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Routes](#routes)

---

## Features

- **User Registration:** Securely register users using bcrypt password hashing.
![**Signup**](https://gtrentz.neocities.org/signup.png)
- **User Login:** Authenticates users and tracks their last login timestamp.
![**Login**](https://gtrentz.neocities.org/login.png)
![**Home**](https://gtrentz.neocities.org/home.png)
- **Session Management:** Uses `express-session` to manage user sessions.
- **Admin Dashboard:** Separate admin page for admin users to manage data.
- **Logout:** Logs users out and invalidates their session.
- **CORS** enabled to facilitate easy API testing.
- **Error Handling:** Graceful error messages for user-friendly feedback.

---

## Stack:

- **Backend:**
  - Node.js
  - Express.js
  - MSSQL (SQL Server)
  - bcrypt.js (for password hashing)
  - express-session (for session management)
  
- **Frontend:**
  - HTML/CSS
  - JavaScript

- **Database:**
  - MSSQL with the `mssql` Node.js package for interacting with the database.

---

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gtrentz/AuthApp.git
   cd AuthApp
   ```

2. **Install Dependencies:**
   This project requires [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/). Then run:
   ```bash
   npm install
   ```

3. **Configure MSSQL Database:**
   - Set up a new MSSQL database.
   - Create a table called `Users`:
     ```sql
     CREATE TABLE Users (
       id INT PRIMARY KEY IDENTITY(1,1),
       email NVARCHAR(255) UNIQUE NOT NULL,
       password NVARCHAR(255) NOT NULL,
       last_login DATETIME
     );
     ```

4. **Configure Environment Variables:**
   See below - I stored environment variables like login credentials on my local machine.

5. **Start the Application:**
   ```bash
   npm start
   ```

---

## Environment Variables

Create a file called `.env` and add your credentials:

```bash
# Server Port
PORT=3000

# Session Secret
SESSION_SECRET=your-session-secret

# MSSQL Database Connection
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_DATABASE=your_db_name
DB_PORT=1433

## Usage

1. **Registration:**
   - Navigate to `/signup.html` to register a new user with email and password

2. **Login:**
   - Navigate to `/login.html` to log in.
   - If you log in as an admin (`admin@gtrentz.com` with password `abc123` for demonstration purposes), you’ll be redirected to `/admin.html`, which is an admin dashboard. Otherwise, you’ll be redirected to `/home.html`.

3. **Session Management:**
   - The app uses sessions to maintain user login state. Upon login, the session is set, and users are redirected based on their role.

### Authentication Routes (`/api/auth`)

- **POST `/register`**  
  Registers a new user. Requires `email` and `password` in the request body.

- **POST `/login`**  
  Logs a user in. Requires `email` and `password`. If credentials are valid, a session is created, and the user's `last_login` is updated in the Users table

- **POST `/logout`**  
  Logs the user out by ending the session.


