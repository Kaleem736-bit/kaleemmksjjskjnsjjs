
function register() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  if (!name || !email || !pass) return alert("يرجى ملء جميع الحقول");
  localStorage.setItem("user", JSON.stringify({ name, email, balance: 5000, created: Date.now() }));
  loadWallet();
}

function loadWallet() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  document.getElementById("auth").style.display = "none";
  document.getElementById("wallet").style.display = "block";
  document.getElementById("user-name").textContent = user.name;
  document.getElementById("balance").textContent = user.balance;
  const expiry = new Date(user.created + 5 * 24 * 60 * 60 * 1000);
  document.getElementById("expiry").textContent = expiry.toLocaleString();
}

function send() {
  const to = document.getElementById("recipient").value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (!to || isNaN(amount)) return alert("يرجى إدخال البيانات صحيحة");
  const user = JSON.parse(localStorage.getItem("user"));
  if (amount > user.balance) return alert("الرصيد غير كافٍ");
  user.balance -= amount;
  localStorage.setItem("user", JSON.stringify(user));
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push({ to, amount, time: new Date().toLocaleString() });
  localStorage.setItem("history", JSON.stringify(history));
  loadWallet();
  updateHistory();
}

function updateHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const ul = document.getElementById("history");
  ul.innerHTML = "";
  history.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `أُرسل ${h.amount} إلى ${h.to} بتاريخ ${h.time}`;
    ul.appendChild(li);
  });
}

window.onload = () => {
  loadWallet();
  updateHistory();
};
