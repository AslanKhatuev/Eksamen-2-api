document.addEventListener("DOMContentLoaded", function () {
  // Hente spillerdata fra localStorage
  const playerData = localStorage.getItem("selectedPlayer");
  const player = JSON.parse(playerData);

  // Fylle ut skjemafelt med spillerdata hvis tilgjengelig
  if (player) {
    document.getElementById("name").value = player.player.name;
    document.getElementById("position").value =
      player.statistics[0].games.position;
    document.getElementById("team").value = player.statistics[0].team.name;
    document.getElementById("age").value = player.player.age;
  }

  // Stilisere siden
  stylePage();
});

// Funksjon for å stilisere siden
function stylePage() {
  document.body.style.fontFamily =
    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  document.body.style.backgroundColor = "black";
  document.body.style.padding = "20px";

  const container = document.getElementById("edit-container");
  container.style.maxWidth = "600px";
  container.style.margin = "0 auto";
  container.style.backgroundColor = "yellow";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  container.style.padding = "20px";

  styleForm();
  styleButtons();
}

// Funksjon for å stilisere skjemafelter
function styleForm() {
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.style.display = "block";
    label.style.marginBottom = "8px";
    label.style.color = "#333";
    label.style.fontSize = "16px";
  });

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.style.width = "100%";
    input.style.padding = "5px";
    input.style.marginBottom = "10px";
    input.style.borderRadius = "4px";
    input.style.border = "1px solid #ccc";
  });
}

// Funksjon for å stilisere knapper
function styleButtons() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.backgroundColor = "#007BFF";
    button.style.color = "white";
    button.style.padding = "10px 15px";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";
    button.style.fontSize = "16px";
    button.style.marginRight = "10px";

    // Endre bakgrunnsfarge ved mus-over
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#0056b3";
    });

    // Tilbakestille bakgrunnsfarge ved mus-ut
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#007BFF";
    });
  });
}

// Funksjon for å lagre endringer
function saveChanges() {
  // Oppdatere spillerobjekt med nye verdier fra skjema
  const updatedPlayer = {
    player: {
      name: document.getElementById("name").value,
      age: parseInt(document.getElementById("age").value),
    },
    statistics: [
      {
        games: {
          position: document.getElementById("position").value,
        },
        team: {
          name: document.getElementById("team").value,
        },
      },
    ],
  };

  // Oppdatere localStorage
  localStorage.setItem("selectedPlayer", JSON.stringify(updatedPlayer));

  // Sende data til serveren via API
  fetch("https://crudapi.co.uk/app/upLoad", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer VQFEfp3J5JMFnluXgYW1bwJfB1orB2DSBIEd2I_dm9gNoK7RlA",
    },
    body: JSON.stringify(updatedPlayer),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Endringer lagret!");
      window.location.href = "endre.html"; // Gå tilbake til redigeringssiden
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Endringer ble ikke lagret til Database!");
    });
}

// Funksjon for å gå tilbake til spillerlisten
function goHome() {
  window.location.href = "players.html"; // Navigere til spillerlisten
}
