function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential.user.emailVerified) {
        window.location.href = "index.html";
      } else {
        alert("Please verify your email before logging in.");
      }
    })
    .catch(error => alert(error.message));
}

function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      sendVerificationEmail();
      alert("Verification email sent. Please verify and login.");
    })
    .catch(error => alert(error.message));
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}