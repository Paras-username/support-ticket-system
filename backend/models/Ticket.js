const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    category: {
        type: String,
        default: 'General'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attachments: [{
        filename: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    statusHistory: [{
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Resolved']
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        },
        note: String
    }]
}, {
    timestamps: true
});

// ✅ Method to update status with history
TicketSchema.methods.updateStatus = async function(newStatus, userId, note = '') {
    // Add current status to history
    this.statusHistory.push({
        status: this.status,
        changedBy: userId,
        note: note || `Status changed from ${this.status} to ${newStatus}`
    });
    
    // Update status
    this.status = newStatus;
    
    return this.save();
};

module.exports = mongoose.model('Ticket', TicketSchema);