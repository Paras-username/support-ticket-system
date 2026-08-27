// Role check middleware
const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        // Check if user has required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied. ${requiredRole} role required.` 
            });
        }

        next();
    };
};

// Admin only middleware (shortcut)
const adminOnly = roleCheck('admin');

// Customer only middleware (shortcut)
const customerOnly = roleCheck('customer');

module.exports = { roleCheck, adminOnly, customerOnly };