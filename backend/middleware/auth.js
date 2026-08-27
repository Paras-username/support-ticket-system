const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'No token provided. Access denied.' 
        });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ✅ UPDATE: Include role in req.user
        req.user = {
            id: decoded.userId || decoded._id || decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role || 'customer'  // ← ADD THIS: Get role from JWT, default to customer
        };
        
        console.log('✅ Auth - User ID:', req.user.id, 'Role:', req.user.role); // Debug log
        
        next();
    } catch (error) {
        console.error('❌ Auth error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
};

module.exports = authMiddleware;