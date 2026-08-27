// // import { useState, useEffect, useContext } from 'react';
// // import { AuthContext } from '../context/AuthContext';
// // import { useNavigate } from 'react-router-dom';
// // import API from '../utils/api';

// // const AdminDashboard = () => {
// //     const { user, logout } = useContext(AuthContext);
// //     const navigate = useNavigate();
// //     const [tickets, setTickets] = useState([]);
// //     const [analytics, setAnalytics] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const [search, setSearch] = useState('');
// //     const [filterStatus, setFilterStatus] = useState('');
// //     const [filterPriority, setFilterPriority] = useState('');
// //     const [selectedTicket, setSelectedTicket] = useState(null);
// //     const [showStatusModal, setShowStatusModal] = useState(false);
// //     const [newStatus, setNewStatus] = useState('');
// //     const [statusNote, setStatusNote] = useState('');
// //     const [updating, setUpdating] = useState(false);

// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     const fetchData = async () => {
// //         try {
// //             setLoading(true);
// //             const [ticketsRes, analyticsRes] = await Promise.all([
// //                 API.get('/tickets'),
// //                 API.get('/tickets/analytics')
// //             ]);
            
// //             if (ticketsRes.data.success) {
// //                 setTickets(ticketsRes.data.tickets);
// //             }
// //             if (analyticsRes.data.success) {
// //                 setAnalytics(analyticsRes.data.analytics);
// //             }
// //         } catch (err) {
// //             console.error('Error fetching data:', err);
// //             setError('Failed to load data');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleSearch = async () => {
// //         try {
// //             setLoading(true);
// //             const params = new URLSearchParams();
// //             if (search) params.append('search', search);
// //             if (filterStatus) params.append('status', filterStatus);
// //             if (filterPriority) params.append('priority', filterPriority);
            
// //             const res = await API.get(`/tickets?${params.toString()}`);
// //             if (res.data.success) {
// //                 setTickets(res.data.tickets);
// //             }
// //         } catch (err) {
// //             console.error('Search error:', err);
// //             setError('Failed to search tickets');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleStatusUpdate = async (e) => {
// //         e.preventDefault();
// //         if (!selectedTicket || !newStatus) return;
        
// //         setUpdating(true);
// //         try {
// //             const res = await API.put(`/tickets/${selectedTicket._id}/status`, {
// //                 status: newStatus,
// //                 note: statusNote || `Status changed to ${newStatus}`
// //             });
            
// //             if (res.data.success) {
// //                 await fetchData();
// //                 setShowStatusModal(false);
// //                 setSelectedTicket(null);
// //                 setNewStatus('');
// //                 setStatusNote('');
// //             }
// //         } catch (err) {
// //             console.error('Status update error:', err);
// //             setError('Failed to update status');
// //         } finally {
// //             setUpdating(false);
// //         }
// //     };

// //     const handleDelete = async (ticketId) => {
// //         if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        
// //         try {
// //             const res = await API.delete(`/tickets/${ticketId}`);
// //             if (res.data.success) {
// //                 await fetchData();
// //             }
// //         } catch (err) {
// //             console.error('Delete error:', err);
// //             setError('Failed to delete ticket');
// //         }
// //     };

// //     const getPriorityColor = (priority) => {
// //         const colors = {
// //             'Low': '#28a745',
// //             'Medium': '#ffc107',
// //             'High': '#fd7e14',
// //             'Urgent': '#dc3545'
// //         };
// //         return colors[priority] || '#6c757d';
// //     };

// //     const getStatusColor = (status) => {
// //         const colors = {
// //             'Open': '#007bff',
// //             'In Progress': '#ffc107',
// //             'Resolved': '#28a745'
// //         };
// //         return colors[status] || '#6c757d';
// //     };

// //     if (loading) {
// //         return (
// //             <div style={styles.container}>
// //                 <div style={styles.loading}>Loading dashboard...</div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div style={styles.container}>
// //             {/* Header */}
// //             <div style={styles.header}>
// //                 <div>
// //                     <h1 style={styles.title}>Admin Dashboard</h1>
// //                     <p style={styles.subtitle}>Welcome, {user?.name}!</p>
// //                 </div>
// //                 <button onClick={logout} style={styles.logoutButton}>
// //                     Logout
// //                 </button>
// //             </div>

// //             {/* Error Message */}
// //             {error && <div style={styles.errorMsg}>{error}</div>}

// //             {/* Analytics Stats */}
// //             {analytics && (
// //                 <div style={styles.statsGrid}>
// //                     <div style={styles.statCard}>
// //                         <h3 style={styles.statNumber}>{analytics.totalTickets}</h3>
// //                         <p style={styles.statLabel}>Total Tickets</p>
// //                     </div>
// //                     <div style={{...styles.statCard, borderBottomColor: '#007bff'}}>
// //                         <h3 style={styles.statNumber}>{analytics.openTickets}</h3>
// //                         <p style={styles.statLabel}>Open</p>
// //                     </div>
// //                     <div style={{...styles.statCard, borderBottomColor: '#ffc107'}}>
// //                         <h3 style={styles.statNumber}>{analytics.inProgressTickets}</h3>
// //                         <p style={styles.statLabel}>In Progress</p>
// //                     </div>
// //                     <div style={{...styles.statCard, borderBottomColor: '#28a745'}}>
// //                         <h3 style={styles.statNumber}>{analytics.resolvedTickets}</h3>
// //                         <p style={styles.statLabel}>Resolved</p>
// //                     </div>
// //                 </div>
// //             )}

