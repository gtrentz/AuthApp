document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const responseMessage = document.getElementById('responseMessage');

    //POST request to store new user - need to expand to include all columns
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userEmail', email);
            window.location.href = 'home.html';
        } else {
            responseMessage.textContent = data.message;
        }
    } catch (error) {
        console.error('Error during signup:', error);
        responseMessage.textContent = 'Error during signup, please try again.';
    }
});
