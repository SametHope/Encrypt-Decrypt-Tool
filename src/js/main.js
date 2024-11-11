const cryptoHelper = new CryptoHelper2304(16, 16, 210000);

const inputTextArea = document.getElementById('inputText');
const passwordInput = document.getElementById('password');
const toggleIcon = document.querySelector('.toggle-password');

const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
// const warningText = document.getElementById('warning');

const outputTextArea = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');


function togglePasswordVisibility() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
  }

  ToastInfo("Toggled password visibility");
}

function toggleButtonState() {
  const password = passwordInput.value.trim();
  encryptBtn.disabled = !password;
  decryptBtn.disabled = !password;
  // warningText.style.display = password ? 'none' : 'block';
}

async function encryptText() {
  const text = inputTextArea.value;
  const password = passwordInput.value;
  if (!text || !password) {
    ToastWarning("Missing input or password");
    return;
  }

  const encrypted = await cryptoHelper.encryptToBase64(text, password);
  displayOutput(encrypted);
  ToastSuccess("Encryption successful");
}

async function decryptText() {
  const text = inputTextArea.value;
  const password = passwordInput.value;
  if (!text || !password) {
    ToastWarning("Missing input or password");
    return;
  }

  const decrypted = await cryptoHelper.decryptFromBase64(text, password);
  if (decrypted) {
    displayOutput(decrypted);
    ToastSuccess("Decryption successful");
  } else {
    ToastError("Decryption failed, please check your input and password and try again");
  }
}

function displayOutput(output) {
  outputTextArea.textContent = output;
  copyBtn.style.display = 'block';
  // warningText.style.display = 'none';
}

function copyOutput() {
  const output = outputTextArea.textContent;
  navigator.clipboard.writeText(output).then(() => {
    ToastSuccess("Copied output to clipboard");
  }).catch(err => {
    ToastError("Failed copying output to clipboard");
    console.error(err);
  });
}

function switchInputOutput() {
  const input = inputTextArea.value;
  const output = outputTextArea.textContent;
  inputTextArea.value = output;
  outputTextArea.textContent = input;

  ToastInfo("Switched input and output contents");
}

// ----------- Toast Helpers -----------

const toastbg = {
  success: "var(--bs-success)",
  warning: "var(--bs-warning)",
  error: "var(--bs-danger)",
  info: "var(--bs-primary)", // for actions that can't fail
};

function ToastSuccess(message) {
  Toastify({
    text: message,
    duration: 2100,
    style: { background: toastbg.success }
  }).showToast();
}

function ToastError(message) {
  Toastify({
    text: message,
    duration: 3500,
    style: { background: toastbg.error }
  }).showToast();
}

function ToastWarning(message) {
  Toastify({
    text: message,
    duration: 3500,
    style: { background: toastbg.warning }
  }).showToast();
}

function ToastInfo(message) {
  Toastify({
    text: message,
    duration: 2100,
    style: { background: toastbg.info }
  }).showToast();
}