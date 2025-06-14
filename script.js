// Carrega lista de países
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

// Busca notícias RSS (precisará de proxy ou API)
document.getElementById('countrySelect').addEventListener('change', function () {
  const feedUrl = this.value;
  if (!feedUrl) return;

  // Exemplo usando RSS to JSON Proxy (substituir por seu próprio backend se necessário)
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