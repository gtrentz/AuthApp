document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userEmail', email);
            if (email === 'admin@gtrentz.com' && 'abc123') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'home.html';
            }
        } else {
            responseMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        responseMessage.textContent = 'Error during login, please try again.';
    }
});
