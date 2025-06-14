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

document.getElementById('countrySelect').addEventListener('change', function () {
  const feedUrl = this.value;
  if (!feedUrl) return;

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('newsFeed');
      container.innerHTML = '';
      if (data.status !== 'ok') return container.innerHTML = '<p>Erro ao carregar feed.</p>';

      data.items.slice(0, 10).forEach(item => {
        const article = document.createElement('article');
        article.innerHTML = `
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <small>${new Date(item.pubDate).toLocaleString()}</small>
          <p>${item.description.substring(0, 150)}...</p>
        `;
        container.appendChild(article);
      });
    });
});

// Troca de seções
function loadSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Redirecionamentos diretos
function goToMaritima() {
  window.location.href = "https://mar-links.netlify.app/"; 
}

function goToOperacional() {
  window.location.href = "https://pesqope.netlify.app/"; 
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
