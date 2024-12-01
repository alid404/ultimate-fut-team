  // add player menu toggle 
  
  const addContent = document.querySelector(".player__state");
  const barBtn = document.querySelector(".setting__bar");
  
  barBtn.addEventListener("click", ()=> {
    addContent.classList.toggle("active")
  })
  
  
  const formation = document.querySelector("#formation");
  const squadList = document.querySelector(".squad__list-content");
  
  const savedFormation = localStorage.getItem("formation");
  if (savedFormation) {
    formation.value = savedFormation;
    updateFormationLayout(savedFormation);
  }
  
  // Squad Formation
  formation.addEventListener("change", (e) => {
    const target = e.target.value;
  
    localStorage.setItem("formation", target);
  
    updateFormationLayout(target);
  });

  function updateFormationLayout(target) {
    const attackers = document.querySelector(".attackers");
    const midfielders = document.querySelector(".midifielder");
    switch (target) {
      case "433":
        if (attackers && midfielders) {
          const attackerToMove = midfielders.querySelector(
            "#squad__rat"
          );
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
  
      case "442":
        if (attackers && midfielders) {
          const attackerToMove = attackers.querySelector(
            "#squad__rat"
          );
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
  
  const selectPosition = document.querySelector("#o-player-position");
  const stateLabels = document.querySelectorAll(".player__state-inp label");
  const defaultContent = Array.from(stateLabels).map(
    (label) => label.textContent
  );

  selectPosition.addEventListener("change", (e) => {
    let target = e.target;
    let getValue = target.value;
  
    if (getValue === "gk") {
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
  function validationForm() {
    const nameInput = document.getElementById("o-player-name");
    const name = nameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameError = document.querySelector(".name__error");
  
    const selects = [
      { id: "o-player-nationalite", error: ".nationalite__error" },
      { id: "o-player-club", error: ".club__error" },
      { id: "o-player-league", error: ".league__error" },
      { id: "o-player-position", error: ".position__error" },
    ];
  
    const stats = [
      { id: "o-player-rating", error: ".rating__error" },
      { id: "o-player-pace", error: ".pace__error" },
      { id: "o-player-shooting", error: ".shooting__error" },
      { id: "o-player-passing", error: ".passing__error" },
      { id: "o-player-dribbling", error: ".dribbling__error" },
      { id: "o-player-defending", error: ".defending__error" },
      { id: "o-player-physical", error: ".physical__error" },
    ];
  
    nameError.textContent = "";
    selects.forEach(select => {
      document.querySelector(select.error).textContent = "";
    });
    stats.forEach(stat => {
      document.querySelector(stat.error).textContent = "";
    });
  

        // Validate name
        if (!nameRegex.test(name)) {
          nameError.textContent = "Enter a valid name";
          return false;
        }
      
        // Validate dropdowns
        for (let i = 0; i < selects.length; i++) {
          const select = document.getElementById(selects[i].id);
          if (!select.value || select.value.includes("Nationalite") || select.value.includes("Club") || select.value.includes("League") || select.value.includes("Position")) {
            document.querySelector(selects[i].error).textContent = "Must select option";
            return false;
          }
        }
      
        for (let i = 0; i < stats.length; i++) {
          const statInput = document.getElementById(stats[i].id);
          const statValue = Number(statInput.value);
          console.log(statValue)
          const errorElement = document.querySelector(stats[i].error);
        
          if (!statValue || statValue < 10 || statValue > 99) {
            errorElement.textContent = "must be between 10-99.";
            return false;
          }
        }
      
      
        return true;
      }
      
      // Add player function
      const playerForm = document.querySelector("#player__form");
      const addPlayer = document.querySelector(".add__player-btn");
      const updatePlayer = document.querySelector(".update__player");
      addPlayer.addEventListener("click", (e) => {
        e.preventDefault();
      
        if (!validationForm()) {
          return;
        }
      
      
        const player = {
          occupeid: false,
          id: Date.now().toString(),
          name: document.getElementById("o-player-name").value,
          rating: document.getElementById("o-player-rating").value,
          nationalite: document.getElementById("o-player-nationalite").value,
          club: document.getElementById("o-player-club").value,
          league: document.getElementById("o-player-league").value,
          position: document.getElementById("o-player-position").value,
          pace: document.getElementById("o-player-pace").value,
          shooting: document.getElementById("o-player-shooting").value,
          passing: document.getElementById("o-player-passing").value,
          dribbling: document.getElementById("o-player-dribbling").value,
          defending: document.getElementById("o-player-defending").value,
          physical: document.getElementById("o-player-physical").value,
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
          // location.reload();
          const playerCard = document
            .querySelector(`[data-id="${playerId}"]`)
            .closest(".player__card-pic");
          playerCard.innerHTML = `
          <img src="images/template-1.webp" width="100px" alt=""/>
          `;
        }
      };
      
      const editPlayer = (playerId) => {
        const player = players.find((player) => player.id === playerId);
        if (player) {
          document.getElementById("o-player-name").value = player.name;
          document.getElementById("o-player-nationalite").value = player.nationalite;
          document.getElementById("o-player-club").value = player.club;
          document.getElementById("o-player-league").value = player.league;
          document.getElementById("o-player-position").value = player.position;
          document.getElementById("o-player-pace").value = player.pace;
          document.getElementById("o-player-shooting").value = player.shooting;
          document.getElementById("o-player-passing").value = player.passing;
          document.getElementById("o-player-dribbling").value = player.dribbling;
          document.getElementById("o-player-defending").value = player.defending;
          document.getElementById("o-player-physical").value = player.physical;
          document.getElementById("o-player-rating").value = player.rating;
      
          const addPlayerButton = document.querySelector(".add__player-btn");
          const updatePlayerButton = document.querySelector(".update__player");
          addPlayerButton.style.display = "none";
          updatePlayerButton.style.display = "block";
          addContent.classList.toggle("active")
      
      
          updatePlayer.addEventListener("click", (e) => {
            e.preventDefault();
      
            if (!validationForm()) {
              return;
            }
      
            player.name = document.getElementById("o-player-name").value;
            player.nationalite = document.getElementById(
              "o-player-nationalite"
            ).value;
            player.club = document.getElementById("o-player-club").value;
            player.league = document.getElementById("o-player-league").value;
            player.position = document.getElementById("o-player-position").value;
            player.pace = document.getElementById("o-player-pace").value;
            player.shooting = document.getElementById("o-player-shooting").value;
            player.passing = document.getElementById("o-player-passing").value;
            player.dribbling = document.getElementById("o-player-dribbling").value;
            player.defending = document.getElementById("o-player-defending").value;
            player.physical = document.getElementById("o-player-physical").value;
            player.rating = document.getElementById("o-player-rating").value;
      
            addPlayerButton.style.display = "block";
            updatePlayerButton.style.display = "none";
            savePlayers();
            showPlayerCard();
            location.reload()
            playerForm.reset();
          });
        }
      };
      
      // show player card function

      const showPlayerCard = () => {
        const substitute = document.querySelector("#substitutes__list");
      
        players.forEach((player) => {
          let playerCard = document.createElement("div");
          playerCard.className = "player__card-pic";
          playerCard.setAttribute("draggable", "true");
          playerCard.innerHTML = `
            <img
                          src="./images/template-3.png"
                          width="120px"
                          alt=""
                        />
                        <div class="player__stats">
                          <div class="player__picture">
                            <img src="images/template-3.png" alt="" class="player__picture-sr"/>
                          </div>
                           <div class="player__setting">
                            <div class="setting__icon">
                              <svg
                                id="Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 170.75 181.2"
                                width="30px"
                              >
                                <defs>
                                  <style>
                                    .cls-1 {
                                      fill: #4e28eb;
                                      stroke: #fff;
                                      stroke-width: 7px;
                                    }
                                    .cls-1,
                                    .cls-2 {
                                      stroke-miterlimit: 10;
                                    }
                                    .cls-2,
                                    .cls-3 {
                                      fill: #fff;
                                    }
                                    .cls-2 {
                                      stroke: #231f20;
                                    }
                                  </style>
                                </defs>
                                <polygon
                                  class="cls-1"
                                  points="3.5 33.73 85.37 3.73 167.25 33.73 167.25 147.47 85.37 177.47 3.5 147.47 3.5 33.73"
                                />
                                <path
                                  class="cls-2"
                                  d="M100,68.13"
                                  transform="translate(-14.63 -9.4)"
                                />
                                <circle class="cls-3" cx="85.37" cy="62.6" r="9.18" />
                                <circle class="cls-3" cx="85.37" cy="90.6" r="9.18" />
                                <circle
                                  class="cls-3"
                                  cx="85.37"
                                  cy="118.6"
                                  r="9.18"
                                />
                              </svg>
                            </div>
                            <div class="edit__player-icon st__icon" data-id=${player.id}>
                              <svg
                                id="Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 106.05 105.56"
                                width="13px"
                              >
                                <defs>
                                
                                </defs>
                                <path
                                  class="cls-1"
                                  d="M99.86,68.07"
                                  transform="translate(-46.97 -47.22)"
                                />
                                <path
                                  d="M153,66.05a11.29,11.29,0,0,1-3.55,5.45c-2.87,2.78-5.67,5.65-8.51,8.48-.26.26-.54.52-.74.71L118.67,59.13c.12-.12.34-.37.57-.6l8.12-8.12c4.27-4.25,10-4.25,14.25,0,2.65,2.63,5.24,5.3,7.92,7.9a10.76,10.76,0,0,1,3.5,5.47Z"
                                  transform="translate(-46.97 -47.22)"
                                />
                                <path
                                  d="M79.79,140.83c-7.06-7-14.22-14.18-21.3-21.26L113,65.15l21.25,21.26Z"
                                  transform="translate(-46.97 -47.22)"
                                />
                                <path
                                  d="M52.36,125.6,73.77,147l-6.14,1.51-17,4.12c-2.7.65-4.12-.68-3.52-3.38Q49.72,137.42,52.36,125.6Z"
                                  transform="translate(-46.97 -47.22)"
                                />
                              </svg>
                            </div>
                            <div class="delete__player-icon st__icon" data-id=${player.id}>
                              <svg
                                id="Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 105.68 136.12"
                                width="10px"
                              >
                                <path
                                  class="cls-1"
                                  d="M100,68.13"
                                  transform="translate(-47.16 -31.94)"
                                />
                                <circle
                                  class="cls-2"
                                  cx="52.84"
                                  cy="40.06"
                                  r="9.18"
                                />
                                <circle
                                  class="cls-2"
                                  cx="52.84"
                                  cy="68.06"
                                  r="9.18"
                                />
                                <circle
                                  class="cls-2"
                                  cx="52.84"
                                  cy="96.06"
                                  r="9.18"
                                />
                                <path
                                  d="M119.15,31.94c1.92,2,3.9,3.95,5.75,6a4.53,4.53,0,0,0,3.81,1.56c7.49-.08,15,0,22.46,0h1.67v15H47.16v-15H48.7c7.84,0,15.68,0,23.53,0a2.74,2.74,0,0,0,2.21-.89c1.87-2,3.81-3.83,5.72-5.75a9.27,9.27,0,0,0,.7-.92Z"
                                  transform="translate(-47.16 -31.94)"
                                />
                                <path
                                  d="M54.65,62.29h90.69c0,.51.06.94.06,1.38q0,44.25,0,88.5c0,7.81-4.55,13.79-11.78,15.48a17.51,17.51,0,0,1-3.82.39q-29.78,0-59.55,0c-9,0-15.61-6.44-15.62-15.43q-.09-44.66,0-89.31C54.61,63,54.63,62.7,54.65,62.29Z"
                                  transform="translate(-47.16 -31.94)"
                                />
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
                                    src=./images/${player.nationalite}.png
                                    alt=""
                                    id="player__infos-nationalite"
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