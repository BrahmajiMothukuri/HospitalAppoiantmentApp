---

# OroGlee Dental – Frontend

Frontend for **OroGlee Dental**, a simple dentist appointment booking platform.
Users can browse dentists, view their details, and book appointments. An admin panel is also included to view all scheduled appointments in a table format.

This project is built using **React, Tailwind CSS, and Vite**.

---

## Tech Stack

* React (Functional Components + Hooks)
* React Router
* Tailwind CSS
* Fetch API
* Vite

---

## Project Structure

```
src
│
├── App.jsx                # Main app component and routes
├── main.jsx               # React entry point
├── index.css              # Tailwind styles
│
├── services
│   └── api.js             # API helper using Fetch
│
├── components
│   ├── Navbar.jsx
│   ├── DentistCard.jsx
│   ├── BookingModal.jsx
│   ├── AppointmentTable.jsx
│   └── Loader.jsx
│
└── pages
    ├── DentistList.jsx
    └── AdminPanel.jsx
```

---

## Getting Started

### 1. Go to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run at:

```
http://localhost:3000
```

---

## Backend API

The frontend communicates with the backend server running at:

```
http://localhost:4000
```

### API Endpoints

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/api/dentists`     | Fetch all dentists                     |
| POST   | `/api/appointments` | Create a new appointment               |
| GET    | `/api/appointments` | Fetch all appointments for admin panel |

---

## Features

* Browse available dentists
* View dentist information
* Book appointments through a modal form
* Admin panel to view all appointments
* Responsive UI using Tailwind CSS
* Loading states with spinner

---

## Notes

Make sure the **backend server is running on port 4000** before using the frontend.

---
