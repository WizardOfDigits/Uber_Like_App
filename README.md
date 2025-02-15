# Ride-Sharing Application (Uber-like)

A full-stack ride-sharing application with real-time ride tracking, driver-user matching, fare calculation, and authentication. Built with **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for real-time communication.

---

## 📑 Table of Contents

1. [📸 UI Screenshots](#-ui-screenshots)
2. [✨ Key Features](#-key-features)
   - [User Features](#user-features)
   - [Driver Features](#driver-features)
3. [🛠️ Installation](#-installation)
   - [Backend Setup](#backend-setup)
4. [🚀 Usage](#-usage)
   - [User Flow](#user-flow)
   - [Driver Flow](#driver-flow)
5. [🔒 Protected Routes](#-protected-routes)
6. [🌐 Real-Time Features](#-real-time-features)
7. [🛠️ Technologies Used](#-technologies-used)
8. [📄 License](#-license)

---

# UI Screenshots

| **User Login**                   | **User Signup**                    | **Ride Booking**                     |
| -------------------------------- | ---------------------------------- | ------------------------------------ |
| ![Login](.screenshots/login.png) | ![Signup](.screenshots/signup.png) | ![Booking](.screenshots/booking.png) |

| **Active Ride (User)**             | **Driver Home**                              | **Driver Ride Panel**                            |
| ---------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| ![Riding](.screenshots/riding.png) | ![Driver Home](.screenshots/driver-home.png) | ![Driver Riding](.screenshots/driver-riding.png) |

## ✨ Key Features

### User Features

- ✅ User registration/login/logout
- 📍 Address autocomplete suggestions
- 🚗 Ride booking with fare estimation
- 🗺️ Real-time ride tracking
- 🔒 Protected routes with JWT authentication

### Driver Features

- ✅ Driver registration/login/logout
- 📍 Real-time location sharing (every 10 seconds)
- 🔔 Ride request notifications
- 🛣️ Ride confirmation/start/end workflows
- 💵 Fare calculation based on distance

---

## 🛠️ Installation

### Backend Setup

1. Clone repo:
   ```bash
   git clone https://github.com/WizardOfDigits/Uber_Like_App.git
   ```
2. Create `.env` file:

   ```backend env
   # Backend env
    PORT=<your port>
    DB_CONNECT=<mongodb:url>
    JWT_SECRET=<JWT_SECRET_KEY>
    MAPS_API=<Map api / or other map api>
   ```

   ```frontend env
   # frontend env
    VITE_BASE_URL=<Base Url>
    VITE_MAP_API_URL=<Enter Map API URL here>
   ```

---

## 🚀 Usage

### User Flow

1. **Sign Up/Login** at `/login`
2. Enter pickup/destination addresses
3. Select vehicle type (Auto/Car/Motorcycle)
4. Confirm fare and request ride
5. Track driver in real-time

### Driver Flow

1. **Sign Up/Login** at `/driver-login`
2. Receive ride requests via Socket.IO
3. Confirm/Reject rides
4. Start/End rides with OTP verification
5. Update location automatically

---

## 🔒 Protected Routes

### User Protection

```jsx
// Usage in React Router
<Route element={<UserProtectWrapper />}>
  <Route path="/home" element={<Home />} />
  <Route path="/riding" element={<Riding />} />
</Route>
```

### Driver Protection

```jsx
<Route element={<DriverProtectWrapper />}>
  <Route path="/driver-home" element={<DriverHome />} />
  <Route path="/driver-riding" element={<DriverRiding />} />
</Route>
```

---

## 🌐 Real-Time Features

- **Socket.IO Events**:

  ```js
  // User receives updates
  socket.on("ride-confirmed", (ride) => {...});
  socket.on("ride-started", (ride) => {...});

  // Driver receives requests
  socket.on("new-ride", (data) => {...});
  ```

---

## 🛠️ Technologies Used

- **Frontend**: React, GSAP (animations), Socket.IO Client
- **Backend**: Express.js, MongoDB, Mongoose, JWT
- **Mapping**: Google Maps API
- **Real-Time**: Socket.IO

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
