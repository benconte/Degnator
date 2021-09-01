// sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const username = signupForm[0].value;
    const email = signupForm[1].value;
    const password = signupForm[2].value;
    const confirm_password = signupForm[3].value;

    // signup the user
    if (password == confirm_password) {
        document.getElementById("password").style.borderColor = "#555";
        document.getElementById("confirm-password").style.borderColor = "#555";

        auth.createUserWithEmailAndPassword(email, password).then(credential => {
            // console.log(credential.user);
            signupForm.reset();
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // Updates the user attributes:
                    user.updateProfile({ // <-- Update Method here

                        displayName: username,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/degnator-f0c22.appspot.com/o/profiles%2Fdefault.png?alt=media&token=b27ec2c8-818a-499d-8026-a9499addcb70"

                    }).then(function() {
                        //  "NEW USER NAME"
                        var displayName = user.displayName;
                        var photoURL = user.photoURL;
                        location.href = "/index.html"; //redirecting the user

                    }, function(error) {
                        // An error happened.
                        console.log(error)
                    });

                }
            });

        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            if (errorCode == 'auth/email-already-in-use') {
                //  alert('This email is taken. Please choose another one!');
                document.getElementById("email-error").textContent = "This email is taken. Please choose another one!"
                document.getElementById("email").style.borderColor = "#e71d1d";
                document.getElementById("email-error").style.display = "block";
                signupForm.reset();
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });



    } else {
        document.getElementById("password").style.borderColor = "#e71d1d";
        document.getElementById("confirm-password").style.borderColor = "#e71d1d";
        alert("Your Password creditial don't match. Please review before submiting.");
    }

});

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         location.href = "/frontend/index.html"; //redirecting the user

//     } else {
//         // No user is signed in.
//         console.log("You've been logged out. Signin again.")
//     }
// });