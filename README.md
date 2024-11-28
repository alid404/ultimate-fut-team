# FUT Team Builder

## Project Overview

The FUT Team Builder allows users to create their custom Ultimate Team (FUT) by adding, positioning, and modifying players while respecting tactical formations like 3-5-2 or 4-3-3. The application focuses on providing an interactive experience with dynamic forms, localStorage data management, and an engaging interface for users to manage their team efficiently.

## Key Features

- **Dynamic Player Addition**: Users can add players via a form, including fields for name, position, rating, and other relevant stats.
  
- **Tactical Formation Support**: The app supports predefined tactical formations, including:
  - **4-3-3**: 1 GK, 2 CB, 1 LB, 1 RB, 3 CM, 1 LW, 1 RW, 1 ST

  Players will be positioned according to the selected formation, with automatic adjustments.

- **Player Card Management**: Users can add, modify, and delete player cards. The team is limited to 11 main players, with additional players reserved for substitutions.

- **Form Field Validation**: All player input fields (name, position, rating) are validated to ensure data consistency.

- **LocalStorage Support**: Team and player data are saved to localStorage, allowing users to retrieve their team setup when reopening the app.

- **Dynamic Formation Change**: The layout and player positions update automatically when changing the selected tactical formation.

- **Responsive Design**: The app is designed to be responsive, ensuring optimal user experience across different screen sizes (desktop, tablet, mobile).

## Technologies Used

- **HTML**: For structuring the application.
- **CSS**: Native CSS or CSS framework (e.g., Tailwind CSS, Bootstrap) for styling.
- **JavaScript**: Vanilla JS for dynamic content and interaction.
- **localStorage**: For storing player and formation data locally.

## User Stories

### 1. Creating an 11-Player Team
- **As a user**, I want to add players to my formation via a dynamic form with a maximum of 11 players.
- **Acceptance Criteria**:
  - A form to add players with necessary fields.
  - Modify or delete added players.
  - Data validation for player input.

### 2. Adapting the Chosen Formation
- **As a user**, I want to change my team’s formation and see the positions of the players adjust accordingly.
- **Acceptance Criteria**:
  - Choose from predefined formations (e.g., 4-4-2, 4-3-3).
  - Player positions are updated automatically.

### 4. Saving and Retrieving Data
- **As a user**, I want my team and formation data to be saved automatically.
- **Acceptance Criteria**:
  - Data is stored locally and retrieved when the app loads.

### 5. Dynamic Form for Players
- **As a user**, I want to dynamically add new players through the interface.
- **Acceptance Criteria**:
  - A form that allows adding new players with validation.

## Installation

1. Clone this repository to your local machine

2. Open the project folder and open `index.html` in your browser.

3. The application should be fully functional with no additional setup required.

## Usage

- **Adding Players**: Use the dynamic form to add players to your formation. Input player details like name, position, and rating.
- **Choosing Formation**: Select your desired tactical formation (e.g., 4-3-3, 4-4-2) and watch the player positions adjust accordingly.
- **Team Chemistry**: The chemistry score will update as you modify your team based on player compatibility.
- **Data Persistence**: Your team and formation will be saved and can be retrieved when reopening the app.


## Contributing

If you'd like to contribute to the development of this project, feel free to fork the repository and submit a pull request. Please ensure your contributions align with the project's goals and code style.

## License

This project is open source and available under the [MIT License](LICENSE).

---

By following this README, you should have a clear understanding of how to use, contribute to, and maintain the FUT Team Builder project.
