# Support Ticket System

A full-stack support ticket/helpdesk system with role-based access control (Customer/Admin), built with the MERN stack.

## Live Demo

* **Frontend:** https://support-ticket-system-dusky.vercel.app
* **Backend API:** https://support-ticket-system-khcb.onrender.com/api

## Test Credentials

### Admin Account

* **Email:** [admin@system.com]
* **Password:** admin123

### Customer Account

* **Email:** [test@customer.com]
* **Password:** 123456

## Tech Stack

* **Backend:** Node.js, Express.js, MongoDB, JWT, Cloudinary
* **Frontend:** React.js, Vite, Tailwind CSS, Recharts

## Features

### Customer

* Create tickets with title, description, priority, and category
* Upload file attachments (images, PDFs, and documents)
* View personal tickets with status history
* Track ticket workflow: **Open → In Progress → Resolved**

### Admin

* View all tickets with search, filtering, and pagination
* Update ticket status with change history
* Delete tickets
* View analytics dashboard with charts
* Ticket trends and priority distribution

## Local Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **File Storage:** Cloudinary

## API Endpoints

| Method | Endpoint                  | Access   | Description              |
| ------ | ------------------------- | -------- | ------------------------ |
| POST   | `/api/auth/signup`        | Public   | Register a new user      |
| POST   | `/api/auth/login`         | Public   | Login                    |
| POST   | `/api/tickets`            | Customer | Create a ticket          |
| GET    | `/api/tickets`            | Both     | Get tickets              |
| PUT    | `/api/tickets/:id/status` | Admin    | Update ticket status     |
| DELETE | `/api/tickets/:id`        | Admin    | Delete a ticket          |
| GET    | `/api/tickets/analytics`  | Admin    | Get dashboard analytics  |
| POST   | `/api/tickets/:id/upload` | Both     | Upload a file attachment |

## Features Checklist

* ✅ JWT Authentication with Role-Based Access Control
* ✅ Email/Password Authentication
* ✅ Ticket CRUD Operations
* ✅ Status Workflow with History
* ✅ File Attachment Upload using Cloudinary
* ✅ Search, Filter, and Pagination
* ✅ Admin Analytics Dashboard with Charts
* ✅ Status History Timeline
* ✅ Loading, Error, and Empty States
* ✅ Responsive Design
* ✅ Live Deployment

## Contact

**Paras Poria**

* **GitHub:** https://github.com/Paras-username
* **Email:** [parasporia4@gmail.com]

## License

This project was created for the **Trainee - MERN Stack position at NIANS, Gurugram**.
