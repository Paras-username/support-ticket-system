// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import API from '../utils/api';

// const CustomerDashboard = () => {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showForm, setShowForm] = useState(false);
    
//     // Form state
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [category, setCategory] = useState('General');
//     const [submitting, setSubmitting] = useState(false);

//     // Fetch tickets on load
//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const fetchTickets = async () => {
//         try {
//             setLoading(true);
//             const res = await API.get('/tickets');
//             if (res.data.success) {
//                 setTickets(res.data.tickets);
//             }
//         } catch (err) {
//             console.error('Error fetching tickets:', err);
//             setError('Failed to load tickets');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCreateTicket = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);
//         setError('');

//         try {
//             const res = await API.post('/tickets', {
//                 title,
//                 description,
//                 priority,
//                 category
//             });

//             if (res.data.success) {
//                 // Reset form
//                 setTitle('');
//                 setDescription('');
//                 setPriority('Medium');
//                 setCategory('General');
//                 setShowForm(false);
//                 // Refresh tickets
//                 await fetchTickets();
//             }
//         } catch (err) {
//             console.error('Error creating ticket:', err);
//             setError(err.response?.data?.message || 'Failed to create ticket');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const getPriorityColor = (priority) => {
//         const colors = {
//             'Low': '#28a745',
//             'Medium': '#ffc107',
//             'High': '#fd7e14',
//             'Urgent': '#dc3545'
//         };
//         return colors[priority] || '#6c757d';
//     };

//     const getStatusColor = (status) => {
//         const colors = {
//             'Open': '#007bff',
//             'In Progress': '#ffc107',
//             'Resolved': '#28a745'
//         };
//         return colors[status] || '#6c757d';
//     };

//     if (loading) {
//         return (
//             <div style={styles.container}>
//                 <div style={styles.loading}>Loading your tickets...</div>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             {/* Header */}
//             <div style={styles.header}>
//                 <div>
//                     <h1 style={styles.title}>My Tickets</h1>
//                     <p style={styles.subtitle}>Welcome, {user?.name}!</p>
//                 </div>
//                 <div style={styles.headerActions}>
//                     <button 
//                         onClick={() => setShowForm(!showForm)} 
//                         style={styles.createButton}
//                     >
//                         {showForm ? 'Cancel' : '+ New Ticket'}
//                     </button>
//                     <button onClick={logout} style={styles.logoutButton}>
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             {/* Error Message */}
//             {error && <div style={styles.errorMsg}>{error}</div>}

//             {/* Create Ticket Form */}
//             {showForm && (
//                 <div style={styles.formContainer}>
//                     <h3 style={styles.formTitle}>Create New Ticket</h3>
//                     <form onSubmit={handleCreateTicket}>
//                         <input
//                             type="text"
//                             placeholder="Ticket Title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             style={styles.input}
//                             required
//                         />
//                         <textarea
//                             placeholder="Description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             style={styles.textarea}
//                             required
//                         />
//                         <div style={styles.row}>
//                             <select
//                                 value={priority}
//                                 onChange={(e) => setPriority(e.target.value)}
//                                 style={styles.select}
//                             >
//                                 <option value="Low">Low</option>
//                                 <option value="Medium">Medium</option>
//                                 <option value="High">High</option>
//                                 <option value="Urgent">Urgent</option>
//                             </select>
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                                 style={styles.select}
//                             >
//                                 <option value="General">General</option>
//                                 <option value="Technical">Technical</option>
//                                 <option value="Billing">Billing</option>
//                                 <option value="Feature Request">Feature Request</option>
//                                 <option value="Bug Report">Bug Report</option>
//                             </select>
//                         </div>
//                         <button 
//                             type="submit" 
//                             style={styles.submitButton} 
//                             disabled={submitting}
//                         >
//                             {submitting ? 'Creating...' : 'Create Ticket'}
//                         </button>
//                     </form>
//                 </div>
//             )}

