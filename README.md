# 🚗 Driving Test Kiosk – Appointment Booking System

**DrivingK Kiosk** is a full-stack Node.js application designed to manage online appointment bookings for driving tests (e.g., G2 or G class). The system provides role-based authentication, appointment scheduling, and dynamic content rendering through a clean, responsive user interface.

---

## 📁 Project Structure

DrivingKKiosk/
├── app.js # Main server file
├── package.json # Node.js dependencies
├── models/ # Mongoose schemas
│ ├── g2.js
│ └── appointment.js
├── middlewares/ # Custom route guards & auth
│ ├── authMiddleware.js
│ ├── ensureAuthenticatedAdmin.js
│ ├── loggedInMiddleware.js
│ └── redirectIfAuthenticatedMiddleware.js
├── public/ # Frontend assets
│ ├── css/ # Stylesheets
│ └── assets/img/ # Banner images
├── views/ # EJS template files
│ ├── index.ejs, login.ejs, adminPanel.ejs, etc.
└── routes/ # App route handlers

---

## ✅ Features

- 🧑‍💼 **User and Admin Login** with role-based access
- 📅 **Book Appointments** for G2 driving tests
- 📋 View and manage scheduled tests (admin panel)
- 🛡️ Auth middleware to protect restricted pages
- 🎨 Responsive frontend using EJS and CSS
- 🔧 Backend powered by Express and MongoDB

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud instance)

### Installation

```bash
git clone https://github.com/your-username/DrivingKKiosk.git
cd DrivingKKiosk
npm install
node app.js
Visit: http://localhost:3000

🔧 Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Templating: EJS

Styling: Custom CSS

Auth: Session-based middleware

🚀 Future Enhancements
SMS/Email confirmation for bookings
Date/time slot management and availability
Calendar view for admins
Payment integration

👤 Author
Vijay Prakash Mudaliar
📧 mudaliarvijay196@gmail.com
🔗 LinkedIn