// //             {/* Priority Breakdown */}
// //             {analytics && analytics.priorityStats && (
// //                 <div style={styles.priorityContainer}>
// //                     <h3 style={styles.sectionTitle}>Priority Breakdown</h3>
// //                     <div style={styles.priorityGrid}>
// //                         {analytics.priorityStats.map((item) => (
// //                             <div key={item._id} style={styles.priorityItem}>
// //                                 <span style={{
// //                                     ...styles.priorityDot,
// //                                     backgroundColor: getPriorityColor(item._id)
// //                                 }}></span>
// //                                 <span style={styles.priorityName}>{item._id}</span>
// //                                 <span style={styles.priorityCount}>{item.count}</span>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             )}

// //             {/* Search & Filters */}
// //             <div style={styles.filterContainer}>
// //                 <input
// //                     type="text"
// //                     placeholder="Search tickets..."
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     style={styles.searchInput}
// //                 />
// //                 <select
// //                     value={filterStatus}
// //                     onChange={(e) => setFilterStatus(e.target.value)}
// //                     style={styles.filterSelect}
// //                 >
// //                     <option value="">All Status</option>
// //                     <option value="Open">Open</option>
// //                     <option value="In Progress">In Progress</option>
// //                     <option value="Resolved">Resolved</option>
// //                 </select>
// //                 <select
// //                     value={filterPriority}
// //                     onChange={(e) => setFilterPriority(e.target.value)}
// //                     style={styles.filterSelect}
// //                 >
// //                     <option value="">All Priority</option>
// //                     <option value="Low">Low</option>
// //                     <option value="Medium">Medium</option>
// //                     <option value="High">High</option>
// //                     <option value="Urgent">Urgent</option>
// //                 </select>
// //                 <button onClick={handleSearch} style={styles.searchButton}>
// //                     Search
// //                 </button>
// //                 <button onClick={fetchData} style={styles.resetButton}>
// //                     Reset
// //                 </button>
// //             </div>

// //             {/* Tickets Table */}
// //             {tickets.length === 0 ? (
// //                 <div style={styles.emptyState}>
// //                     <p>No tickets found</p>
// //                 </div>
// //             ) : (
// //                 <div style={styles.tableContainer}>
// //                     <table style={styles.table}>
// //                         <thead>
// //                             <tr style={styles.tableHeader}>
// //                                 <th style={styles.th}>Title</th>
// //                                 <th style={styles.th}>Customer</th>
// //                                 <th style={styles.th}>Priority</th>
// //                                 <th style={styles.th}>Status</th>
// //                                 <th style={styles.th}>Created</th>
// //                                 <th style={styles.th}>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {tickets.map((ticket) => (
// //                                 <tr key={ticket._id} style={styles.tableRow}>
// //                                     <td style={styles.td}>
// //                                         <div style={styles.ticketTitle}>{ticket.title}</div>
// //                                         <div style={styles.ticketCategory}>{ticket.category}</div>
// //                                     </td>
// //                                     <td style={styles.td}>
// //                                         {ticket.userId?.name || 'Unknown'}
// //                                     </td>
// //                                     <td style={styles.td}>
// //                                         <span style={{
// //                                             ...styles.badge,
// //                                             backgroundColor: getPriorityColor(ticket.priority)
// //                                         }}>
// //                                             {ticket.priority}
// //                                         </span>
// //                                     </td>
// //                                     <td style={styles.td}>
// //                                         <span style={{
// //                                             ...styles.badge,
// //                                             backgroundColor: getStatusColor(ticket.status)
// //                                         }}>
// //                                             {ticket.status}
// //                                         </span>
// //                                     </td>
// //                                     <td style={styles.td}>
// //                                         {new Date(ticket.createdAt).toLocaleDateString()}
// //                                     </td>
// //                                     <td style={styles.td}>
// //                                         <div style={styles.actionButtons}>
// //                                             <button
// //                                                 onClick={() => {
// //                                                     setSelectedTicket(ticket);
// //                                                     setNewStatus(ticket.status);
// //                                                     setShowStatusModal(true);
// //                                                 }}
// //                                                 style={styles.statusButton}
// //                                             >
// //                                                 Status
// //                                             </button>
// //                                             <button
// //                                                 onClick={() => handleDelete(ticket._id)}
// //                                                 style={styles.deleteButton}
// //                                             >
// //                                                 Delete
// //                                             </button>
// //                                         </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}

// //             {/* Status Update Modal */}
// //             {showStatusModal && selectedTicket && (
// //                 <div style={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
// //                     <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// //                         <h3 style={styles.modalTitle}>Update Status</h3>
// //                         <p style={styles.modalTicket}>Ticket: {selectedTicket.title}</p>
                        
// //                         <form onSubmit={handleStatusUpdate}>
// //                             <select
// //                                 value={newStatus}
// //                                 onChange={(e) => setNewStatus(e.target.value)}
// //                                 style={styles.modalSelect}
// //                                 required
// //                             >
// //                                 <option value="Open">Open</option>
// //                                 <option value="In Progress">In Progress</option>
// //                                 <option value="Resolved">Resolved</option>
// //                             </select>
                            