//             {/* Tickets List */}
//             {tickets.length === 0 ? (
//                 <div style={styles.emptyState}>
//                     <p>No tickets yet. Create your first ticket!</p>
//                 </div>
//             ) : (
//                 <div style={styles.ticketList}>
//                     {tickets.map((ticket) => (
//                         <div key={ticket._id} style={styles.ticketCard}>
//                             <div style={styles.ticketHeader}>
//                                 <h3 style={styles.ticketTitle}>{ticket.title}</h3>
//                                 <div style={styles.ticketBadges}>
//                                     <span style={{
//                                         ...styles.badge,
//                                         backgroundColor: getPriorityColor(ticket.priority)
//                                     }}>
//                                         {ticket.priority}
//                                     </span>
//                                     <span style={{
//                                         ...styles.badge,
//                                         backgroundColor: getStatusColor(ticket.status)
//                                     }}>
//                                         {ticket.status}
//                                     </span>
//                                 </div>
//                             </div>
//                             <p style={styles.ticketDesc}>{ticket.description}</p>
//                             <div style={styles.ticketFooter}>
//                                 <span style={styles.ticketMeta}>
//                                     Category: {ticket.category}
//                                 </span>
//                                 <span style={styles.ticketMeta}>
//                                     Created: {new Date(ticket.createdAt).toLocaleDateString()}
//                                 </span>
//                             </div>
//                             {ticket.statusHistory && ticket.statusHistory.length > 0 && (
//                                 <details style={styles.historyDetails}>
//                                     <summary style={styles.historySummary}>
//                                         Status History ({ticket.statusHistory.length} changes)
//                                     </summary>
//                                     <div style={styles.historyList}>
//                                         {ticket.statusHistory.map((history, index) => (
//                                             <div key={index} style={styles.historyItem}>
//                                                 <span style={styles.historyStatus}>
//                                                     {history.status}
//                                                 </span>
//                                                 <span style={styles.historyTime}>
//                                                     {new Date(history.changedAt).toLocaleString()}
//                                                 </span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </details>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         maxWidth: '900px',
//         margin: '0 auto',
//         padding: '2rem',
//         minHeight: '100vh',
//         background: '#f5f7fa'
//     },
//     header: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '2rem',
//         paddingBottom: '1rem',
//         borderBottom: '2px solid #e1e4e8'
//     },
//     title: {
//         fontSize: '2rem',
//         color: '#24292e',
//         margin: 0
//     },
//     subtitle: {
//         color: '#586069',
//         margin: '0.25rem 0 0 0'
//     },
//     headerActions: {
//         display: 'flex',
//         gap: '0.75rem'
//     },
//     createButton: {
//         padding: '0.6rem 1.2rem',
//         background: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontSize: '0.95rem'
//     },
//     logoutButton: {
//         padding: '0.6rem 1.2rem',
//         background: '#dc3545',
//         color: 'white',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontSize: '0.95rem'
//     },
//     loading: {
//         textAlign: 'center',
//         padding: '3rem',
//         color: '#586069',
//         fontSize: '1.2rem'
//     },
//     errorMsg: {
//         background: '#f8d7da',
//         color: '#721c24',
//         padding: '0.75rem',
//         borderRadius: '4px',
//         marginBottom: '1rem'
//     },
//     formContainer: {
//         background: 'white',
//         padding: '1.5rem',
//         borderRadius: '8px',
//         marginBottom: '2rem',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     formTitle: {
//         marginTop: 0,
//         marginBottom: '1rem',
//         color: '#24292e'
//     },
//     input: {
//         width: '100%',
//         padding: '10px',
//         marginBottom: '10px',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         fontSize: '14px'
//     },
//     textarea: {
//         width: '100%',
//         padding: '10px',
//         marginBottom: '10px',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         fontSize: '14px',
//         minHeight: '100px',
//         resize: 'vertical'
//     },
//     row: {
//         display: 'flex',
//         gap: '10px',
//         marginBottom: '10px'
//     },
//     select: {
//         flex: 1,
//         padding: '10px',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         fontSize: '14px'
//     },
//     submitButton: {
//         width: '100%',
//         padding: '10px',
//         background: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '14px'
//     },
//     emptyState: {
//         textAlign: 'center',
//         padding: '3rem',
//         background: 'white',
//         borderRadius: '8px',
//         color: '#586069'
//     },
//     ticketList: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem'
//     },
//     ticketCard: {
//         background: 'white',
//         padding: '1.25rem',
//         borderRadius: '8px',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     ticketHeader: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: '0.5rem'
//     },
//     ticketTitle: {
//         margin: 0,
//         fontSize: '1.1rem',
//         color: '#24292e'
//     },
//     ticketBadges: {
//         display: 'flex',
//         gap: '0.5rem'
//     },
//     badge: {
//         padding: '0.25rem 0.75rem',
//         borderRadius: '20px',
//         color: 'white',
//         fontSize: '0.75rem',
//         fontWeight: '500'
//     },
//     ticketDesc: {
//         color: '#586069',
//         margin: '0.5rem 0'
//     },
//     ticketFooter: {
//         display: 'flex',
//         gap: '1rem',
//         marginTop: '0.5rem',
//         fontSize: '0.85rem',
//         color: '#6a737d'
//     },
//     ticketMeta: {
//         color: '#6a737d'
//     },
//     historyDetails: {
//         marginTop: '0.75rem',
//         paddingTop: '0.75rem',
//         borderTop: '1px solid #e1e4e8'
//     },
//     historySummary: {
//         cursor: 'pointer',
//         color: '#0366d6',
//         fontSize: '0.85rem'
//     },
//     historyList: {
//         marginTop: '0.5rem',
//         paddingLeft: '1rem'
//     },
//     historyItem: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         padding: '0.3rem 0',
//         fontSize: '0.8rem',
//         borderBottom: '1px solid #f0f0f0'
//     },
//     historyStatus: {
//         fontWeight: '500',
//         color: '#24292e'
//     },
//     historyTime: {
//         color: '#6a737d'
//     }
// };

