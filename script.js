
// playerForm fucntion
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.team-management .player-creation-form form');
  const addPlayerBtn = document.querySelector('.form-submit button');

  if (!form || !addPlayerBtn) {
    console.error('Form or Add Player button not found');
    return;
  }

  // function to creat or get errors element
  function getOrCreateErrorElement(inputElement) {
    let errorElement = inputElement.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '0.8em';
      errorElement.style.marginTop = '5px';
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
    return errorElement;
  }

  function clearErrorMessages() {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }

  // Validate form for all of the form inputs
  function validateForm() {
    clearErrorMessages();
    let isValid = true;

    const inputs = {
      playerName: form.querySelector('input[name="player-name"]'),
      playerNationality: form.querySelector('input[name="player-nationality"]'),
      playerClub: form.querySelector('input[name="player-club"]'),
      playerLeague: form.querySelector('input[name="player-league"]'),
      playerPosition: form.querySelector('select[name="player-position"]'),
      playerPic: form.querySelector('input[name="player-picture"]'),
      pace: form.querySelector('input[name="player-pace"]'),
      shooting: form.querySelector('input[name="player-shooting"]'),
      passing: form.querySelector('input[name="player-passing"]'),
      dribbling: form.querySelector('input[name="player-dribbling"]'),
      defending: form.querySelector('input[name="player-defending"]'),
      physical: form.querySelector('input[name="player-physical"]')
    };

    const validations = {
      playerName: {
        validate: (value) => value.trim().length >= 2,
        errorMsg: 'Player name must be at least 2 characters long'
      },
      playerNationality: {
        validate: (value) => value.trim() !== '',
        errorMsg: 'Player nationality is required'
      },
      playerClub: {
        validate: (value) => value.trim() !== '',
        errorMsg: 'Player club is required'
      },
      playerLeague: {
        validate: (value) => value.trim() !== '',
        errorMsg: 'Player league is required'
      },
      playerPosition: {
        validate: (value) => value !== 'Position',
        errorMsg: 'Please select a player position'
      },
      pace: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Pace must be a number between 10 and 99'
      },
      shooting: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Shooting must be a number between 10 and 99'
      },
      passing: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Passing must be a number between 10 and 99'
      },
      dribbling: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Dribbling must be a number between 10 and 99'
      },
      defending: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Defending must be a number between 10 and 99'
      },
      physical: {
        validate: (value) => !isNaN(value) && value >= 10 && value <= 99,
        errorMsg: 'Physical must be a number between 10 and 99'
      }
    };

    // Perform validations
    Object.entries(inputs).forEach(([key, input]) => {
      if (input) {
        const value = input.value.trim();
        const validation = validations[key];

        if (validation && !validation.validate(value)) {
          const errorEl = getOrCreateErrorElement(input);
          errorEl.textContent = validation.errorMsg;
          errorEl.style.display = 'block';
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      }
    });

    return isValid;
  }

  // Save player data to local storage
  function savePlayerToLocalStorage(playerData) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(playerData);
    localStorage.setItem('players', JSON.stringify(players));
  }

  addPlayerBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (validateForm()) {
      const playerData = {
        playerName: form.querySelector('input[name="player-name"]').value,
        playerNationality: form.querySelector('input[name="player-nationality"]').value,
        playerClub: form.querySelector('input[name="player-club"]').value,
        playerLeague: form.querySelector('input[name="player-league"]').value,
        playerPosition: form.querySelector('select[name="player-position"]').value,
        pace: form.querySelector('input[name="player-pace"]').value,
        shooting: form.querySelector('input[name="player-shooting"]').value,
        passing: form.querySelector('input[name="player-passing"]').value,
        dribbling: form.querySelector('input[name="player-dribbling"]').value,
        defending: form.querySelector('input[name="player-defending"]').value,
        physical: form.querySelector('input[name="player-physical"]').value
      };

      const playerPicInput = form.querySelector('input[name="player-picture"]');
      if (playerPicInput.files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = function() {
          playerData.playerPic = reader.result;
          savePlayerToLocalStorage(playerData);
          alert('Player added successfully!');
          form.reset();
          clearErrorMessages();
          updateSubstitutesList();
        };
        reader.readAsDataURL(playerPicInput.files[0]);
      } else {
        savePlayerToLocalStorage(playerData);
        alert('Player added successfully!');
        form.reset();
        clearErrorMessages();
        updateSubstitutesList();
      }
    }
  });

  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        const errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
        }
      }
    });
  });
});

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

// function to change the formation of players 
document.addEventListener('DOMContentLoaded', () => {
  const formation = document.querySelector('.team-formation select');
  const playerRoster = document.querySelector('.player-roster-content');

  if (!formation || !playerRoster) {
    console.error('Formation selector or player roster not found');
    return;
  }

  formation.addEventListener('change', (e) => {
    const selectedFormation = e.target.value;

    switch (selectedFormation) {
      case '4-3-3':
        playerRoster.style.gridTemplateAreas = `
          ". left-attacking-winger left-attacking-winger forward forward right-attacking-winger right-attacking-winger ."
          ". left-center-midfielder left-center-midfielder defensive-midfielder defensive-midfielder right-center-midfielder right-center-midfielder ."
          "left-back left-back center-left-back center-left-back center-right-back center-right-back right-back right-back"
          ". . . goalkeeper goalkeeper . . ."
        `;
        playerRoster.style.gridTemplateColumns = 'repeat(8, 1fr)';
        break;
      
      case '3-5-2':
        playerRoster.style.gridTemplateAreas = `
          ". . . forward forward right-attacking-winger right-attacking-winger . . ."
          "left-attacking-winger left-attacking-winger left-center-midfielder left-center-midfielder defensive-midfielder defensive-midfielder right-center-midfielder right-center-midfielder center-right-back center-right-back"
          ". . left-back left-back center-left-back center-left-back right-back right-back . ."
          ". . . . goalkeeper goalkeeper . . . ."
        `;
        playerRoster.style.gridTemplateColumns = 'repeat(10, 1fr)';
        break;
      
      default:
        console.warn('Unknown formation selected');
    }
  });
});

