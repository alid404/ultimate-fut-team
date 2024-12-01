// Add player menu toggle
const addPlayerMenu = document.querySelector(".player__state");

const formationSelect = document.querySelector("#team-formation");
const squadList = document.querySelector(".squad__list-content");

const savedFormation = localStorage.getItem("formation");
if (savedFormation) {
    formationSelect.value = savedFormation;
    updateFormationLayout(savedFormation);
}

// Squad Formation
formationSelect.addEventListener("change", (e) => {
    const selectedFormation = e.target.value;

    localStorage.setItem("formation", selectedFormation);
    updateFormationLayout(selectedFormation);
});

function updateFormationLayout(selectedFormation) {
    const attackers = document.querySelector(".attackers");
    const midfielders = document.querySelector(".midifielder");
    switch (selectedFormation) {
        case "4-3-3":
            if (attackers && midfielders) {
                const attackerToMove = midfielders.querySelector("#squad__rat");
                if (attackerToMove) {
                    midfielders.removeChild(attackerToMove);
                    attackers.appendChild(attackerToMove);
                    attackers.style.gridTemplateColumns = "repeat(3, 1fr)";
                    midfielders.style.gridTemplateColumns = "repeat(3, 1fr)";
                } else {
                    console.error("No attackers available to move.");
                }
            } else {
                console.error("Attackers or Midfielders div not found.");
            }
            break;

        case "4-4-2":
            if (attackers && midfielders) {
                const attackerToMove = attackers.querySelector("#squad__rat");
                if (attackerToMove) {
                    attackers.removeChild(attackerToMove);
                    midfielders.appendChild(attackerToMove);
                    attackers.style.gridTemplateColumns = "repeat(2, 1fr)";
                    midfielders.style.gridTemplateColumns = "repeat(4, 1fr)";
                } else {
                    console.error("No attackers available to move.");
                }
            } else {
                console.error("Attackers or Midfielders div not found.");
            }
            break;
    }
}

let players = JSON.parse(localStorage.getItem("players")) || [];

const savePlayers = () => {
    localStorage.setItem("players", JSON.stringify(players));
};

const positionSelect = document.querySelector("#player-position");
const stateLabels = document.querySelectorAll(".player__state-inp label");
const defaultContent = Array.from(stateLabels).map(
    (label) => label.textContent
);

positionSelect.addEventListener("change", (e) => {
    let selectedPosition = e.target.value;

    if (selectedPosition === "goalkeeper") {
        const convert = [
            "Diving",
            "Handling",
            "Kicking",
            "Reflexes",
            "Speed",
            "Positioning",
        ];
        stateLabels.forEach((label, index) => {
            if (index < convert.length) {
                label.textContent = convert[index];
            }
        });
    } else {
        stateLabels.forEach((label, index) => {
            label.textContent = defaultContent[index];
        });
    }
});

// Form validation function
function validateForm() {
    const nameInput = document.getElementById("player-full-name");
    const name = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameError = document.querySelector(".name__error");

    const selects = [
        { id: "player-nationality", error: ".nationality__error" },
        { id: "player-club", error: ".club__error" },
        { id: "player-league", error: ".league__error" },
        { id: "player-position", error: ".position__error" },
    ];

    const stats = [
        { id: "player-rating", error: ".rating__error" },
        { id: "player-pace", error: ".pace__error" },
        { id: "player-shooting", error: ".shooting__error" },
        { id: "player-passing", error: ".passing__error" },
        { id: "player-dribbling", error: ".dribbling__error" },
        { id: "player-defending", error: ".defending__error" },
        { id: "player-physical", error: ".physical__error" },
    ];

    nameError.textContent = "";
    selects.forEach(select => {
        document.querySelector(select.error).textContent = "";
    });
    stats.forEach(stat => {
        document.querySelector(stat.error).textContent = "";
    });

    // Validate name ```javascript
    if (!nameRegex.test(name)) {
        nameError.textContent = "Enter a valid name";
        return false;
    }

    // Validate dropdowns
    for (let i = 0; i < selects.length; i++) {
        const select = document.getElementById(selects[i].id);
        if (!select.value || select.value.includes("Nationality") || select.value.includes("Club") || select.value.includes("League") || select.value.includes("Position")) {
            document.querySelector(selects[i].error).textContent = "Must select option";
            return false;
        }
    }

    for (let i = 0; i < stats.length; i++) {
        const statInput = document.getElementById(stats[i].id);
        const statValue = Number(statInput.value);
        const errorElement = document.querySelector(stats[i].error);

        if (!statValue || statValue < 10 || statValue > 99) {
            errorElement.textContent = "must be between 10-99.";
            return false;
        }
    }

    return true;
}

// Add player function
const playerForm = document.querySelector("#playerForm");
const addPlayerButton = document.querySelector("#add-player-button");
const updatePlayerButton = document.querySelector(".update__player");

addPlayerButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const player = {
        occupied: false,
        id: Date.now().toString(),
        name: document.getElementById("player-full-name").value,
        rating: document.getElementById("player-rating").value,
        nationality: document.getElementById("player-nationality").value,
        club: document.getElementById("player-club").value,
        league: document.getElementById("player-league").value,
        position: document.getElementById("player-position").value,
        pace: document.getElementById("player-pace").value,
        shooting: document.getElementById("player-shooting").value,
        passing: document.getElementById("player-passing").value,
        dribbling: document.getElementById("player-dribbling").value,
        defending: document.getElementById("player-defending").value,
        physical: document.getElementById("player-physical").value,
    };

    players.push(player);
    savePlayers();
    showPlayerCard();
    playerForm.reset();
    location.reload();
});

const deletePlayer = (playerId) => {
    const playerIndex = players.findIndex((player) => player.id === playerId);
    if (playerIndex !== -1) {
        players.splice(playerIndex, 1);
        savePlayers();
        const playerCard = document.querySelector(`[data-id="${playerId}"]`).closest(".player__card-pic");
        playerCard.innerHTML = `
        <img src="pictures/template-3.png" width="100px" alt=""/>
        `;
    }
};

const editPlayer = (playerId) => {
    const player = players.find((player) => player.id === playerId);
    if (player) {
        document.getElementById("player-full-name").value = player.name;
        document.getElementById("player-nationality").value = player.nationality;
        document.getElementById("player-club").value = player.club;
        document.getElementById("player-league").value = player.league;
        document.getElementById("player-position").value = player.position;
        document.getElementById("player-pace").value = player.pace;
        document.getElementById("player-shooting").value = player.shooting;
        document.getElementById("player-passing").value = player.passing;
        document.getElementById("player-dribbling").value = player.dribbling;
        document.getElementById("player-defending").value = player.defending;
        document.getElementById("player-physical").value = player.physical;
        document.getElementById("player-rating").value = player.rating;

        const addPlayerButton = document.querySelector("#add-player-button");
        const updatePlayerButton = document.querySelector(".update__player");
        addPlayerButton.style.display = "none";
        updatePlayerButton.style.display = "block";

        updatePlayerButton.addEventListener("click", (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            player.name = document.getElementById("player-full-name").value;
            player.nationality = document.getElementById("player-nationality").value;
            player.club = document.getElementById("player-club").value;
 player.league = document.getElementById("player-league").value;
            player.position = document.getElementById("player-position").value;
            player.pace = document.getElementById("player-pace").value;
            player.shooting = document.getElementById("player-shooting").value;
            player.passing = document.getElementById("player-passing").value;
            player.dribbling = document.getElementById("player-dribbling").value;
            player.defending = document.getElementById("player-defending").value;
            player.physical = document.getElementById("player-physical").value;
            player.rating = document.getElementById("player-rating").value;

            addPlayerButton.style.display = "block";
            updatePlayerButton.style.display = "none";
            savePlayers();
            showPlayerCard();
            location.reload();
            playerForm.reset();
        });
    }
};

