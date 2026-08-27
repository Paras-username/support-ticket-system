const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { adminOnly, customerOnly } = require('../middleware/roleCheck');
const { upload } = require('../utils/cloudinary');
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
    deleteTicket,
    getAnalytics,
    uploadFile  // ← ADD THIS IMPORT
} = require('../controllers/ticketController');

// ✅ Customer routes
router.post('/', auth, customerOnly, createTicket);  // Create ticket

// ✅ Routes that work for both (with role-based logic inside)
router.get('/', auth, getTickets);  // Get tickets (admin sees all, customer sees own)

// ✅ Admin only routes
router.get('/analytics', auth, adminOnly, getAnalytics);  // Admin dashboard stats
router.put('/:id/status', auth, adminOnly, updateTicketStatus);  // Update status
router.delete('/:id', auth, adminOnly, deleteTicket);  // Delete ticket

// ✅ Get single ticket (both roles with access check)
router.get('/:id', auth, getTicketById);

// ✅ Upload file to ticket (both admin and customer can upload)
router.post('/:id/upload', auth, upload.single('file'), uploadFile);

module.exports = router;