// //                             <textarea
// //                                 placeholder="Add a note (optional)"
// //                                 value={statusNote}
// //                                 onChange={(e) => setStatusNote(e.target.value)}
// //                                 style={styles.modalTextarea}
// //                             />
                            
// //                             <div style={styles.modalActions}>
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowStatusModal(false)}
// //                                     style={styles.modalCancel}
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     type="submit"
// //                                     style={styles.modalSubmit}
// //                                     disabled={updating}
// //                                 >
// //                                     {updating ? 'Updating...' : 'Update Status'}
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // const styles = {
// //     container: {
// //         maxWidth: '1200px',
// //         margin: '0 auto',
// //         padding: '2rem',
// //         minHeight: '100vh',
// //         background: '#f5f7fa'
// //     },
// //     header: {
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginBottom: '2rem',
// //         paddingBottom: '1rem',
// //         borderBottom: '2px solid #e1e4e8'
// //     },
// //     title: {
// //         fontSize: '2rem',
// //         color: '#24292e',
// //         margin: 0
// //     },
// //     subtitle: {
// //         color: '#586069',
// //         margin: '0.25rem 0 0 0'
// //     },
// //     logoutButton: {
// //         padding: '0.6rem 1.2rem',
// //         background: '#dc3545',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '6px',
// //         cursor: 'pointer',
// //         fontSize: '0.95rem'
// //     },
// //     errorMsg: {
// //         background: '#f8d7da',
// //         color: '#721c24',
// //         padding: '0.75rem',
// //         borderRadius: '4px',
// //         marginBottom: '1rem'
// //     },
// //     loading: {
// //         textAlign: 'center',
// //         padding: '3rem',
// //         color: '#586069',
// //         fontSize: '1.2rem'
// //     },
// //     statsGrid: {
// //         display: 'grid',
// //         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// //         gap: '1rem',
// //         marginBottom: '2rem'
// //     },
// //     statCard: {
// //         background: 'white',
// //         padding: '1.5rem',
// //         borderRadius: '8px',
// //         textAlign: 'center',
// //         borderBottom: '4px solid #6c757d',
// //         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// //     },
// //     statNumber: {
// //         fontSize: '2rem',
// //         margin: 0,
// //         color: '#24292e'
// //     },
// //     statLabel: {
// //         color: '#586069',
// //         margin: '0.25rem 0 0 0'
// //     },
// //     priorityContainer: {
// //         background: 'white',
// //         padding: '1.5rem',
// //         borderRadius: '8px',
// //         marginBottom: '2rem',
// //         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// //     },
// //     sectionTitle: {
// //         marginTop: 0,
// //         marginBottom: '1rem',
// //         color: '#24292e'
// //     },
// //     priorityGrid: {
// //         display: 'flex',
// //         gap: '2rem',
// //         flexWrap: 'wrap'
// //     },
// //     priorityItem: {
// //         display: 'flex',
// //         alignItems: 'center',
// //         gap: '0.5rem'
// //     },
// //     priorityDot: {
// //         width: '12px',
// //         height: '12px',
// //         borderRadius: '50%'
// //     },
// //     priorityName: {
// //         color: '#24292e'
// //     },
// //     priorityCount: {
// //         color: '#586069',
// //         fontWeight: 'bold'
// //     },
// //     filterContainer: {
// //         display: 'flex',
// //         gap: '0.75rem',
// //         flexWrap: 'wrap',
// //         marginBottom: '1.5rem',
// //         padding: '1rem',
// //         background: 'white',
// //         borderRadius: '8px',
// //         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// //     },
// //     searchInput: {
// //         flex: 1,
// //         minWidth: '150px',
// //         padding: '0.6rem',
// //         border: '1px solid #d1d5da',
// //         borderRadius: '4px',
// //         fontSize: '0.95rem'
// //     },
// //     filterSelect: {
// //         padding: '0.6rem',
// //         border: '1px solid #d1d5da',
// //         borderRadius: '4px',
// //         fontSize: '0.95rem'
// //     },
// //     searchButton: {
// //         padding: '0.6rem 1.2rem',
// //         background: '#007bff',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer'
// //     },
// //     resetButton: {
// //         padding: '0.6rem 1.2rem',
// //         background: '#6c757d',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer'
// //     },
// //     emptyState: {
// //         textAlign: 'center',
// //         padding: '3rem',
// //         background: 'white',
// //         borderRadius: '8px',
// //         color: '#586069'
// //     },
// //     tableContainer: {
// //         background: 'white',
// //         borderRadius: '8px',
// //         overflow: 'auto',
// //         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// //     },
// //     table: {
// //         width: '100%',
// //         borderCollapse: 'collapse'
// //     },
// //     tableHeader: {
// //         background: '#f6f8fa',
// //         borderBottom: '2px solid #e1e4e8'
// //     },
// //     th: {
// //         padding: '0.75rem 1rem',
// //         textAlign: 'left',
// //         fontWeight: '600',
// //         color: '#24292e'
// //     },
// //     tableRow: {
// //         borderBottom: '1px solid #e1e4e8'
// //     },
// //     td: {
// //         padding: '0.75rem 1rem',
// //         verticalAlign: 'middle'
// //     },
// //     ticketTitle: {
// //         fontWeight: '500',
// //         color: '#24292e'
// //     },
// //     ticketCategory: {
// //         fontSize: '0.75rem',
// //         color: '#586069'
// //     },
// //     badge: {
// //         padding: '0.25rem 0.75rem',
// //         borderRadius: '20px',
// //         color: 'white',
// //         fontSize: '0.75rem',
// //         fontWeight: '500'
// //     },
// //     actionButtons: {
// //         display: 'flex',
// //         gap: '0.5rem'
// //     },
// //     statusButton: {
// //         padding: '0.3rem 0.6rem',
// //         background: '#28a745',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer',
// //         fontSize: '0.8rem'
// //     },
// //     deleteButton: {
// //         padding: '0.3rem 0.6rem',
// //         background: '#dc3545',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer',
// //         fontSize: '0.8rem'
// //     },
// //     modalOverlay: {
// //         position: 'fixed',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         backgroundColor: 'rgba(0,0,0,0.5)',
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         zIndex: 1000
// //     },
// //     modal: {
// //         background: 'white',
// //         padding: '2rem',
// //         borderRadius: '8px',
// //         width: '100%',
// //         maxWidth: '450px',
// //         boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
// //     },
// //     modalTitle: {
// //         marginTop: 0,
// //         marginBottom: '0.5rem',
// //         color: '#24292e'
// //     },
// //     modalTicket: {
// //         color: '#586069',
// //         marginBottom: '1rem'
// //     },
// //     modalSelect: {
// //         width: '100%',
// //         padding: '0.6rem',
// //         border: '1px solid #d1d5da',
// //         borderRadius: '4px',
// //         marginBottom: '0.75rem',
// //         fontSize: '0.95rem'
// //     },
// //     modalTextarea: {
// //         width: '100%',
// //         padding: '0.6rem',
// //         border: '1px solid #d1d5da',
// //         borderRadius: '4px',
// //         minHeight: '60px',
// //         marginBottom: '1rem',
// //         fontSize: '0.95rem',
// //         resize: 'vertical'
// //     },
// //     modalActions: {
// //         display: 'flex',
// //         gap: '0.75rem',
// //         justifyContent: 'flex-end'
// //     },
// //     modalCancel: {
// //         padding: '0.6rem 1.2rem',
// //         background: '#6c757d',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer'
// //     },
// //     modalSubmit: {
// //         padding: '0.6rem 1.2rem',
// //         background: '#28a745',
// //         color: 'white',
// //         border: 'none',
// //         borderRadius: '4px',
// //         cursor: 'pointer'
// //     }
// // };

