var password_input = document.getElementById("password");
var password_rules = document.getElementById("rules_password");

var upper = document.getElementById("rule-upper");
var number = document.getElementById("rule-number");
var special = document.getElementById("rule-special");





password_input.addEventListener("focus", function () {
  password_rules.classList.add("active");
});

password_input.addEventListener("blur", function () {
  password_rules.classList.remove("active");
});

async function loadUsers() {
  const response = await fetch("../js/users.json");
  return response.json();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}










document.getElementById("login_form").addEventListener("submit", async e => {
  e.preventDefault();

  const identifier = document.getElementById("username_email").value.trim();
  const message = document.getElementById("text_message");

  const passwordHash = await hashPassword(
    document.getElementById("password").value
  );

  const users = await loadUsers();

  const user = users.find(u =>
    u.username === identifier || u.email === identifier
  );

  if (!user || user.password !== passwordHash) {
    message.textContent = "Invalid credentials.";
    return;
  }

  message.textContent = "Login successful (demo).";
  localStorage.setItem("loggedUser", user.username);
  window.location.href = "../pages/login_success.html";
});

password.addEventListener("input", () => {
  const value = password.value;

  upper.classList.toggle("valid", /[A-Z]/.test(value));
  number.classList.toggle("valid", /[0-9]/.test(value));
  special.classList.toggle("valid", /[^A-Za-z0-9]/.test(value));
});


async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

