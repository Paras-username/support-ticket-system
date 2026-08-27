const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            // Password is NOT required if using Google OAuth
            return !this.googleId;
        }
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true  // Allows null/undefined values
    },
    avatar: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


UserSchema.statics.createDefaultAdmin = async function() {
    const adminExists = await this.findOne({ role: 'admin' });
    if (!adminExists) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.create({
            name: 'Admin',
            email: 'admin@system.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('✅ Default admin created: admin@system.com / admin123');
    }
};

module.exports = mongoose.model('User', UserSchema);