// // export default AdminDashboard;



// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import API from '../utils/api';

// const AdminDashboard = () => {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [tickets, setTickets] = useState([]);
//     const [analytics, setAnalytics] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [search, setSearch] = useState('');
//     const [filterStatus, setFilterStatus] = useState('');
//     const [filterPriority, setFilterPriority] = useState('');
//     const [selectedTicket, setSelectedTicket] = useState(null);
//     const [showStatusModal, setShowStatusModal] = useState(false);
//     const [newStatus, setNewStatus] = useState('');
//     const [statusNote, setStatusNote] = useState('');
//     const [updating, setUpdating] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             // Build query params
//             const params = new URLSearchParams();
//             if (search) params.append('search', search);
//             if (filterStatus) params.append('status', filterStatus);
//             if (filterPriority) params.append('priority', filterPriority);
            
//             // Fetch tickets with filters
//             const ticketsRes = await API.get(`/tickets?${params.toString()}`);
//             const analyticsRes = await API.get('/tickets/analytics');
            
//             if (ticketsRes.data.success) {
//                 setTickets(ticketsRes.data.tickets);
//             }
//             if (analyticsRes.data.success) {
//                 setAnalytics(analyticsRes.data.analytics);
//             }
//         } catch (err) {
//             console.error('Error fetching data:', err);
//             setError('Failed to load data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         fetchData();
//     };

//     const handleReset = () => {
//         setSearch('');
//         setFilterStatus('');
//         setFilterPriority('');
//         // Fetch without any filters
//         fetchData();
//     };

//     const handleStatusUpdate = async (e) => {
//         e.preventDefault();
//         if (!selectedTicket || !newStatus) return;
        
//         setUpdating(true);
//         try {
//             const res = await API.put(`/tickets/${selectedTicket._id}/status`, {
//                 status: newStatus,
//                 note: statusNote || `Status changed to ${newStatus}`
//             });
            
//             if (res.data.success) {
//                 await fetchData();
//                 setShowStatusModal(false);
//                 setSelectedTicket(null);
//                 setNewStatus('');
//                 setStatusNote('');
//             }
//         } catch (err) {
//             console.error('Status update error:', err);
//             setError('Failed to update status');
//         } finally {
//             setUpdating(false);
//         }
//     };

//     const handleDelete = async (ticketId) => {
//         if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        
//         try {
//             const res = await API.delete(`/tickets/${ticketId}`);
//             if (res.data.success) {
//                 await fetchData();
//             }
//         } catch (err) {
//             console.error('Delete error:', err);
//             setError('Failed to delete ticket');
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
//                 <div style={styles.loading}>Loading dashboard...</div>
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             {/* Header */}
//             <div style={styles.header}>
//                 <div>
//                     <h1 style={styles.title}>Admin Dashboard</h1>
//                     <p style={styles.subtitle}>Welcome, {user?.name}!</p>
//                 </div>
//                 <button onClick={logout} style={styles.logoutButton}>
//                     Logout
//                 </button>
//             </div>

