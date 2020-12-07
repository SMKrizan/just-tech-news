async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // ensures all fields have values before making post request
    if (username && email && password) {
        // when using await, we can assign the result of the promise to a variable which eliminates the use of '.catch' or '.then' to signal what should happen once the Promise completes.
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check response status
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);