// export default CustomerDashboard;















import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const CustomerDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');
    const [submitting, setSubmitting] = useState(false);
    
    // File upload state
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Fetch tickets on load
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await API.get('/tickets');
            if (res.data.success) {
                setTickets(res.data.tickets);
            }
        } catch (err) {
            console.error('Error fetching tickets:', err);
            setError('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // First create the ticket
            const res = await API.post('/tickets', {
                title,
                description,
                priority,
                category
            });

            if (res.data.success) {
                const ticketId = res.data.ticket._id;
                
                // If file exists, upload it
                if (file) {
                    setUploading(true);
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    await API.post(`/tickets/${ticketId}/upload`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    setUploading(false);
                }
                
                // Reset form
                setTitle('');
                setDescription('');
                setPriority('Medium');
                setCategory('General');
                setFile(null);
                setShowForm(false);
                await fetchTickets();
            }
        } catch (err) {
            console.error('Error creating ticket:', err);
            setError(err.response?.data?.message || 'Failed to create ticket');
        } finally {
            setSubmitting(false);
            setUploading(false);
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'Low': '#28a745',
            'Medium': '#ffc107',
            'High': '#fd7e14',
            'Urgent': '#dc3545'
        };
        return colors[priority] || '#6c757d';
    };

    const getStatusColor = (status) => {
        const colors = {
            'Open': '#007bff',
            'In Progress': '#ffc107',
            'Resolved': '#28a745'
        };
        return colors[status] || '#6c757d';
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading your tickets...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>My Tickets</h1>
                    <p style={styles.subtitle}>Welcome, {user?.name}!</p>
                </div>
                <div style={styles.headerActions}>
                    <button 
                        onClick={() => setShowForm(!showForm)} 
                        style={styles.createButton}
                    >
                        {showForm ? 'Cancel' : '+ New Ticket'}
                    </button>
                    <button onClick={logout} style={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && <div style={styles.errorMsg}>{error}</div>}

            {/* Create Ticket Form */}
            {showForm && (
                <div style={styles.formContainer}>
                    <h3 style={styles.formTitle}>Create New Ticket</h3>
                    <form onSubmit={handleCreateTicket}>
                        <input
                            type="text"
                            placeholder="Ticket Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={styles.textarea}
                            required
                        />
                        <div style={styles.row}>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                style={styles.select}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={styles.select}
                            >
                                <option value="General">General</option>
                                <option value="Technical">Technical</option>
                                <option value="Billing">Billing</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Bug Report">Bug Report</option>
                            </select>
                        </div>

                        {/* File Upload - NEW */}
                        <div style={styles.fileUploadContainer}>
                            <label style={styles.fileLabel}>Attach File (Optional)</label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={styles.fileInput}
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            />
                            {file && <p style={styles.fileName}>📎 {file.name}</p>}
                        </div>

                        <button 
                            type="submit" 
                            style={styles.submitButton} 
                            disabled={submitting || uploading}
                        >
                            {uploading ? 'Uploading File...' : submitting ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </form>
                </div>
            )}

            {/* Tickets List */}
            {tickets.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>No tickets yet. Create your first ticket!</p>
                </div>
            ) : (
                <div style={styles.ticketList}>
                    {tickets.map((ticket) => (
                        <div key={ticket._id} style={styles.ticketCard}>
                            <div style={styles.ticketHeader}>
                                <h3 style={styles.ticketTitle}>{ticket.title}</h3>
                                <div style={styles.ticketBadges}>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: getPriorityColor(ticket.priority)
                                    }}>
                                        {ticket.priority}
                                    </span>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: getStatusColor(ticket.status)
                                    }}>
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                            <p style={styles.ticketDesc}>{ticket.description}</p>
                            
                            {/* Show attachments if any */}
                            {ticket.attachments && ticket.attachments.length > 0 && (
                                <div style={styles.attachmentsContainer}>
                                    <span style={styles.attachmentsLabel}>📎 Attachments:</span>
                                    {ticket.attachments.map((att, index) => (
                                        <a 
                                            key={index}
                                            href={att.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.attachmentLink}
                                        >
                                            {att.filename}
                                        </a>
                                    ))}
                                </div>
                            )}

                            <div style={styles.ticketFooter}>
                                <span style={styles.ticketMeta}>
                                    Category: {ticket.category}
                                </span>
                                <span style={styles.ticketMeta}>
                                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {ticket.statusHistory && ticket.statusHistory.length > 0 && (
                                <details style={styles.historyDetails}>
                                    <summary style={styles.historySummary}>
                                        Status History ({ticket.statusHistory.length} changes)
                                    </summary>
                                    <div style={styles.historyList}>
                                        {ticket.statusHistory.map((history, index) => (
                                            <div key={index} style={styles.historyItem}>
                                                <span style={styles.historyStatus}>
                                                    {history.status}
                                                </span>
                                                <span style={styles.historyTime}>
                                                    {new Date(history.changedAt).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        minHeight: '100vh',
        background: '#f5f7fa'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e1e4e8'
    },
    title: {
        fontSize: '2rem',
        color: '#24292e',
        margin: 0
    },
    subtitle: {
        color: '#586069',
        margin: '0.25rem 0 0 0'
    },
    headerActions: {
        display: 'flex',
        gap: '0.75rem'
    },
    createButton: {
        padding: '0.6rem 1.2rem',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.95rem'
    },
    logoutButton: {
        padding: '0.6rem 1.2rem',
        background: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.95rem'
    },
    loading: {
        textAlign: 'center',
        padding: '3rem',
        color: '#586069',
        fontSize: '1.2rem'
    },
    errorMsg: {
        background: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    },
    formContainer: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    formTitle: {
        marginTop: 0,
        marginBottom: '1rem',
        color: '#24292e'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        fontSize: '14px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        fontSize: '14px',
        minHeight: '100px',
        resize: 'vertical'
    },
    row: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
    },
    select: {
        flex: 1,
        padding: '10px',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        fontSize: '14px'
    },
    fileUploadContainer: {
        marginBottom: '10px'
    },
    fileLabel: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
        color: '#24292e',
        fontSize: '14px'
    },
    fileInput: {
        padding: '8px',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        width: '100%',
        fontSize: '14px'
    },
    fileName: {
        marginTop: '5px',
        fontSize: '0.9rem',
        color: '#28a745'
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        background: 'white',
        borderRadius: '8px',
        color: '#586069'
    },
    ticketList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    ticketCard: {
        background: 'white',
        padding: '1.25rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    ticketHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
    },
    ticketTitle: {
        margin: 0,
        fontSize: '1.1rem',
        color: '#24292e'
    },
    ticketBadges: {
        display: 'flex',
        gap: '0.5rem'
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '500'
    },
    ticketDesc: {
        color: '#586069',
        margin: '0.5rem 0'
    },
    attachmentsContainer: {
        margin: '0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
    },
    attachmentsLabel: {
        fontSize: '0.85rem',
        color: '#24292e',
        fontWeight: '500'
    },
    attachmentLink: {
        fontSize: '0.85rem',
        color: '#0366d6',
        textDecoration: 'none',
        padding: '2px 8px',
        background: '#f0f6ff',
        borderRadius: '4px',
        border: '1px solid #d1d5da'
    },
    ticketFooter: {
        display: 'flex',
        gap: '1rem',
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: '#6a737d'
    },
    ticketMeta: {
        color: '#6a737d'
    },
    historyDetails: {
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid #e1e4e8'
    },
    historySummary: {
        cursor: 'pointer',
        color: '#0366d6',
        fontSize: '0.85rem'
    },
    historyList: {
        marginTop: '0.5rem',
        paddingLeft: '1rem'
    },
    historyItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.3rem 0',
        fontSize: '0.8rem',
        borderBottom: '1px solid #f0f0f0'
    },
    historyStatus: {
        fontWeight: '500',
        color: '#24292e'
    },
    historyTime: {
        color: '#6a737d'
    }
};

export default CustomerDashboard;