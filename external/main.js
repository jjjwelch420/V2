const gamesJsonPath = window.PATHS.games;

if (!gamesJsonPath) {
  document.body.innerHTML = "<h1>paths.js missing or invalid</h1>";
  throw new Error("paths.js did not define window.PATHS.games");
}

const params = new URLSearchParams(window.location.search);
const page = params.get("page");

const launcherDiv = document.getElementById("launcher");
const resultsDiv = document.getElementById("results");
const searchInput = document.getElementById("search");

let allGames = [];

fetch(gamesJsonPath)
  .then(res => res.json())
  .then(games => {
    allGames = games;

    if (!page) {
      renderButtons(allGames);
      setupSearch();
    } else {
      loadGamePage(games, page);
    }
  });

function setupSearch() {
  searchInput.oninput = () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allGames.filter(g =>
      g.display.toLowerCase().includes(term) ||
      g.id.toLowerCase().includes(term)
    );
    renderButtons(filtered);
  };
}

function renderButtons(list) {
  resultsDiv.innerHTML = "";

  list.forEach(game => {
    const btn = document.createElement("button");
    btn.textContent = game.display;
    btn.onclick = () => openPage(game.id);
    resultsDiv.appendChild(btn);
  });
}

function loadGamePage(games, pageId) {
  const game = games.find(g => g.id === pageId);

  if (!game) {
    document.body.innerHTML = "<h1>Invalid page</h1>";
    return;
  }

  launcherDiv.remove();

  const frameDiv = document.createElement("div");
  frameDiv.className = "frame-container";
  document.body.appendChild(frameDiv);

  const iframe = document.createElement("iframe");
  iframe.id = "launcher-game-frame-9a3f2b";   // ← ★ ONLY CHANGE ADDED ★
  iframe.tabIndex = -1;
  frameDiv.appendChild(iframe);

  fetch(game.url)
    .then(res => res.text())
    .then(html => {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    })
    .catch(err => {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write("<h1>Failed to load page</h1><pre>" + err + "</pre>");
      doc.close();
    });
}

function openPage(id) {
  const newUrl =
    window.location.origin +
    window.location.pathname +
    "?page=" + id;

  window.open(newUrl, "_blank");
}
