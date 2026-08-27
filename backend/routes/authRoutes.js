// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // SIGNUP Route - POST /api/auth/signup
// router.post('/signup', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         console.log('Signup attempt for:', email);

//         // Validate required fields
//         if (!name || !email || !password) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Please provide name, email and password' 
//             });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'User already exists with this email' 
//             });
//         }

//         // Hash password manually
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // ✅ CHANGE: Add role field with default 'customer'
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role: 'customer'  // ← ADD THIS: Default role
//         });

//         const savedUser = await user.save();

//         console.log('User created successfully:', savedUser._id);

//         // ✅ CHANGE: Include role in response
//         res.status(201).json({
//             success: true,
//             message: 'User created successfully',
//             user: {
//                 _id: savedUser._id,
//                 name: savedUser.name,
//                 email: savedUser.email,
//                 role: savedUser.role,  // ← ADD THIS
//                 createdAt: savedUser.createdAt
//             }
//         });

//     } catch (error) {
//         console.error('Signup error details:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: 'Server error', 
//             error: error.message 
//         });
//     }
// });

// // LOGIN Route - POST /api/auth/login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         console.log('Login attempt for:', email);

//         // Validate required fields
//         if (!email || !password) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Please provide email and password' 
//             });
//         }

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid email or password' 
//             });
//         }

//         // Check password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid email or password' 
//             });
//         }

//         // ✅ CHANGE: Include role in JWT token
//         const token = jwt.sign(
//             { 
//                 userId: user._id, 
//                 email: user.email,
//                 name: user.name,
//                 role: user.role  // ← ADD THIS: Role in JWT
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: '7d' }
//         );

//         console.log('Login successful for:', email);

//         // ✅ CHANGE: Include role in response
//         res.status(200).json({
//             success: true,
//             message: 'Login successful',
//             token: token,
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role  // ← ADD THIS
//             }
//         });

//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: 'Server error', 
//             error: error.message 
//         });
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

// SIGNUP Route - POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log('Signup attempt for:', email);

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email and password' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password manually
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'customer'  // Default role
        });

        const savedUser = await user.save();

        console.log('User created successfully:', savedUser._id);

        // Prepare response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
                createdAt: savedUser.createdAt
            }
        });

    } catch (error) {
        console.error('Signup error details:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

// LOGIN Route - POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for:', email);

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide email and password' 
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('Login successful for:', email);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

// // ✅ GOOGLE OAUTH ROUTES

// // Google OAuth - Redirect to Google
// router.get('/google', passport.authenticate('google', { 
//     scope: ['profile', 'email'] 
// }));

// // Google OAuth - Callback after Google redirects back
// router.get('/google/callback', 
//     passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//     async (req, res) => {
//         try {
//             // User is attached by passport
//             const user = req.user;
            
//             // Generate JWT token
//             const token = jwt.sign(
//                 { 
//                     userId: user._id, 
//                     email: user.email,
//                     name: user.name,
//                     role: user.role 
//                 },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//             );
            
//             // Redirect to frontend with token
//             const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
//             res.redirect(`${frontendURL}/oauth-callback?token=${token}`);
            
//         } catch (error) {
//             console.error('Google callback error:', error);
//             const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
//             res.redirect(`${frontendURL}/login?error=Google+login+failed`);
//         }
//     }
// );

module.exports = router;