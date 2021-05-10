export default function renderForgotPasswordPage() {
  const markup = `
  <div class="login-signup-container">
    <button id="backToLoginPage">Go Back</button>
    <div class="block-log-in">
      <h2>Reset your password</h2>
      <input type="text" id="forgotPasswordEmail" placeholder="email">
      <button id="resetPasswordButton">Reset Password</button>
    </div>
  </div>
  `;
  document.querySelector('#root').innerHTML = markup;
}