//             {/* Error Message */}
//             {error && <div style={styles.errorMsg}>{error}</div>}

//             {/* Analytics Stats */}
//             {analytics && (
//                 <div style={styles.statsGrid}>
//                     <div style={styles.statCard}>
//                         <h3 style={styles.statNumber}>{analytics.totalTickets}</h3>
//                         <p style={styles.statLabel}>Total Tickets</p>
//                     </div>
//                     <div style={{...styles.statCard, borderBottomColor: '#007bff'}}>
//                         <h3 style={styles.statNumber}>{analytics.openTickets}</h3>
//                         <p style={styles.statLabel}>Open</p>
//                     </div>
//                     <div style={{...styles.statCard, borderBottomColor: '#ffc107'}}>
//                         <h3 style={styles.statNumber}>{analytics.inProgressTickets}</h3>
//                         <p style={styles.statLabel}>In Progress</p>
//                     </div>
//                     <div style={{...styles.statCard, borderBottomColor: '#28a745'}}>
//                         <h3 style={styles.statNumber}>{analytics.resolvedTickets}</h3>
//                         <p style={styles.statLabel}>Resolved</p>
//                     </div>
//                 </div>
//             )}

//             {/* Priority Breakdown */}
//             {analytics && analytics.priorityStats && (
//                 <div style={styles.priorityContainer}>
//                     <h3 style={styles.sectionTitle}>Priority Breakdown</h3>
//                     <div style={styles.priorityGrid}>
//                         {analytics.priorityStats.map((item) => (
//                             <div key={item._id} style={styles.priorityItem}>
//                                 <span style={{
//                                     ...styles.priorityDot,
//                                     backgroundColor: getPriorityColor(item._id)
//                                 }}></span>
//                                 <span style={styles.priorityName}>{item._id}</span>
//                                 <span style={styles.priorityCount}>{item.count}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Search & Filters */}
//             <form onSubmit={handleSearch} style={styles.filterContainer}>
//                 <input
//                     type="text"
//                     placeholder="Search by title or description..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     style={styles.searchInput}
//                 />
//                 <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     style={styles.filterSelect}
//                 >
//                     <option value="">All Status</option>
//                     <option value="Open">Open</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Resolved">Resolved</option>
//                 </select>
//                 <select
//                     value={filterPriority}
//                     onChange={(e) => setFilterPriority(e.target.value)}
//                     style={styles.filterSelect}
//                 >
//                     <option value="">All Priority</option>
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                     <option value="Urgent">Urgent</option>
//                 </select>
//                 <button type="submit" style={styles.searchButton}>
//                     Search
//                 </button>
//                 <button type="button" onClick={handleReset} style={styles.resetButton}>
//                     Reset
//                 </button>
//             </form>

//             {/* Tickets Table */}
//             {tickets.length === 0 ? (
//                 <div style={styles.emptyState}>
//                     <p>No tickets found</p>
//                 </div>
//             ) : (
//                 <div style={styles.tableContainer}>
//                     <table style={styles.table}>
//                         <thead>
//                             <tr style={styles.tableHeader}>
//                                 <th style={styles.th}>Title</th>
//                                 <th style={styles.th}>Customer</th>
//                                 <th style={styles.th}>Priority</th>
//                                 <th style={styles.th}>Status</th>
//                                 <th style={styles.th}>Created</th>
//                                 <th style={styles.th}>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tickets.map((ticket) => (
//                                 <tr key={ticket._id} style={styles.tableRow}>
//                                     <td style={styles.td}>
//                                         <div style={styles.ticketTitle}>{ticket.title}</div>
//                                         <div style={styles.ticketCategory}>{ticket.category}</div>
//                                     </td>
//                                     <td style={styles.td}>
//                                         {ticket.userId?.name || 'Unknown'}
//                                     </td>
//                                     <td style={styles.td}>
//                                         <span style={{
//                                             ...styles.badge,
//                                             backgroundColor: getPriorityColor(ticket.priority)
//                                         }}>
//                                             {ticket.priority}
//                                         </span>
//                                     </td>
//                                     <td style={styles.td}>
//                                         <span style={{
//                                             ...styles.badge,
//                                             backgroundColor: getStatusColor(ticket.status)
//                                         }}>
//                                             {ticket.status}
//                                         </span>
//                                     </td>
//                                     <td style={styles.td}>
//                                         {new Date(ticket.createdAt).toLocaleDateString()}
//                                     </td>
//                                     <td style={styles.td}>
//                                         <div style={styles.actionButtons}>
//                                             <button
//                                                 onClick={() => {
//                                                     setSelectedTicket(ticket);
//                                                     setNewStatus(ticket.status);
//                                                     setShowStatusModal(true);
//                                                 }}
//                                                 style={styles.statusButton}
//                                             >
//                                                 Status
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(ticket._id)}
//                                                 style={styles.deleteButton}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Status Update Modal */}
//             {showStatusModal && selectedTicket && (
//                 <div style={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
//                     <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//                         <h3 style={styles.modalTitle}>Update Status</h3>
//                         <p style={styles.modalTicket}>Ticket: {selectedTicket.title}</p>
                        
