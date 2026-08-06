
const BookStats = ({ books }) => {
    const total = books.length;
    const wantToRead = books.filter(b => b.status === 'Want to Read').length;
    const reading = books.filter(b => b.status === 'Reading').length;
    const completed = books.filter(b => b.status === 'Completed').length;

    const stats = [
        { label: 'Total Books', value: total, color: 'bg-blue-500' },
        { label: 'Want to Read', value: wantToRead, color: 'bg-yellow-500' },
        { label: 'Reading', value: reading, color: 'bg-purple-500' },
        { label: 'Completed', value: completed, color: 'bg-green-500' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${stat.color} mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                        {stat.value}
                    </div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
            ))}
        </div>
    );
};

export default BookStats;