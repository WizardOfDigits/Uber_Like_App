# Ride-Hailing Application

This is a ride-hailing application that allows users to request rides and drivers to accept them. The app provides an interface for both drivers and passengers to interact, including location-based services, vehicle selection, and live ride tracking.

## Table of Contents
1. [Interface ScreenShot](#interface-screenshot)
   - [Authentication Section](#authentication-section)
   - [User Home and Profile Page](#user-home-and-profile-page)
   - [Driver Profile Section](#driver-profile-section)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Environment Variables](#environment-variables)
   - [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
   - [Backend](#backend)
   - [Frontend](#frontend)
6. [Socket Communication](#socket-communication)
7. [License](#license)
8. [Acknowledgements](#acknowledgements)

---
## Interface ScreenShot

### Authentication Section
<details>
  <summary>Click to view Auth Section image</summary>
  <div style="display: flex; justify-content: space-around; gap: 20px;">
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/login_page.png?raw=true" alt="Auth Section" width="30%" style="height: 400px; object-fit: cover;" />
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/signup_page.png?raw=true" alt="Auth Section" width="30%" style="height: 400px; object-fit: cover;" />
  </div>
</details>

### User Home and Profile Page
<details>
  <summary>Click to view Home Page image</summary>
  <div style="display: flex; justify-content: space-around; gap: 20px;">
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/home_page.png?raw=true" alt="Home Page" width="30%" style="height: 400px; object-fit: cover;" />
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/find-ride.png?raw=true" alt="Home Page" width="30%" style="height: 400px; object-fit: cover;" />
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/choose-vehicle.png?raw=true" alt="Home Page" width="30%" style="height: 400px; object-fit: cover;" />
  </div>
</details>

### Driver Profile Section
<details>
  <summary>Click to view Profile Section image</summary>
  <div style="display: flex; justify-content: space-around; gap: 20px;">
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/new-ride-notification.png?raw=true" alt="Profile Section" width="30%" style="height: 400px; object-fit: cover;" />
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/confirm-ride.png?raw=true" alt="Profile Section" width="30%" style="height: 400px; object-fit: cover;" />
    <img src="https://github.com/WizardOfDigits/Uber_Like_App/blob/main/project_images/finish-ride-notification.png?raw=true" alt="Profile Section" width="30%" style="height: 400px; object-fit: cover;" />
  </div>
</details>


---

## Features

- **Location Search**: Users can search for pickup and destination locations using real-time suggestions.
- **Vehicle Selection**: Allows users to select their preferred vehicle type (e.g., motorcycle, car, bullcart) after getting the fare estimate.
- **Ride Creation**: Users can create a ride by selecting pickup, destination, and vehicle type.
- **Driver Interaction**: Drivers can accept rides and update their location in real-time.
- **Real-time Updates**: The app uses Socket.IO for live communication between drivers and passengers.

---

## Tech Stack

- **Frontend**: React.js, Axios, GSAP (for animations), Remix Icon
- **Backend**: Node.js, Express (for ride management and user management)
- **Socket Communication**: Socket.IO
- **Geolocation**: Browser Geolocation API for real-time location updates

---

## Installation

### Prerequisites

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository.

```bash
git@github.com:WizardOfDigits/Uber_Like_App.git
cd Uber_Like_App
```

3. Install dependencies.

```bash
cd frontend
npm install
cd ..
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```plaintext
VITE_BASE_URL=<Your Backend API URL>
```

---

### Running the Application

To start the app in development mode:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

### Backend

```
/backend
  /controllers      # Contains logic for handling requests (CRUD operations, etc.)
  /db               # Manages database connections and models
  /middlewares      # Contains middleware functions (authentication, validation, etc.)
  /routes           # Defines API endpoints and connects to controllers
  /services         # Encapsulates business logic and external service interactions
  app.js            # Main entry point for the backend
  server.js         # Server setup and configuration
  socket.js         # WebSocket (real-time communication) configuration
```

### Frontend

```
/frontend
  /public           # Contains public assets like the `index.html`, images, and static files
  /src
    /assets         # Stores static files like images, fonts, or styles
    /components     # Reusable UI components (buttons, forms, modals, etc.)
    /context        # React context for global state management
    /pages          # Page-level components (Home, Login, Dashboard, etc.)
```

---

## Socket Communication

The app uses Socket.IO for real-time communication between users (passengers) and drivers:

- **User**: Joins with the `userType: "user"` and `userId`.
- **Driver**: Joins with the `userType: "driver"` and `userId`.
- **Real-time Location**: Driver locations are updated every 10 seconds and sent to the server.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [React](https://reactjs.org/)
- [Socket.IO](https://socket.io/)
- [Axios](https://axios-http.com/)
- [GSAP](https://greensock.com/gsap/)
- [Remix Icon](https://remixicon.com/)
