document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //POST request to store new user - need to expand to include all columns
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        //Connection OK or not
        const messageElement = document.getElementById('responseMessage');
        if (response.status === 201) {
            messageElement.textContent = result.message;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = result.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
