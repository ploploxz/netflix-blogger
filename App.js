/* ===============================
   CONFIGURACIÓN
================================ */
const API_KEY = '686e8f50b2135e3c32f670ec018df888';
const API = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p/original';

/* ===============================
   HERO SLIDER (DESTACADO)
================================ */
fetch(`${API}/trending/all/week?api_key=${API_KEY}&language=es-ES`)
.then(r => r.json())
.then(data => {
  const item = data.results[0];
  document.getElementById('hero').innerHTML = `
    <div class="hero" style="background-image:url(${IMG}${item.backdrop_path})">
      <div class="hero-info">
        <h2>${item.title || item.name}</h2>
        <p>${item.overview.substring(0,140)}...</p>
        <span class="btn" onclick="openFicha(
          '${item.title || item.name}',
          '${item.overview}',
          '${IMG}${item.poster_path}'
        )">Reproducir</span>
      </div>
    </div>
  `;
});

/* ===============================
   FILAS AUTOMÁTICAS
================================ */
const rows = [
  { title:'Tendencias', url:'/trending/all/week' },
  { title:'Películas Populares', url:'/movie/popular' },
  { title:'Series Populares', url:'/tv/popular' }
];

rows.forEach(r => loadRow(r.title, r.url));

function loadRow(title, endpoint){
  fetch(`${API}${endpoint}?api_key=${API_KEY}&language=es-ES`)
  .then(res => res.json())
  .then(data => {
    let html = `<div class="row"><h2>${title}</h2><div class="row-posters">`;
    data.results.forEach(item => {
      if(!item.poster_path) return;
      html += `
        <div class="poster"
        style="background-image:url(${IMG}${item.poster_path})"
      onclick="openFicha(
  '${item.title}',
  '${item.overview}',
  '${IMG}${item.poster_path}',
  ${item.id},
  'movie'
)"></div>`;
    });
    html += '</div></div>';
    document.getElementById('content').innerHTML += html;
  });
}

/* ===============================
   FICHA DE CONTENIDO
================================ */
function openFicha(title, desc, img){
  document.getElementById('content').innerHTML = `
    <div class="row">
      <h2>${title}</h2>
      <img src="${img}" style="width:160px;border-radius:8px;margin-bottom:10px">
      <p>${desc}</p>
      <span class="btn" onclick="playVideo()">▶ Reproducir</span>
      <div id="seasons"></div>
    </div>
  `;
  loadSeasons();
}

/* ===============================
   TEMPORADAS + CAPÍTULOS (DEMO)
================================ */
function loadSeasons(){
  let html = '';
  for(let t=1;t<=3;t++){
    html += `<h3>Temporada ${t}</h3><ul>`;
    for(let c=1;c<=5;c++){
      html += `<li onclick="playVideo()">Capítulo ${c}</li>`;
    }
    html += '</ul>';
  }
  document.getElementById('seasons').innerHTML = html;
}

/* ===============================
   PLAYER
================================ */
function playVideo(){
  document.getElementById('player').style.display = 'block';
  document.getElementById('video').src =
  'https://drive.google.com/file/d/ID_DEL_VIDEO/preview';
}

function closePlayer(){
  document.getElementById('player').style.display = 'none';
  document.getElementById('video').src = '';
}
