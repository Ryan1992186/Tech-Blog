const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Signup failed');
    }
}

const submitForm = document.querySelector('#signup-submit');
console.log(submitForm);

submitForm.addEventListener('click', signUpFormHandler);