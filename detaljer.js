document.addEventListener("DOMContentLoaded", function () {
  // Hente spillerdata fra localStorage
  const playerData = localStorage.getItem("selectedPlayer");
  const player = JSON.parse(playerData);

  // Hente elementer fra DOM
  const infoContainer = document.getElementById("player-info");
  const body = document.body;
  const editButton = document.getElementById("editButton");
  const editButtonContainer = document.getElementById("editButtonContainer");

  // Stilisere siden og elementene
  stylePage(body, infoContainer);
  populatePlayerInfo(infoContainer, player);
  styleEditButton(editButton, editButtonContainer);

  // Legge til en klikkevent til redigeringsknappen
  editButton.addEventListener("click", goToEditPage);
});

// Funksjon for å stilisere siden og info-containeren
function stylePage(body, container) {
  body.style.backgroundColor = "black";
  container.style.padding = "20px";
  container.style.margin = "20px auto";
  container.style.maxWidth = "600px";
  container.style.background = "yellow";
  container.style.color = "black";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  container.style.textAlign = "center";
  container.style.fontFamily = "'Arial', sans-serif";
}

// Funksjon for å fylle info-containeren med spillerdata
function populatePlayerInfo(container, player) {
  if (player) {
    // Vise spillerinformasjon hvis tilgjengelig
    container.innerHTML = `
      <h2>${player.player.name}</h2>
      <p><strong>Position:</strong> ${player.statistics[0].games.position}</p>
      <p><strong>Team:</strong> ${player.statistics[0].team.name}</p>
      <p><strong>Age:</strong> ${player.player.age}</p>`;
  } else {
    // Vise melding hvis spillerinformasjon ikke er tilgjengelig
    container.textContent = "No player information available.";
    container.style.backgroundColor = "#333";
    container.style.color = "#eee";
  }
}

// Funksjon for å stilisere redigeringsknappen og dens container
function styleEditButton(button, container) {
  button.style.padding = "10px 15px";
  button.style.fontSize = "16px";
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  container.style.display = "flex";
  container.style.justifyContent = "center";

  // Endre knappens bakgrunnsfarge ved mus-over
  button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "green";
  });

  // Tilbakestille knappens bakgrunnsfarge ved mus-ut
  button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "#4CAF50";
  });
}

// Funksjon for å navigere til Hovedsiden
function goToEditPage() {
  window.location.href = "endre.html"; 
}
