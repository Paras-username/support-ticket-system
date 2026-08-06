import  { useState } from 'react';
import { Pencil, Trash2, BookOpen, BookMarked, CheckCircle } from 'lucide-react';

const statusIcons = {
    'Want to Read': <BookOpen size={16} className="text-yellow-500" />,
    'Reading': <BookMarked size={16} className="text-purple-500" />,
    'Completed': <CheckCircle size={16} className="text-green-500" />,
};

const statusColors = {
    'Want to Read': 'bg-yellow-100 text-yellow-800',
    'Reading': 'bg-purple-100 text-purple-800',
    'Completed': 'bg-green-100 text-green-800',
};

const BookCard = ({ book, onEdit, onDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 text-sm">by {book.author}</p>
                    
                    {book.tags && book.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {book.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[book.status]}`}>
                            {statusIcons[book.status]} {book.status}
                        </span>
                    </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => onEdit(book)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">Delete Book</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete "{book.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(book._id);
                                    setShowDeleteConfirm(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCard;