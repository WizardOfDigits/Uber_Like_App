# Uber-Like App Frontend

## 🚀 Overview
This is the frontend for an Uber-like ride-hailing application. The application provides a modern, sleek user experience with smooth animations, real-time ride tracking, and a seamless booking process.

## 📌 Features
- **User Authentication**: Sign up, login, and manage user accounts.
- **Ride Booking**: Users can request a ride with real-time fare estimates.
- **Driver Mode**: Drivers can accept or decline ride requests.
- **Live Tracking**: Real-time map updates for both riders and drivers.
- **Smooth Animations**: GSAP-powered animations for a fluid UI experience.
- **Modern UI**: Dark-themed interface with high contrast elements.
- **Responsive Design**: Optimized for mobile and desktop devices.

## 🛠️ Tech Stack
- **React.js**: Core framework for building UI components.
- **Tailwind CSS**: For fast and efficient styling.
- **GSAP**: For smooth animations.
- **Mapbox GL/google api**: For interactive maps and live tracking.
- **Axios**: For API requests.
- **React Router**: For seamless navigation.

## 📂 Folder Structure
```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   ├── context/     # Context API for state management
│   ├── pages/       # Main pages
│   ├── App.css      # Global style
│   ├── index.css    # Global style
│   ├── App.jsx      # Main app entry point
│   ├── main.jsx     # Context API and Routing
│   ├── README       # README File
└── package.json     # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>=16)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```sh
   https://github.com/WizardOfDigits/Uber_Like_App.git
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm start  # or yarn start
   ```

## ⚙️ Configuration
Create a `.env` file in the root directory and add the following environment variables:
```
VITE_BASE_URL=<base URL>
VITE_MAP_API_URL=<Enter Map API URL here>
```

## 📌 Deployment
To build and deploy the project:
```sh
npm run build  # or yarn build
```

Host the `build/` directory on platforms like **Vercel**, **Netlify**, or **Firebase Hosting**.

## 📜 License
This project is licensed under the **MIT License**.

---
