
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

  