// Show player card function
const showPlayerCard = () => {
    const substitutesList = document.querySelector("#substitutes__list");

    players.forEach((player) => {
        let playerCard = document.createElement("div");
        playerCard.className = "player__card-pic";
        playerCard.setAttribute("draggable", "true");
        playerCard.innerHTML = `
            <img src="./pictures/template-3.png" width="120px" alt="" />
            <div class="player__stats">
                <div class="player__picture">
                    <img src="./pictures/template-3.png" alt="" class="player__picture-sr"/>
                </div>
                <div class="player__setting">
                    <div class="edit__player-icon" data-id=${player.id}>
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.05 105.56" width="13px">
                            <path class="cls-1" d="M99.86,68.07" />
                            <path d="M153,66.05a11.29,11.29,0,0,1-3.55,5.45c-2.87,2.78-5.67,5.65-8.51,8.48..." />
                        </svg>
                    </div>
                    <div class="delete__player-icon" data-id=${player.id}>
                        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.68 136.12" width="10px">
                            <path class="cls-1" d="M100,68.13" />
                            <circle class="cls-2" cx="52.84" cy="40.06" r="9.18" />
                        </svg>
                    </div>
                </div>
                <div class="player__rating">
                    <div class="player__rating-rate">${player.rating}</div>
                    <div class="player__rating-position">${player.position}</div>
                </div>
                <div class="player__infos">
                    <div class="player__infos-name">
                        <span>${player.name}</span>
                    </div>
                    <div class="player__infos-stats">
                        <ul>
                            <li><span>PAC</span><span>${player.pace}</span></li>
                            <li><span>SHO</span><span>${player.shooting}</span></li>
                            <li><span>PAS</span><span>${player.passing}</span></li>
                            <li><span>DRI</span><span>${player.dribbling}</span></li>
                            <li><span>DEF</span><span>${player.defending}</span></li>
                            <li><span>PHY</span><span>${player.physical}</span></li>
                          </ul>
                        </div>
                        <div class="player__infos-row">
                          <ul>
                            <li>
                              <img
                                src="./images/${player.nationality}.png"
                                alt=""
                                id="player__infos-nationality"
                              />
                            </li>
                            <li>
                              <img
                                src="./images/${player.league}.png"
                                alt=""
                                id="player__infos-league"
                              />
                            </li>
                            <li>
                              <img
                                src="./images/${player.club}.png"
                                alt=""
                                id="player__infos-club"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
      `;

      const playerPosition = (positionId, playerCard) => {
        const positionElement = document.getElementById(positionId);
        if (positionElement.classList.contains("active")) {
          substitutesList.appendChild(playerCard);
        } else {
          player.occupied = true; // Mark as occupied
          positionElement.classList.add("active");
          positionElement.innerHTML = "";
          positionElement.appendChild(playerCard);
        }
      };

      switch (player.position) {
        case "gk":
          playerPosition("squad__gk", playerCard);
          const courtois = document.querySelector("#squad__gk .player__picture-sr");
          courtois.src = "./images/courtois.webp";
          break;
        case "clb":
          playerPosition("squad__clb", playerCard);
          const alaba = document.querySelector("#squad__clb .player__picture-sr");
          alaba.src = "./images/alaba.webp";
          break;
        case "crb":
          playerPosition("squad__crb", playerCard);
          const eder = document.querySelector("#squad__crb .player__picture-sr");
          eder.src = "./images/eder.webp";
          break;
        case "lb":
          playerPosition("squad__lb", playerCard);
          const davies = document.querySelector("#squad__lb .player__picture-sr");
          davies.src = "./images/davies.webp";
          break;
        case "rb":
          playerPosition("squad__rb", playerCard);
          const arnlod = document.querySelector("#squad__rb .player__picture-sr");
          arnlod.src = "./images/arnlod.webp";
          break;
        case "rcm":
          playerPosition("squad__rcm", playerCard);
          const valverde = document.querySelector("#squad__rcm .player__picture-sr");
          valverde.src = "./images/valverde-2.webp";
          break;
        case "lcm":
          playerPosition("squad__lcm", playerCard);
          const modric = document.querySelector("#squad__lcm .player__picture-sr");
          modric.src = "./images/modric.webp";
          break;
        case "am":
          playerPosition("squad__cdm", playerCard);
          const jude = document.querySelector("#squad__cdm .player__picture-sr");
          jude.src = "./images/jude.webp";
          break;
        case "lw":
          playerPosition("squad__lat", playerCard);
          const vini = document.querySelector("#squad__lat .player__picture-sr");
          vini.src = "./images/vini.webp";
          break;
        case "rw":
          playerPosition("squad__rat", playerCard);
          const rodrygo = document.querySelector("#squad__rat .player__picture-sr");
          rodrygo.src = "./images/rodrygo.webp";
          break;
        case "cf":
          playerPosition("squad__fat", playerCard);
          const mbappe = document.querySelector("#squad__fat .player__picture-sr");
          mbappe.src = "./images/mbappe.webp";
          break;
      }

      // Delete player event
      const deleteBtn = playerCard.querySelector(".delete__player-icon");
      deleteBtn.addEventListener("click", () => delete Player(player.id));

      // Edit player event
      const editBtn = playerCard.querySelector(".edit__player-icon");
      editBtn.addEventListener("click", () => editPlayer(player.id));
    });

  showPlayerCard();

  // Drag and drop functionality using Sortable.js library
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize Sortable for defenders
    const dropItems = document.querySelector(".defenders");
    if (dropItems) {
      new Sortable(dropItems, {
        animation: 350,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: "shared",
        swap: true,
      });
    }

    // Initialize Sortable for midfielders
    const midifielder = document.querySelector(".midifielder");
    if (midifielder) {
      new Sortable(midifielder, {
        animation: 350,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: "shared",
        swap: true,
      });
    }

    // Initialize Sortable for attackers
    const attackers = document.querySelector(".attackers");
    if (attackers) {
      new Sortable(attackers, {
        animation: 350,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: "shared",
        swap: true,
      });
    }

    // Initialize Sortable for the pitch
    const pitch = document.querySelector("#substitutes__list");
    if (pitch) {
      new Sortable(pitch, {
        animation: 400,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: "shared",
        swap: true,
      });
    }
    const goalkeeper = document.querySelector(".goalkeeper");
    if (goalkeeper) {
      new Sortable(goalkeeper, {
        animation: 400,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: "shared",
        swap: true,
      });
    }
  });
 ⬤