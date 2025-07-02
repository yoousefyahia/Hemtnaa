# Hemtnaa

**Project Team Leader:** Eng. Youssef Yehia

---

## Project Name
**Hemtnaa Platform**

## Graduation Project (2024-2025)

**Supervision:** This project was carried out under the supervision of **Dr. Ahmed Salah**, one of the pioneers in the field of Artificial Intelligence.

**Institution:** Faculty of Science, Department of Statistics and Computer Science

**Live Demo:** [https://hemtna.vercel.app/](https://hemtna.vercel.app/)

---

## About the Team Leader
**Eng. Youssef Yehia**
- **Role:** Project Team Leader & Frontend Team Leader
- **Responsibilities:**
  - Led the project team and frontend team
  - Distributed roles and tasks among all team members
  - Managed integration and communication with the backend team
  - Developed the entire child module and "Batta" module
  - Built and integrated the full authentication system (Auth)
  - Ensured smooth delivery and feature completion across the platform

---

## Table of Contents
- [Project Overview](#project-overview)
- [Main Features](#main-features)
- [Tech Stack & Tools](#tech-stack--tools)
- [Used Packages & Libraries](#used-packages--libraries)
- [Team & Collaboration](#team--collaboration)
- [How to Run](#how-to-run)

---

## Project Overview
Hemtnaa is an online speech therapy center that provides remote support for children and families. The platform saves time for both doctors and children by enabling online consultations, follow-ups, and activities—especially valuable for families living far from specialized centers or in underserved areas. Hemtnaa bridges the gap between therapists and patients, making professional help accessible from anywhere, at any time.

Hemtnaa aims to provide a digital environment for:
- Connecting parents and speech therapists.
- Offering educational content, activities, and games for children with communication challenges.
- Enabling real-time chat and consultation with doctors and AI assistants.
- Tracking user progress and engagement.
- **Saving time and effort for both doctors and children by allowing remote sessions, reducing the need for travel, and making therapy accessible for families in remote or underserved locations.**

The platform is available as both a web application and a mobile app, ensuring accessibility and ease of use for all users.

---

## Main Features

### 🏠 User Management
- User registration (parents/doctors)
- Secure login & authentication
- Profile management and editing
- Password reset and verification via email

### 📝 Posts & Comments
- View posts from doctors and the community
- Add, view, and interact with comments (live from the server)
- Like system for posts (server-synced)

### 💬 Chat & Communication
- Real-time chat with doctors (WebSocket-based)
- AI-powered chatbot for instant help and information
- Doctor profile modal and consultation features

### 🎮 Educational Games
- Integrated interactive games for children (Wordwall and more)

### 🏆 Activities & Progress Tracking
- Daily/weekly activities for children
- Progress bar and achievement tracking
- Mark activities as completed (server-synced)

### 🌈 Modern UI/UX
- Animated backgrounds and responsive design
- Sidebar navigation and progress indicators

### 📱 Mobile App Version
- The project includes a mobile application version for broader accessibility (details available upon request).

---

## Tech Stack & Tools
- **Frontend:** React, Vite, React Router, Bootstrap, Styled Components, React Simple Chatbot, Socket.io-client
- **State Management:** React Context API
- **APIs:** Axios for RESTful API calls
- **UI Libraries:** React Bootstrap, React Icons, Emoji Picker, Date Picker
- **Other:** ESLint, TailwindCSS, SASS, Toastify
- **Frontend Deployment:** Vercel
- **Backend:** Python (with a database), developed by backend team
- **Backend Hosting:** Render.com
- **Mobile App:** Built with Flutter (cross-platform)
- **Version Control & Collaboration:** Git and GitHub

---

## Used Packages & Libraries
Below is a list of all main packages and libraries used in this project, with a brief description for each:

### Core Libraries
- **react**: The main library for building user interfaces.
- **react-dom**: DOM bindings for React.
- **react-router-dom**: Routing and navigation for React apps.
- **vite**: Fast build tool and development server.

### UI & Styling
- **bootstrap**: CSS framework for responsive design.
- **react-bootstrap**: Bootstrap components as React components.
- **styled-components**: CSS-in-JS for component-level styling.
- **sass**: SASS/SCSS support for advanced styling.
- **tailwindcss**: Utility-first CSS framework.

### State & Data
- **axios**: Promise-based HTTP client for API requests.
- **react-context-api**: (via custom UserContext) for global state management.

### Chat & Communication
- **socket.io-client**: Real-time WebSocket communication for chat features.
- **react-simple-chatbot**: For building the AI chatbot experience.

### UI Enhancements
- **react-icons**: Popular icon packs as React components.
- **emoji-picker-react**: Emoji picker for chat and comments.
- **react-toastify**: Toast notifications for user feedback.
- **react-datepicker**: Date picker component for forms.
- **react-phone-number-input**: International phone input field.
- **react-select**: Select/dropdown component for forms.
- **react-world-flags**: Display country flags in the UI.

### Animation & Graphics
- **@react-three/fiber**: React renderer for Three.js (3D/animation support).
- **@react-three/drei**: Useful helpers for react-three-fiber.
- **three**: 3D graphics library.
- **react-tsparticles** & **tsparticles**: Particle backgrounds and effects.
- **vanta**: Animated backgrounds.

### Utilities & Dev Tools
- **eslint**: Linting for code quality.
- **autoprefixer** & **postcss**: CSS processing and browser compatibility.
- **lucide-react**: Icon library for modern UI.

### Other
- **react-bootstrap**, **react-toastify**, **react-icons**, **emoji-picker-react**, **react-datepicker**, **react-phone-number-input**, **react-select**, **react-world-flags**: All imported and used in various UI components and forms.

---

## Team & Collaboration
- **Project Type:** Graduation Project (2024-2025)
- **Institution:** Faculty of Science, Department of Statistics and Computer Science
- **Supervisor:** Dr. Ahmed Salah (AI Pioneer)
- **Duration:** 1 year
- **Team Members:**
  - 8 members: UI, Frontend, Backend, Graphics, Mobile
  - **Team Leader:** Eng. Youssef Yehia (Project & Frontend Team Leader)
- **Collaboration:** Agile workflow, Git version control, regular meetings, and code reviews.

---

## How to Run
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd hmtna-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