//                         <form onSubmit={handleStatusUpdate}>
//                             <select
//                                 value={newStatus}
//                                 onChange={(e) => setNewStatus(e.target.value)}
//                                 style={styles.modalSelect}
//                                 required
//                             >
//                                 <option value="Open">Open</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Resolved">Resolved</option>
//                             </select>
                            
//                             <textarea
//                                 placeholder="Add a note (optional)"
//                                 value={statusNote}
//                                 onChange={(e) => setStatusNote(e.target.value)}
//                                 style={styles.modalTextarea}
//                             />
                            
//                             <div style={styles.modalActions}>
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowStatusModal(false)}
//                                     style={styles.modalCancel}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     style={styles.modalSubmit}
//                                     disabled={updating}
//                                 >
//                                     {updating ? 'Updating...' : 'Update Status'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         maxWidth: '1200px',
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
//     logoutButton: {
//         padding: '0.6rem 1.2rem',
//         background: '#dc3545',
//         color: 'white',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//         fontSize: '0.95rem'
//     },
//     errorMsg: {
//         background: '#f8d7da',
//         color: '#721c24',
//         padding: '0.75rem',
//         borderRadius: '4px',
//         marginBottom: '1rem'
//     },
//     loading: {
//         textAlign: 'center',
//         padding: '3rem',
//         color: '#586069',
//         fontSize: '1.2rem'
//     },
//     statsGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '1rem',
//         marginBottom: '2rem'
//     },
//     statCard: {
//         background: 'white',
//         padding: '1.5rem',
//         borderRadius: '8px',
//         textAlign: 'center',
//         borderBottom: '4px solid #6c757d',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     statNumber: {
//         fontSize: '2rem',
//         margin: 0,
//         color: '#24292e'
//     },
//     statLabel: {
//         color: '#586069',
//         margin: '0.25rem 0 0 0'
//     },
//     priorityContainer: {
//         background: 'white',
//         padding: '1.5rem',
//         borderRadius: '8px',
//         marginBottom: '2rem',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     sectionTitle: {
//         marginTop: 0,
//         marginBottom: '1rem',
//         color: '#24292e'
//     },
//     priorityGrid: {
//         display: 'flex',
//         gap: '2rem',
//         flexWrap: 'wrap'
//     },
//     priorityItem: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem'
//     },
//     priorityDot: {
//         width: '12px',
//         height: '12px',
//         borderRadius: '50%'
//     },
//     priorityName: {
//         color: '#24292e'
//     },
//     priorityCount: {
//         color: '#586069',
//         fontWeight: 'bold'
//     },
//     filterContainer: {
//         display: 'flex',
//         gap: '0.75rem',
//         flexWrap: 'wrap',
//         marginBottom: '1.5rem',
//         padding: '1rem',
//         background: 'white',
//         borderRadius: '8px',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     searchInput: {
//         flex: 1,
//         minWidth: '150px',
//         padding: '0.6rem',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         fontSize: '0.95rem'
//     },
//     filterSelect: {
//         padding: '0.6rem',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         fontSize: '0.95rem'
//     },
//     searchButton: {
//         padding: '0.6rem 1.2rem',
//         background: '#007bff',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     },
//     resetButton: {
//         padding: '0.6rem 1.2rem',
//         background: '#6c757d',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     },
//     emptyState: {
//         textAlign: 'center',
//         padding: '3rem',
//         background: 'white',
//         borderRadius: '8px',
//         color: '#586069'
//     },
//     tableContainer: {
//         background: 'white',
//         borderRadius: '8px',
//         overflow: 'auto',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse'
//     },
//     tableHeader: {
//         background: '#f6f8fa',
//         borderBottom: '2px solid #e1e4e8'
//     },
//     th: {
//         padding: '0.75rem 1rem',
//         textAlign: 'left',
//         fontWeight: '600',
//         color: '#24292e'
//     },
//     tableRow: {
//         borderBottom: '1px solid #e1e4e8'
//     },
//     td: {
//         padding: '0.75rem 1rem',
//         verticalAlign: 'middle'
//     },
//     ticketTitle: {
//         fontWeight: '500',
//         color: '#24292e'
//     },
//     ticketCategory: {
//         fontSize: '0.75rem',
//         color: '#586069'
//     },
//     badge: {
//         padding: '0.25rem 0.75rem',
//         borderRadius: '20px',
//         color: 'white',
//         fontSize: '0.75rem',
//         fontWeight: '500'
//     },
//     actionButtons: {
//         display: 'flex',
//         gap: '0.5rem'
//     },
//     statusButton: {
//         padding: '0.3rem 0.6rem',
//         background: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.8rem'
//     },
//     deleteButton: {
//         padding: '0.3rem 0.6rem',
//         background: '#dc3545',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '0.8rem'
//     },
//     modalOverlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000
//     },
//     modal: {
//         background: 'white',
//         padding: '2rem',
//         borderRadius: '8px',
//         width: '100%',
//         maxWidth: '450px',
//         boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//     },
//     modalTitle: {
//         marginTop: 0,
//         marginBottom: '0.5rem',
//         color: '#24292e'
//     },
//     modalTicket: {
//         color: '#586069',
//         marginBottom: '1rem'
//     },
//     modalSelect: {
//         width: '100%',
//         padding: '0.6rem',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         marginBottom: '0.75rem',
//         fontSize: '0.95rem'
//     },
//     modalTextarea: {
//         width: '100%',
//         padding: '0.6rem',
//         border: '1px solid #d1d5da',
//         borderRadius: '4px',
//         minHeight: '60px',
//         marginBottom: '1rem',
//         fontSize: '0.95rem',
//         resize: 'vertical'
//     },
//     modalActions: {
//         display: 'flex',
//         gap: '0.75rem',
//         justifyContent: 'flex-end'
//     },
//     modalCancel: {
//         padding: '0.6rem 1.2rem',
//         background: '#6c757d',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     },
//     modalSubmit: {
//         padding: '0.6rem 1.2rem',
//         background: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     }
// };

