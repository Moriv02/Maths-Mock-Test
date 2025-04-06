function sendVerificationEmail() {
  const user = firebase.auth().currentUser;
  if (user && !user.emailVerified) {
    user.sendEmailVerification().then(() => {
      console.log("Verification email sent.");
    }).catch(error => {
      console.error("Error sending email verification:", error);
    });
  }
}