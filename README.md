# Documents List App

## Overview

This project is a web application designed to display a list of documents associated with a customer account. Each document includes a name, a list of contributors, a version number, and a list of attachments. The application supports real-time notifications for new document creations and provides options for sorting and viewing documents.

## Features

### Required Features
- **Display Recent Documents:** Users can view the most recent documents created, either in a list view or a grid view.
- **Real-Time Notifications:** Users receive notifications when a new document is created by other users.
- **Document Creation:** Users can create new documents, which will be displayed in the list immediately.
- **Sorting Options:** Documents can be sorted by name, version, or creation date.
- **Data Handling:** Document data is fetched from a JSON API, and real-time notifications are handled through a WebSocket connection.

### Optional Features
- **Offline Support:** Allow the application to function without an internet connection.
- **Box Notifications:** Enhance user notifications with visual cues.
- **Relative Date Display:** Show document creation dates in a relative format (e.g., "1 day ago").

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SCSS77/documents-list-app
   cd documents-list-app
   ```

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application:**
   To start the development server, use:
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

## Development

### Application Structure
The application is structured to facilitate maintainability and scalability. Key directories include:
- `src/`: Contains the main application code.
- `components/`: Reusable UI components.
- `services/`: API and WebSocket service implementations.
- `tests/`: Automated tests for components and services.

### Technologies Used
- **JavaScript/TypeScript:** The main programming languages used for developing the application.
- **HTML/CSS:** For structuring and styling the application.
- **Vite:** For a fast development environment and build tool.
- **Jest:** For running automated tests.
- **WebSocket API:** For real-time notifications.
- **Fetch API:** For interacting with the JSON API.

### Testing
To run the tests, execute:
```bash
npm test
```
This will run all unit and integration tests to ensure the correctness of the application.

### Libraries Used
- **Lodash:** For utility functions.
- **Axios:** For making HTTP requests (if applicable).
- **Moment.js:** For date formatting (if applicable).

## Server Integration

### Data Sources
The application integrates with the following data sources:
- **JSON API:** For fetching document data.
- **WebSocket:** For receiving real-time notifications regarding document creation.

Make sure to set up and integrate with the testing server found in the `server` directory.

### Example API Calls
- **Fetch Documents:**
  ```http
  GET /api/documents
  ```
- **WebSocket Notification:**
  Connect to the WebSocket server to listen for new document notifications.

## Notes on Libraries
While no frameworks such as React or Angular are used, third-party libraries may be included to simplify development or testing. Each library will be documented in the codebase, including reasons for its inclusion and alternative considerations.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Be sure to follow the code style and testing practices used in the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Conclusion

This application has been developed with maintainability and scalability in mind. We aim for well-organized code and thorough testing practices to ensure a robust solution. Thank you for your interest in this project!