document.addEventListener("DOMContentLoaded", async function () {
  const url = "https://api-football-v1.p.rapidapi.com/v3/players/squads?team=33";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "42f1d976f5mshe58e3f146ff98eep12fb36jsn5618a484cbe2",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

try {
    // venter på svaret fra fetch forespørsel
const response = await fetch(url, options);
    // etter at svaret er mottatt så venter den på at det konverteres til JSON
const data = await response.json();
const teamList = document.getElementById("team-list");
    // Styler og setter opp flexbox container
    teamList.style.display = "flex";
    teamList.style.flexDirection = "column";
    teamList.style.alignItems = "center";
    teamList.style.width = "100%";
    teamList.style.maxWidth = "600px";
    teamList.style.margin = "auto";
    // Styler h1 tag (Players List).
    const heading = document.querySelector("h1");
    heading.style.textAlign = "center";
    heading.style.width = "100%";
    heading.style.color = "red";

    // Styler bakgrunnsfarge
    document.body.style.backgroundColor = "black";
    // Lager div element og styler den // lister ut data med forEach.
    data.response[0].players.forEach((player) => {
      const div = document.createElement("div");
      div.innerHTML = `${player.name} - ${player.position}`;
      div.style.cursor = "pointer";
      div.style.background = "rgba(237, 233, 10, 0.89)";
      div.style.border = "1px solid #ddd";
      div.style.margin = "5px";
      div.style.padding = "10px";
      div.style.width = "100%";
      div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      div.style.borderRadius = "5px";
      div.style.transition = "transform 0.2s ease-in-out";
      // Styler hover effekten
      div.onmouseover = function () {
        this.style.transform = "scale(1.05)";
      };
      div.onmouseout = function () {
        this.style.transform = "none";
      };

      // Med onclick lagrer jeg data i lokal lagringsplass
      div.onclick = function () {
        localStorage.setItem("selectedPlayer", JSON.stringify(player));
        window.location.href = "detaljer.js";
      };

      teamList.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
