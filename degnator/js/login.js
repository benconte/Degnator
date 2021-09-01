const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(credential => {
        // console.log(credential.user.email);
        loginForm.reset();
        location.href = "/index.html"; //redirecting the user
    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode == 'auth/user-not-found') {
            //  alert('This email is taken. Please choose another one!');
            document.getElementById("email-error").textContent = errorMessage;
            document.getElementById("email-error").style.display = "block";
            loginForm.reset();
        } else if (errorCode == 'auth/wrong-password') {
            document.getElementById("password-error").textContent = "Wrong password. Please try again";
            document.getElementById("password-error").style.display = "block";
            loginForm.reset();
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
});