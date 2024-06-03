document.addEventListener("DOMContentLoaded", async function () {
  // URL og alternativer for API-forespørselen
  const url =
    "https://api-football-v1.p.rapidapi.com/v3/players?team=33&season=2020";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "42f1d976f5mshe58e3f146ff98eep12fb36jsn5618a484cbe2",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  // Variabel for å lagre alle spillere for filtrering
  let allPlayers = [];

  // Asynkron funksjon for å hente spillere fra API-et
  async function fetchPlayers() {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `Feil med fetching av data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      allPlayers = data.response; // Lagre alle spillere for filtrering
      updatePlayerList(allPlayers); // Initial visning av spillere
    } catch (error) {
      console.error("Feil med fetching av data:", error);
      displayError(error.message);
    }
  };

  // Funksjon for å oppdatere spillerlisten som vises på siden
  function updatePlayerList(players) {
    const container = document.getElementById("player-list-container");
    if (!container) {
      console.error("Finner ikke player list kontainer!");
      return;
    }
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "center";

    if (players && players.length) {
      const list = document.createElement("ul");
      list.style.listStyleType = "none";
      list.style.padding = "0";
      list.style.width = "100%";
      list.style.display = "flex";
      list.style.flexWrap = "wrap";
      list.style.justifyContent = "center";

      players.forEach((player) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Player Name: ${player.player.name}, Position: ${player.statistics[0].games.position}`;
        listItem.style.padding = "10px";
        listItem.style.margin = "10px";
        listItem.style.border = "1px solid #ccc";
        listItem.style.borderRadius = "10px";
        listItem.style.backgroundColor = "yellow";
        listItem.style.width = "200px";
        listItem.style.cursor = "pointer";
        listItem.style.transition = "all 0.3s ease";

        // Endre stil ved mus-over
        listItem.onmouseover = function () {
          this.style.transform = "scale(1.1)";
          this.style.backgroundColor = "#ffcc00";
        };

        // Tilbakestille stil ved mus-ut
        listItem.onmouseout = function () {
          this.style.transform = "none";
          this.style.backgroundColor = "yellow";
        };

        // Lagre valgt spiller i localStorage og navigere til detaljeringssiden
        listItem.onclick = function () {
          localStorage.setItem("selectedPlayer", JSON.stringify(player));
          window.location.href = "detaljer.html";
        };

        list.appendChild(listItem);
      });
      container.appendChild(list);
    } else {
      container.textContent = "No players found";
    }
  }

  // Funksjon for å filtrere spillere basert på posisjon
  function filterPlayers(position) {
    const filteredPlayers = allPlayers.filter(
      (player) => player.statistics[0].games.position === position
    );
    updatePlayerList(filteredPlayers);
  }

  // Opprette og legge til dropdown for posisjonsfiltrering med stil
  const filterContainer = document.createElement("div");
  filterContainer.style.display = "flex";
  filterContainer.style.justifyContent = "left";
  filterContainer.style.margin = "20px 0";

  const filterLabel = document.createElement("label");
  filterLabel.textContent = "Filter by position:";
  filterLabel.style.marginRight = "10px";

  const filterSelect = document.createElement("select");
  filterSelect.style.padding = "10px";
  filterSelect.style.borderRadius = "5px";
  filterSelect.style.outline = "none";
  filterSelect.style.cursor = "pointer";

  // Definere posisjonsalternativer og legge dem til dropdown
  const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Attacker"];
  positions.forEach((pos) => {
    const option = document.createElement("option");
    option.value = pos;
    option.textContent = pos;
    filterSelect.appendChild(option);
  });

  // Oppdatere spillerlisten basert på valgt posisjon
  filterSelect.onchange = function () {
    if (this.value === "All") {
      updatePlayerList(allPlayers);
    } else {
      filterPlayers(this.value);
    }
  };

  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);
  document.body.insertBefore(filterContainer, document.body.firstChild);

  // Funksjon for å vise feilmelding
  function displayError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.style.color = "red";
    document.body.appendChild(errorDiv);
  }

  // Sette sentrert og rød farge på <h1> tag
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.textAlign = "center";
    h1.style.color = "red";
  }

  // Sette bakgrunnsfarge til svart på body
  document.body.style.backgroundColor = "black";

  // Hente spillere når dokumentet er lastet inn
  fetchPlayers();
});
