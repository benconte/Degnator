// logout

function logout() {
    auth.signOut().then(() => {
        alert("Logged out successfully.")
    });
    location.href = "/login.html"; //redirecting the user

};