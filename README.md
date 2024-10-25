<p align="center">
   <a href="http://nestjs.com/" target="blank"><img src="https://github.com/user-attachments/assets/573f1a2b-9f5f-4f30-b516-faeb446dd9c4" width="200" alt="Tamnoon.io Logo" /></a>
</p>

# Tamnoon Take-Home Assignment

This project is a React-based web application that displays and allows the editing of asset data.

## Project Overview

The application renders a collection of assets in a table format with the following columns:

- Id
- Asset Name
- Owner Name
- Is Crown Jewel

Users can view the assets and edit the "Is Crown Jewel" field. The application supports two modes: view mode and edit mode. Changes to the "Is Crown Jewel" field persist across page refreshes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the project, follow these steps:

1. Clone the repository:
   `git clone https://github.com/ozshimon21/tamnoon-take-home-assignment.git`

2. Navigate to the project directory:
   `cd tamnoon-take-home-assignment`

3. Install the dependencies:
   `npm install`

## Running the Application

To run the application in development mode, use the following command:

`npm run dev`

This will start the development server. Open [http://localhost:4200](http://localhost:4200) to view the application in your browser.

## Running the Tests

`npm run test`

This will launch the test runner in interactive watch mode.

`npm run test:ui`

This will open dev server under the hood when running the tests. Open [http://localhost:51204/**vitest**/](http://localhost:51204/__vitest__/) to view the Vitest UI.

To run the tests, use the following command:
interactive mode: `npm run test`
with UI: `npm run test:UI`

## Building for Production

To build the app for production, use:

`npm run build`

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

## Features

1. Display assets in a table format.
2. Edit "Is Crown Jewel" field for each asset.
3. Support for view and edit modes.
4. Multi-row editing in a single save operation.
5. Persistence of changes across page refreshes - local storage.

## Technologies Used

- React
- TypeScript
- [MUI UI Library](https://mui.com/)
- [AG Grid](https://www.ag-grid.com/react-data-grid/getting-started/)
- Vite (for build tooling)
- Vitest (for testing)
- React Testing Library

## Notes

- The application fetches data from the provided GitHub repository: https://github.com/tamnoon-io/webinterviews.
- API endpoint: https://raw.githubusercontent.com/tamnoon-io/webinterviews/refs/heads/main/assets.json
- No modifications were made to the original JSON file as per the instructions

## Contact

If you have any questions or need further clarification, please contact me at [ozshimon21@gmail.com](ozshimon21@gmail.com).

Thank you for reviewing this project!
