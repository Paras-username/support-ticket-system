import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(AuthContext);  // ← Get setUser from context

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
            navigate('/login?error=Google+login+failed');
            return;
        }

        if (token) {
            try {
                // Store token
                localStorage.setItem('token', token);
                
                // Decode token to get user info
                const payload = JSON.parse(atob(token.split('.')[1]));
                const user = {
                    _id: payload.userId,
                    name: payload.name,
                    email: payload.email,
                    role: payload.role
                };
                
                localStorage.setItem('user', JSON.stringify(user));
                
                // ✅ Now setUser works!
                setUser(user);
                
                // Redirect based on role
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } catch (err) {
                console.error('Error decoding token:', err);
                navigate('/login?error=Invalid+token');
            }
        } else {
            navigate('/login');
        }
    }, [location, navigate, setUser]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Completing Google Sign In...</h2>
                <p>Please wait while we log you in.</p>
                <div style={styles.spinner}></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5'
    },
    card: {
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    spinner: {
        width: '40px',
        height: '40px',
        margin: '20px auto',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

export default OAuthCallback;