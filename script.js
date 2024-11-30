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
  //##########################//


// substitute function manager 
document.addEventListener('DOMContentLoaded', () => {
  function updateSubstitutesList() {
    const substitutesList = document.querySelector('.substitutes-list');
    
    if (!substitutesList) {
      console.error('Substitutes list container not found');
      return;
    }
    substitutesList.innerHTML = '';

    const players = JSON.parse(localStorage.getItem('players')) || [];

    players.slice(0, 10).forEach(player => {
      const substituteSlot = document.createElement('div');
      substituteSlot.classList.add('substitute-player');
      
      const playerImg = document.createElement('img');
      playerImg.src = player.playerPic || 'pictures/template-3.png';
      playerImg.width = 70;
      playerImg.alt = player.playerName;
      
      substituteSlot.appendChild(playerImg);
      substitutesList.appendChild(substituteSlot);
    });

    while (substitutesList.children.length < 10) {
      const emptySlot = document.createElement('div');
      emptySlot.classList.add('substitute-player');
      
      const placeholderImg = document.createElement('img');
      placeholderImg.src = 'pictures/template-3.png';
      placeholderImg.width = 70;
      placeholderImg.alt = 'Empty Substitute Slot';
      
      emptySlot.appendChild(placeholderImg);
      substitutesList.appendChild(emptySlot);
    }
  }

  updateSubstitutesList();

  window.addEventListener('storage', updateSubstitutesList);

  window.updateSubstitutesList = updateSubstitutesList;
});



