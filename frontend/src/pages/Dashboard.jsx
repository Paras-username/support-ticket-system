import  { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import BookStats from '../components/BookStats';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import { LogOut, Plus } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTag, setFilterTag] = useState('');


    const fetchBooks = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filterStatus) params.status = filterStatus;
            if (filterTag) params.tag = filterTag;
            
            const response = await api.get('/books', { params });
            setBooks(response.data.books || []);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [filterStatus, filterTag]);

    

    const handleAddBook = async (bookData) => {
        try {
            const response = await api.post('/books', bookData);
            setBooks([response.data.book, ...books]);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleEditBook = async (bookData) => {
        try {
            const response = await api.put(`/books/${editingBook._id}`, bookData);
            setBooks(books.map(b => b._id === editingBook._id ? response.data.book : b));
            setEditingBook(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error editing book:', error);
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await api.delete(`/books/${bookId}`);
            setBooks(books.filter(b => b._id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const openEditForm = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    const allTags = [...new Set(books.flatMap(b => b.tags || []))];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            📚 Personal Book Manager
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 text-sm">
                                👋 {user?.name || 'User'}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <BookStats books={books} />

                {/* Filters & Add Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">All Status</option>
                            <option value="Want to Read">Want to Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Completed">Completed</option>
                        </select>

                        {allTags.length > 0 && (
                            <select
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="">All Tags</option>
                                {allTags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={20} />
                        Add Book
                    </button>
                </div>

                {/* Book List */}
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading books...</div>
                ) : books.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No books in your collection yet</p>
                        <p className="text-gray-400 text-sm mt-1">Click "Add Book" to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                onEdit={openEditForm}
                                onDelete={handleDeleteBook}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <BookForm
                    book={editingBook}
                    onSave={editingBook ? handleEditBook : handleAddBook}
                    onCancel={closeForm}
                />
            )}
        </div>
    );
};

export default Dashboard;