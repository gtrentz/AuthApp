
# gtrentz Authentication App

Welcome to the **gtrentz Authentication App**, a simple yet effective user authentication system built with Node.js, Express, and MSSQL. This application provides user registration, login functionality, session management, and admin access, demonstrating best practices for user authentication.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [Routes](#routes)
8. [License](#license)

---

## Features

- **User Registration:** Securely register users using bcrypt password hashing.
- **User Login:** Authenticates users and tracks their last login timestamp.
- **Session Management:** Uses `express-session` to manage user sessions.
- **Admin Dashboard:** Separate admin page for admin users to manage data.
- **Logout:** Logs users out and invalidates their session.
- **CORS** enabled to facilitate easy API testing.
- **Error Handling:** Graceful error messages for user-friendly feedback.

---

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MSSQL (SQL Server)
  - bcrypt.js (for password hashing)
  - express-session (for session management)
  
- **Frontend:**
  - HTML/CSS
  - Vanilla JavaScript

- **Database:**
  - MSSQL with the `mssql` Node.js package for interacting with the database.

---

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/auth-app.git
   cd auth-app
   ```

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed. Then run:
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
   You can store sensitive information like your session secret and database connection string in environment variables. See [Environment Variables](#environment-variables) for details.

5. **Start the Application:**
   ```bash
   npm start
   ```

---

## Environment Variables

Create a `.env` file at the root of the project and add the following variables:

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
```

Make sure to replace the placeholders with your actual MSSQL database credentials and secret values.

---

## Usage

1. **Registration:**
   - Navigate to `/signup.html` to register a new user.
   - Enter your email and password, then submit the form.

2. **Login:**
   - Navigate to `/login.html` to log in.
   - If you log in as an admin (`admin@gtrentz.com` with the correct password), you’ll be redirected to `/admin.html`. Otherwise, you’ll be redirected to `/home.html`.

3. **Admin Dashboard:**
   - The admin dashboard (`admin.html`) is available only to users with the admin email and password set in the environment variables.
   - Admins can manage users and view data.

4. **Session Management:**
   - The app uses sessions to maintain user login state. Upon login, the session is set, and users are redirected based on their role.

---

## Folder Structure

```
|-- config
|   |-- db.js               # MSSQL Database configuration
|
|-- public
|   |-- home.html            # Home page for logged-in users
|   |-- login.html           # Login page
|   |-- signup.html          # Signup page
|   |-- admin.html           # Admin dashboard
|   |-- styles               # Custom CSS (optional)
|
|-- routes
|   |-- auth.js              # Authentication routes (register, login, logout)
|
|-- app.js                   # Main server file
|-- package.json             # Project dependencies
|-- .env                     # Environment variables (ignored in git)
```

---

## Routes

### Authentication Routes (`/api/auth`)

- **POST `/register`**  
  Registers a new user. Requires `email` and `password` in the request body.

- **POST `/login`**  
  Logs a user in. Requires `email` and `password`. If credentials are valid, a session is created, and the user's `last_login` is updated.

- **POST `/logout`**  
  Logs the user out by destroying the session.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute by opening issues or submitting pull requests. Thanks for checking out the **gtrentz Authentication App**!
