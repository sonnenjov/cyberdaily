
const passwordInput = document.getElementById("password");
const passwordRules = document.getElementById("rules_password");

const ruleUpper = document.getElementById("rule-upper");
const ruleNumber = document.getElementById("rule-number");
const ruleSpecial = document.getElementById("rule-special");

passwordInput.addEventListener("focus", () => {
  passwordRules.classList.add("active");
});

passwordInput.addEventListener("blur", () => {
  passwordRules.classList.remove("active");
});

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  ruleUpper.classList.toggle("valid", /[A-Z]/.test(value));
  ruleNumber.classList.toggle("valid", /[0-9]/.test(value));
  ruleSpecial.classList.toggle("valid", /[^A-Za-z0-9]/.test(value));
});



function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function loadUsers() {
  const response = await fetch("../js/users.json");
  return response.json();
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}



document.getElementById("login_form").addEventListener("submit", async e => {
  e.preventDefault();

  const identifierInput = document.getElementById("username_email");
  const message = document.getElementById("text_message");

  const identifier = identifierInput.value.trim();
  const password = passwordInput.value;

  if (!identifier || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (identifier.includes("@") && !isEmail(identifier)) {
    message.textContent = "Invalid email format.";
    return;
  }

  const users = await loadUsers();
  const passwordHash = await hashPassword(password);

  const user = users.find(u => {
    return isEmail(identifier)
      ? u.email === identifier
      : u.username === identifier;
  });

  if (!user || user.password !== passwordHash) {
    message.textContent = "Invalid credentials.";
    return;
  }

  message.textContent = "Login successful (demo).";
  localStorage.setItem("loggedUser", user.username);

  window.location.href = "../pages/login_success.html";
});

const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";
  eyeOpen.hidden = !isHidden;
  eyeClosed.hidden = isHidden;
});
