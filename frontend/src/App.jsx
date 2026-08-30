// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import CustomerDashboard from './pages/CustomerDashboard';
// import AdminDashboard from './pages/AdminDashboard';

// const PrivateRoute = ({ children, adminOnly = false }) => {
//     const { user } = React.useContext(AuthContext);
    
//     if (!user) {
//         return <Navigate to="/login" />;
//     }
    
//     if (adminOnly && user.role !== 'admin') {
//         return <Navigate to="/dashboard" />;
//     }
    
//     return children;
// };

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route
//                         path="/dashboard"
//                         element={
//                             <PrivateRoute>
//                                 <CustomerDashboard />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/admin"
//                         element={
//                             <PrivateRoute adminOnly={true}>
//                                 <AdminDashboard />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route path="/" element={<Navigate to="/dashboard" />} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OAuthCallback from './pages/OAuthCallback';  // ← ADD THIS IMPORT

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user } = React.useContext(AuthContext);
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/oauth-callback" element={<OAuthCallback />} />  {/* ← ADD THIS ROUTE */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <CustomerDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute adminOnly={true}>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;