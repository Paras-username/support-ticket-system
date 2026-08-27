const Ticket = require('../models/Ticket');
const { upload } = require('../utils/cloudinary');

// ✅ Create new ticket (Customer only)
const createTicket = async (req, res) => {
    try {
        const { title, description, priority, category } = req.body;
        
        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }
        
        // Create ticket with user ID from JWT
        const ticket = new Ticket({
            title,
            description,
            priority: priority || 'Medium',
            category: category || 'General',
            userId: req.user.id
        });
        
        const savedTicket = await ticket.save();
        
        res.status(201).json({
            success: true,
            message: 'Ticket created successfully',
            ticket: savedTicket
        });
        
    } catch (error) {
        console.error('Create ticket error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Get all tickets (Admin) OR user's tickets (Customer)
const getTickets = async (req, res) => {
    try {
        let query = {};
        
        // If user is customer, only show their tickets
        if (req.user.role === 'customer') {
            query.userId = req.user.id;
        }
        
        // ✅ Search, filter, pagination
        const { status, priority, search, page = 1, limit = 10 } = req.query;
        
        // Apply filters
        if (status) query.status = status;
        if (priority) query.priority = priority;
        
        // Search in title and description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const tickets = await Ticket.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        const total = await Ticket.countDocuments(query);
        
        res.json({
            success: true,
            tickets,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
        
    } catch (error) {
        console.error('Get tickets error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Get single ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('statusHistory.changedBy', 'name email');
        
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        
        // Check if user has access (customer can only see their own tickets)
        if (req.user.role === 'customer' && ticket.userId._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }
        
        res.json({
            success: true,
            ticket
        });
        
    } catch (error) {
        console.error('Get ticket error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Update ticket status (Admin only)
const updateTicketStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        const ticketId = req.params.id;
        
        // Validate status
        const validStatuses = ['Open', 'In Progress', 'Resolved'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }
        
        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        
        // Update status with history
        await ticket.updateStatus(status, req.user.id, note || 'Status updated by admin');
        
        res.json({
            success: true,
            message: 'Ticket status updated',
            ticket
        });
        
    } catch (error) {
        console.error('Update ticket status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Delete ticket (Admin only)
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Ticket deleted successfully'
        });
        
    } catch (error) {
        console.error('Delete ticket error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Get admin analytics (Admin only)
const getAnalytics = async (req, res) => {
    try {
        const totalTickets = await Ticket.countDocuments();
        const openTickets = await Ticket.countDocuments({ status: 'Open' });
        const inProgressTickets = await Ticket.countDocuments({ status: 'In Progress' });
        const resolvedTickets = await Ticket.countDocuments({ status: 'Resolved' });
        
        // Priority breakdown
        const priorityStats = await Ticket.aggregate([
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        // Tickets by day (last 7 days)
        const last7Days = await Ticket.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        
        res.json({
            success: true,
            analytics: {
                totalTickets,
                openTickets,
                inProgressTickets,
                resolvedTickets,
                priorityStats,
                last7Days
            }
        });
        
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ✅ Upload file to ticket
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        // Check access
        if (req.user.role === 'customer' && ticket.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        ticket.attachments.push({
            filename: req.file.originalname,
            url: req.file.path,
            uploadedAt: new Date()
        });

        await ticket.save();

        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: {
                filename: req.file.originalname,
                url: req.file.path
            }
        });

    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message
        });
    }
};

// ✅ SINGLE module.exports with all functions
module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
    deleteTicket,
    getAnalytics,
    uploadFile
};