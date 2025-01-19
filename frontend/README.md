# Ride-Sharing Platform Frontend

A React-based frontend application for a ride-sharing platform that supports both users (riders) and drivers. The application features a complete authentication system with separate flows for riders and drivers.

## 🚀 Features

- Separate authentication flows for riders and drivers
- User registration and login functionality
- Driver registration and login functionality
- Protected routes using React Router
- Global state management using Context API
- Responsive design using Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/WizardOfDigits/Uber_Like_App.git
```

2. Navigate to the project directory:

```bash
cd Uber_Like_App/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── App.jsx             # Main application component with routes
├── main.jsx            # Application entry point
├── context/
│   └── UserContext.jsx # Global user context provider
├── pages/
│   ├── Home.jsx        # Landing page
│   ├── UserLogin.jsx   # User login page
│   ├── UserSignup.jsx  # User registration page
│   ├── DriverLogin.jsx # Driver login page
│   └── DriverSignup.jsx# Driver registration page
```

## 🔐 Authentication Flows

### User (Rider) Authentication

- Registration: Collect user's first name, last name, email, and password
- Login: Email and password authentication
- Option to switch to driver login

### Driver Authentication

- Registration: Collect driver's first name, last name, email, and password
- Login: Email and password authentication
- Option to switch to user login

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- Responsive design
- Custom color schemes
- Consistent component styling
- Form layouts and input fields
- Interactive buttons and links

## 🔄 State Management

- Uses React Context API for global state management
- Maintains user/driver authentication state
- Stores user profile information

## 🛣️ Available Routes

- `/` - Home page/Landing page
- `/login` - User login
- `/signup` - User registration
- `/driver-login` - Driver login
- `/driver-signup` - Driver registration

## 📝 Additional Notes

- Images are currently loaded from external URLs - consider hosting them locally in production
- Add proper error handling for form submissions
- Implement proper form validation
- Add loading states for API calls
- Consider adding protected routes
- Add proper error boundaries
- Implement proper testing
