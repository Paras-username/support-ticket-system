# Personal Book Manager

A full-stack web application for managing your personal book collection. Built with the MERN stack, this application allows users to sign up, log in, and manage books with tags and reading status.

## Live Demo

- Frontend: https://personal-book-manager-flame.vercel.app
- Backend API: https://personal-book-manager-stpn.onrender.com/api

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT (JSON Web Tokens)
- Icons: Lucide React

## Features

### Authentication
- User signup with email and password
- User login with JWT token generation
- Protected routes (only logged-in users can access)
- Logout functionality

### Book Management
- Add books with title, author, tags, and status
- Edit existing books
- Delete books with confirmation modal
- View all books in a responsive grid layout

### Filtering and Statistics
- Filter books by reading status (Want to Read, Reading, Completed)
- Filter books by tags
- Real-time statistics showing total books and books by status

### User Experience
- Clean, modern UI with Tailwind CSS
- Responsive design for all screen sizes
- Modal forms for adding/editing books
- Delete confirmation to prevent accidental deletion

## Project Structure
personal-book-manager/
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ └── Book.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── bookRoutes.js
│ ├── middleware/
│ │ └── auth.js
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── BookStats.jsx
│ │ │ ├── BookCard.jsx
│ │ │ ├── BookForm.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Signup.jsx
│ │ ├── pages/
│ │ │ └── Dashboard.jsx
│ │ ├── context/
│ │ │ └── AuthContext.jsx
│ │ ├── utils/
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── package.json
│ ├── tailwind.config.js
│ └── postcss.config.js
└── README.md


## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Clone the repository
git clone https://github.com/Paras-username/personal-book-manager.git
cd personal-book-manager/backend


2. Install dependencies
npm install


3. Create a `.env` file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


4. Start the backend server
npm start


### Frontend Setup

1. Navigate to the frontend folder
cd ../frontend


2. Install dependencies
npm install


3. Create a `.env` file
VITE_API_URL=http://localhost:5000/api


4. Start the frontend development server
npm run dev


5. Open `http://localhost:5173` in your browser

## Deployment

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository and set root directory to `backend`
4. Add environment variables (MONGO_URI, JWT_SECRET)
5. Deploy

### Frontend (Vercel)
1. Push your code to GitHub
2. Import your project on Vercel
3. Set root directory to `frontend`
4. Deploy

## Contact

Paras Poria
- GitHub: https://github.com/Paras-username
- Email: parasporia4@gmail.com

## License

This project is created for the Personal Book Manager Assignment by Thumbstack.

## Acknowledgments

- Assignment by Thumbstack
- Built with React, Node.js, Express, MongoDB, and Tailwind CSS