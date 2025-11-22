import { useState } from "react";
import { Search, Star, ThumbsUp, ThumbsDown, MessageSquare, Flag, Check, X, Eye, Clock, Reply, CheckCircle, XCircle } from 'lucide-react';

export default function ProductReviews() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedReview, setSelectedReview] = useState(null);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const stats = [
        { label: 'Total Reviews', value: '2,847', icon: MessageSquare, color: 'blue', change: '+124 this month' },
        { label: 'Average Rating', value: '4.6', icon: Star, color: 'yellow', change: 'Out of 5.0' },
        { label: 'Pending Review', value: '18', icon: Clock, color: 'orange', change: 'Needs moderation' },
        { label: 'Response Rate', value: '89%', icon: Reply, color: 'green', change: '+5% from last month' }
    ];

    const ratingDistribution = [
        { stars: 5, count: 1842, percentage: 65 },
        { stars: 4, count: 568, percentage: 20 },
        { stars: 3, count: 256, percentage: 9 },
        { stars: 2, count: 114, percentage: 4 },
        { stars: 1, count: 67, percentage: 2 }
    ];

    const [reviews, setReviews] = useState([
        {
            id: 1,
            product: { name: 'Wireless Headphones Pro', sku: 'WHP-001', image: '🎧' },
            customer: { name: 'John Doe', email: 'john@example.com', avatar: '👤', verified: true, totalReviews: 12 },
            rating: 5,
            title: 'Best headphones I have ever owned!',
            content: 'The sound quality is absolutely incredible. Crystal clear highs and deep bass. The noise cancellation is top-notch and the battery life exceeds expectations.',
            images: ['📷', '📷'],
            date: '2024-11-20 10:30 AM',
            status: 'approved',
            helpful: 24,
            notHelpful: 2,
            reply: null,
            orderId: '#ORD-2024-089'
        },
        {
            id: 2,
            product: { name: 'Smart Watch Series 5', sku: 'SWS-005', image: '⌚' },
            customer: { name: 'Sarah Miller', email: 'sarah@example.com', avatar: '👩', verified: true, totalReviews: 5 },
            rating: 4,
            title: 'Great watch, minor software issues',
            content: 'Love the design and features. Fitness tracking is accurate and the display is beautiful. Only giving 4 stars because the app sometimes disconnects.',
            images: [],
            date: '2024-11-19 3:45 PM',
            status: 'approved',
            helpful: 18,
            notHelpful: 1,
            reply: { text: 'Thank you for your feedback! We are improving app connectivity.', date: '2024-11-19 5:00 PM' },
            orderId: '#ORD-2024-076'
        },
        {
            id: 3,
            product: { name: 'USB-C Fast Charger', sku: 'UFC-010', image: '🔌' },
            customer: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '👨', verified: false, totalReviews: 1 },
            rating: 2,
            title: 'Stopped working after a week',
            content: 'Charger worked fine initially but stopped charging after about a week of use. Very disappointed with the quality.',
            images: ['📷'],
            date: '2024-11-18 9:15 AM',
            status: 'pending',
            helpful: 5,
            notHelpful: 0,
            reply: null,
            orderId: '#ORD-2024-052'
        },
        {
            id: 4,
            product: { name: 'Premium Leather Wallet', sku: 'PLW-003', image: '👛' },
            customer: { name: 'Emily Chen', email: 'emily@example.com', avatar: '👧', verified: true, totalReviews: 8 },
            rating: 5,
            title: 'Excellent quality leather',
            content: 'The craftsmanship is superb. Real leather that smells amazing. Perfect size with plenty of card slots!',
            images: ['📷', '📷', '📷'],
            date: '2024-11-17 2:20 PM',
            status: 'approved',
            helpful: 32,
            notHelpful: 0,
            reply: null,
            orderId: '#ORD-2024-041'
        },
        {
            id: 5,
            product: { name: 'Bluetooth Speaker Mini', sku: 'BSM-004', image: '🔊' },
            customer: { name: 'Anonymous', email: 'anon@example.com', avatar: '👤', verified: false, totalReviews: 0 },
            rating: 1,
            title: 'Product does not work',
            content: 'Very disappointed. Product arrived and does not turn on at all. Requesting a refund.',
            images: [],
            date: '2024-11-16 11:00 AM',
            status: 'flagged',
            helpful: 0,
            notHelpful: 12,
            reply: null,
            orderId: null
        },
        {
            id: 6,
            product: { name: 'Running Shoes Elite', sku: 'RSE-007', image: '👟' },
            customer: { name: 'David Park', email: 'david@example.com', avatar: '🧑', verified: true, totalReviews: 3 },
            rating: 5,
            title: 'Perfect for marathons',
            content: 'Ran my first marathon in these and they performed beautifully. Great cushioning and support. No blisters!',
            images: ['📷'],
            date: '2024-11-15 8:30 AM',
            status: 'pending',
            helpful: 41,
            notHelpful: 1,
            reply: null,
            orderId: '#ORD-2024-033'
        }
    ]);

    const tabs = [
        { id: 'all', label: 'All Reviews', count: reviews.length },
        { id: 'pending', label: 'Pending', count: reviews.filter(r => r.status === 'pending').length },
        { id: 'approved', label: 'Approved', count: reviews.filter(r => r.status === 'approved').length },
        { id: 'flagged', label: 'Flagged', count: reviews.filter(r => r.status === 'flagged').length }
    ];

    const filteredReviews = reviews.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = filterRating === 'all' || r.rating === parseInt(filterRating);
        const matchesTab = activeTab === 'all' || r.status === activeTab;
        return matchesSearch && matchesRating && matchesTab;
    });

    const renderStars = (rating) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    );

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            flagged: 'bg-red-100 text-red-800',
            rejected: 'bg-gray-100 text-gray-800'
        };
        const icons = { pending: Clock, approved: CheckCircle, flagged: Flag, rejected: XCircle };
        const Icon = icons[status];
        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
                <Icon className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleApprove = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    const handleReject = (id) => setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r));

    const openReplyModal = (review) => {
        setSelectedReview(review);
        setReplyText(review.reply?.text || '');
        setShowReplyModal(true);
    };

    const submitReply = () => {
        if (!replyText.trim()) return;
        setReviews(reviews.map(r =>
            r.id === selectedReview.id
                ? { ...r, reply: { text: replyText, date: new Date().toLocaleString() } }
                : r
        ));
        setShowReplyModal(false);
        setReplyText('');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
                    <p className="mt-1 text-gray-600">Manage and respond to customer reviews</p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="rounded-lg bg-white p-5 shadow">
                            <div className="flex items-center gap-4">
                                <div className={`rounded-lg p-3 ${stat.color === 'blue' ? 'bg-blue-100' :
                                        stat.color === 'yellow' ? 'bg-yellow-100' :
                                            stat.color === 'orange' ? 'bg-orange-100' : 'bg-green-100'
                                    }`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color === 'blue' ? 'text-blue-600' :
                                            stat.color === 'yellow' ? 'text-yellow-600 fill-yellow-600' :
                                                stat.color === 'orange' ? 'text-orange-600' : 'text-green-600'
                                        }`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-xs text-gray-400">{stat.change}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">Rating Distribution</h3>
                            <div className="mb-4 text-center">
                                <p className="text-4xl font-bold text-gray-900">4.6</p>
                                <div className="mt-1 flex justify-center">{renderStars(5)}</div>
                                <p className="mt-1 text-sm text-gray-500">2,847 reviews</p>
                            </div>
                            <div className="space-y-2">
                                {ratingDistribution.map(item => (
                                    <div key={item.stars} className="flex items-center gap-2">
                                        <span className="w-3 text-sm text-gray-600">{item.stars}</span>
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                                            <div className="h-2 rounded-full bg-yellow-400" style={{ width: `${item.percentage}%` }} />
                                        </div>
                                        <span className="w-12 text-right text-xs text-gray-500">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-sm font-semibold text-gray-900">Quick Filters</h3>
                            <div className="space-y-2">
                                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50">
                                    <span>With Photos</span>
                                    <span className="text-gray-400">156</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50">
                                    <span>Verified Purchase</span>
                                    <span className="text-gray-400">2,341</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50">
                                    <span>No Response Yet</span>
                                    <span className="text-gray-400">312</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="mb-4 rounded-lg bg-white p-4 shadow">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-1 border-b pb-3">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {tab.label}
                                            <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                                {tab.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search reviews..."
                                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                                        <option value="all">All Ratings</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="highest">Highest Rated</option>
                                        <option value="lowest">Lowest Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredReviews.map(review => (
                                <div key={review.id} className={`rounded-lg bg-white p-6 shadow ${review.status === 'flagged' ? 'border-l-4 border-l-red-500' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                                {review.customer.avatar}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{review.customer.name}</span>
                                                    {review.customer.verified && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                            <Check className="h-3 w-3" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                    <span>{review.date}</span>
                                                    {review.orderId && <span>Order: {review.orderId}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        {getStatusBadge(review.status)}
                                    </div>

                                    <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                        <span className="text-2xl">{review.product.image}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{review.product.name}</p>
                                            <p className="text-xs text-gray-500">{review.product.sku}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center gap-2">
                                            {renderStars(review.rating)}
                                            <span className="font-medium text-gray-900">{review.title}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-700">{review.content}</p>

                                        {review.images.length > 0 && (
                                            <div className="mt-3 flex gap-2">
                                                {review.images.map((img, idx) => (
                                                    <div key={idx} className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-2xl">{img}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {review.reply && (
                                        <div className="mt-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-50 p-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                                                <Reply className="h-4 w-4" /> Store Response
                                            </div>
                                            <p className="mt-1 text-sm text-blue-900">{review.reply.text}</p>
                                            <p className="mt-1 text-xs text-blue-600">{review.reply.date}</p>
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {review.helpful} helpful</span>
                                            <span className="flex items-center gap-1"><ThumbsDown className="h-4 w-4" /> {review.notHelpful}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openReplyModal(review)} className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                                                <Reply className="h-4 w-4" /> {review.reply ? 'Edit' : 'Reply'}
                                            </button>
                                            {review.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleApprove(review.id)} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700">Approve</button>
                                                    <button onClick={() => handleReject(review.id)} className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Reject</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredReviews.length === 0 && (
                            <div className="rounded-lg bg-white p-12 text-center shadow">
                                <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews found</h3>
                                <p className="mt-2 text-sm text-gray-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showReplyModal && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">{selectedReview.reply ? 'Edit Response' : 'Write Response'}</h3>
                            <button onClick={() => setShowReplyModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4 rounded-lg bg-gray-50 p-4">
                            <div className="flex items-center gap-2">
                                {renderStars(selectedReview.rating)}
                                <span className="font-medium text-gray-900">{selectedReview.title}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{selectedReview.content}</p>
                            <p className="mt-2 text-xs text-gray-400">— {selectedReview.customer.name}</p>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">Your Response</label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a professional response..."
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowReplyModal(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">Cancel</button>
                            <button onClick={submitReply} disabled={!replyText.trim()} className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                                {selectedReview.reply ? 'Update' : 'Post'} Response
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}