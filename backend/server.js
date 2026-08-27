// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tickets', ticketRoutes);

// // Test route
// app.get('/api', (req, res) => {
//   res.json({ message: 'Support Ticket System API is running' });
// });

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB Connected Successfully');
    
//     // Create default admin after DB connection
//     const User = require('./models/User');
//     await User.createDefaultAdmin();
    
//   } catch (error) {
//     console.error('MongoDB Connection Error:', error.message);
//     process.exit(1);
//   }
// };

// connectDB();

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API URL: http://localhost:${PORT}/api`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const passport = require('passport');  // ← COMMENT THIS

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());  // ← COMMENT THIS

// Initialize Passport config
// require('./config/passport');  // ← COMMENT THIS

// Import routes
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Support Ticket System API is running' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
    
    // Create default admin after DB connection
    const User = require('./models/User');
    await User.createDefaultAdmin();
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});