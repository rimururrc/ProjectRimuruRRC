let loggedIn = false;

// Carrega países
fetch('data/countries.json')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('countrySelect');
    data.forEach(country => {
      const opt = document.createElement('option');
      opt.value = country.feed;
      opt.textContent = country.name;
      select.appendChild(opt);
    });
  });

// Troca de seções
function loadSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Login
function login(e) {
  e.preventDefault();
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if (user === 'rimururrc' && pass === 'Tespest071190!@') {
    loggedIn = true;
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('edit-panel').classList.remove('hidden');
    document.getElementById('auth-btn').textContent = "Logout";
    document.getElementById('auth-btn').setAttribute('onclick', 'logout()');
  } else {
    alert('Login inválido!');
  }
}

// Logout
function logout() {
  loggedIn = false;
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('edit-panel').classList.add('hidden');
  document.getElementById('auth-btn').textContent = "Login";
  document.getElementById('auth-btn').setAttribute('onclick', 'toggleLogin()');
}

// Mostra painel de login
function toggleLogin() {
  loadSection('login-panel');
}