// export default AdminDashboard;



import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [statusNote, setStatusNote] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filterStatus) params.append('status', filterStatus);
            if (filterPriority) params.append('priority', filterPriority);
            
            const ticketsRes = await API.get(`/tickets?${params.toString()}`);
            const analyticsRes = await API.get('/tickets/analytics');
            
            if (ticketsRes.data.success) {
                setTickets(ticketsRes.data.tickets);
            }
            if (analyticsRes.data.success) {
                setAnalytics(analyticsRes.data.analytics);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleReset = () => {
        setSearch('');
        setFilterStatus('');
        setFilterPriority('');
        fetchData();
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        if (!selectedTicket || !newStatus) return;
        
        setUpdating(true);
        try {
            const res = await API.put(`/tickets/${selectedTicket._id}/status`, {
                status: newStatus,
                note: statusNote || `Status changed to ${newStatus}`
            });
            
            if (res.data.success) {
                await fetchData();
                setShowStatusModal(false);
                setSelectedTicket(null);
                setNewStatus('');
                setStatusNote('');
            }
        } catch (err) {
            console.error('Status update error:', err);
            setError('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (ticketId) => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        
        try {
            const res = await API.delete(`/tickets/${ticketId}`);
            if (res.data.success) {
                await fetchData();
            }
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete ticket');
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

    const PRIORITY_COLORS = ['#28a745', '#ffc107', '#fd7e14', '#dc3545'];

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>Welcome, {user?.name}!</p>
                </div>
                <button onClick={logout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {/* Error Message */}
            {error && <div style={styles.errorMsg}>{error}</div>}

            {/* Analytics Stats */}
            {analytics && (
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <h3 style={styles.statNumber}>{analytics.totalTickets}</h3>
                        <p style={styles.statLabel}>Total Tickets</p>
                    </div>
                    <div style={{...styles.statCard, borderBottomColor: '#007bff'}}>
                        <h3 style={styles.statNumber}>{analytics.openTickets}</h3>
                        <p style={styles.statLabel}>Open</p>
                    </div>
                    <div style={{...styles.statCard, borderBottomColor: '#ffc107'}}>
                        <h3 style={styles.statNumber}>{analytics.inProgressTickets}</h3>
                        <p style={styles.statLabel}>In Progress</p>
                    </div>
                    <div style={{...styles.statCard, borderBottomColor: '#28a745'}}>
                        <h3 style={styles.statNumber}>{analytics.resolvedTickets}</h3>
                        <p style={styles.statLabel}>Resolved</p>
                    </div>
                </div>
            )}

            {/* Charts Section */}
            {analytics && analytics.last7Days && analytics.priorityStats && (
                <div style={styles.chartsContainer}>
                    <div style={styles.chartCard}>
                        <h4 style={styles.chartTitle}>Tickets Last 7 Days</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={analytics.last7Days}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#007bff" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={styles.chartCard}>
                        <h4 style={styles.chartTitle}>Priority Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={analytics.priorityStats}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {analytics.priorityStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Priority Breakdown */}
            {analytics && analytics.priorityStats && (
                <div style={styles.priorityContainer}>
                    <h3 style={styles.sectionTitle}>Priority Breakdown</h3>
                    <div style={styles.priorityGrid}>
                        {analytics.priorityStats.map((item) => (
                            <div key={item._id} style={styles.priorityItem}>
                                <span style={{
                                    ...styles.priorityDot,
                                    backgroundColor: getPriorityColor(item._id)
                                }}></span>
                                <span style={styles.priorityName}>{item._id}</span>
                                <span style={styles.priorityCount}>{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search & Filters */}
            <form onSubmit={handleSearch} style={styles.filterContainer}>
                <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={styles.filterSelect}
                >
                    <option value="">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={styles.filterSelect}
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>
                <button type="submit" style={styles.searchButton}>
                    Search
                </button>
                <button type="button" onClick={handleReset} style={styles.resetButton}>
                    Reset
                </button>
            </form>

            {/* Tickets Table */}
            {tickets.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>No tickets found</p>
                </div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Customer</th>
                                <th style={styles.th}>Priority</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Attachments</th>
                                <th style={styles.th}>Created</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket._id} style={styles.tableRow}>
                                    <td style={styles.td}>
                                        <div style={styles.ticketTitle}>{ticket.title}</div>
                                        <div style={styles.ticketCategory}>{ticket.category}</div>
                                    </td>
                                    <td style={styles.td}>
                                        {ticket.userId?.name || 'Unknown'}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.badge,
                                            backgroundColor: getPriorityColor(ticket.priority)
                                        }}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.badge,
                                            backgroundColor: getStatusColor(ticket.status)
                                        }}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {ticket.attachments && ticket.attachments.length > 0 ? (
                                            <div style={styles.attachmentLinks}>
                                                {ticket.attachments.map((att, index) => (
                                                    <a
                                                        key={index}
                                                        href={att.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={styles.attachmentLink}
                                                    >
                                                        📎 {att.filename}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : (
                                            <span style={styles.noAttachment}>No files</span>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    setNewStatus(ticket.status);
                                                    setShowStatusModal(true);
                                                }}
                                                style={styles.statusButton}
                                            >
                                                Status
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ticket._id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Status Update Modal */}
            {showStatusModal && selectedTicket && (
                <div style={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
                    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3 style={styles.modalTitle}>Update Status</h3>
                        <p style={styles.modalTicket}>Ticket: {selectedTicket.title}</p>
                        
                        <form onSubmit={handleStatusUpdate}>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                style={styles.modalSelect}
                                required
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                            
                            <textarea
                                placeholder="Add a note (optional)"
                                value={statusNote}
                                onChange={(e) => setStatusNote(e.target.value)}
                                style={styles.modalTextarea}
                            />
                            
                            <div style={styles.modalActions}>
                                <button
                                    type="button"
                                    onClick={() => setShowStatusModal(false)}
                                    style={styles.modalCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={styles.modalSubmit}
                                    disabled={updating}
                                >
                                    {updating ? 'Updating...' : 'Update Status'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
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
    logoutButton: {
        padding: '0.6rem 1.2rem',
        background: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.95rem'
    },
    errorMsg: {
        background: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    },
    loading: {
        textAlign: 'center',
        padding: '3rem',
        color: '#586069',
        fontSize: '1.2rem'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
    },
    statCard: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        textAlign: 'center',
        borderBottom: '4px solid #6c757d',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    statNumber: {
        fontSize: '2rem',
        margin: 0,
        color: '#24292e'
    },
    statLabel: {
        color: '#586069',
        margin: '0.25rem 0 0 0'
    },
    chartsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    chartCard: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    chartTitle: {
        margin: '0 0 1rem 0',
        color: '#24292e',
        textAlign: 'center'
    },
    priorityContainer: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
        marginTop: 0,
        marginBottom: '1rem',
        color: '#24292e'
    },
    priorityGrid: {
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap'
    },
    priorityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    priorityDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%'
    },
    priorityName: {
        color: '#24292e'
    },
    priorityCount: {
        color: '#586069',
        fontWeight: 'bold'
    },
    filterContainer: {
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    searchInput: {
        flex: 1,
        minWidth: '150px',
        padding: '0.6rem',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        fontSize: '0.95rem'
    },
    filterSelect: {
        padding: '0.6rem',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        fontSize: '0.95rem'
    },
    searchButton: {
        padding: '0.6rem 1.2rem',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    resetButton: {
        padding: '0.6rem 1.2rem',
        background: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        background: 'white',
        borderRadius: '8px',
        color: '#586069'
    },
    tableContainer: {
        background: 'white',
        borderRadius: '8px',
        overflow: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        background: '#f6f8fa',
        borderBottom: '2px solid #e1e4e8'
    },
    th: {
        padding: '0.75rem 1rem',
        textAlign: 'left',
        fontWeight: '600',
        color: '#24292e'
    },
    tableRow: {
        borderBottom: '1px solid #e1e4e8'
    },
    td: {
        padding: '0.75rem 1rem',
        verticalAlign: 'middle'
    },
    ticketTitle: {
        fontWeight: '500',
        color: '#24292e'
    },
    ticketCategory: {
        fontSize: '0.75rem',
        color: '#586069'
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '500'
    },
    attachmentLinks: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    attachmentLink: {
        fontSize: '0.75rem',
        color: '#0366d6',
        textDecoration: 'none',
        padding: '2px 6px',
        background: '#f0f6ff',
        borderRadius: '4px',
        border: '1px solid #d1d5da',
        display: 'inline-block',
        width: 'fit-content'
    },
    noAttachment: {
        fontSize: '0.75rem',
        color: '#6a737d'
    },
    actionButtons: {
        display: 'flex',
        gap: '0.5rem'
    },
    statusButton: {
        padding: '0.3rem 0.6rem',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem'
    },
    deleteButton: {
        padding: '0.3rem 0.6rem',
        background: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    modalTitle: {
        marginTop: 0,
        marginBottom: '0.5rem',
        color: '#24292e'
    },
    modalTicket: {
        color: '#586069',
        marginBottom: '1rem'
    },
    modalSelect: {
        width: '100%',
        padding: '0.6rem',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        marginBottom: '0.75rem',
        fontSize: '0.95rem'
    },
    modalTextarea: {
        width: '100%',
        padding: '0.6rem',
        border: '1px solid #d1d5da',
        borderRadius: '4px',
        minHeight: '60px',
        marginBottom: '1rem',
        fontSize: '0.95rem',
        resize: 'vertical'
    },
    modalActions: {
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'flex-end'
    },
    modalCancel: {
        padding: '0.6rem 1.2rem',
        background: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    modalSubmit: {
        padding: '0.6rem 1.2rem',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default AdminDashboard;