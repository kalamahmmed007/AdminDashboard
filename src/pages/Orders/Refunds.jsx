import { useState, useEffect } from "react";
import {
  ArrowLeft, Search, DollarSign, Clock, CheckCircle, XCircle,
  AlertCircle, RefreshCw, Eye, ArrowUpRight, ArrowDownRight, X
} from 'lucide-react';

export default function Refunds() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processAction, setProcessAction] = useState(null);

  // Fetch refunds from API
  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://your-api.com/refunds"); // replace with your API
      if (!res.ok) throw new Error("Failed to fetch refunds");
      const data = await res.json();
      setRefunds(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Process refund (approve/reject)
  const processRefund = async (reason = "") => {
    if (!selectedRefund) return;
    try {
      const res = await fetch(`https://your-api.com/refunds/${selectedRefund.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: processAction === 'approve' ? 'approved' : 'rejected',
          reason
        })
      });
      if (!res.ok) throw new Error("Failed to update refund");
      const updatedRefund = await res.json();
      setRefunds(prev => prev.map(r => r.id === updatedRefund.id ? updatedRefund : r));
    } catch (err) {
      alert(err.message);
    } finally {
      setShowProcessModal(false);
      setSelectedRefund(null);
      setProcessAction(null);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Refunds', count: refunds.length },
    { id: 'pending', label: 'Pending', count: refunds.filter(r => r.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: refunds.filter(r => r.status === 'processing').length },
    { id: 'approved', label: 'Approved', count: refunds.filter(r => r.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: refunds.filter(r => r.status === 'rejected').length }
  ];

  const filteredRefunds = refunds.filter(r => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    const icons = { pending: Clock, processing: RefreshCw, approved: CheckCircle, rejected: XCircle };
    const Icon = icons[status];
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
        <Icon className="h-3 w-3" /> {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const openProcessModal = (refund, action) => {
    setSelectedRefund(refund);
    setProcessAction(action);
    setShowProcessModal(true);
  };

  if (loading) return <p className="mt-20 text-center text-gray-500">Loading refunds...</p>;
  if (error) return <p className="mt-20 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <button className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" /> Back to Orders
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Refunds</h1>
              <p className="mt-1 text-gray-600">Manage customer refund requests</p>
            </div>
            <button
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
              onClick={fetchRefunds}
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search refunds..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none sm:w-64"
            />
          </div>
        </div>

        {/* Refunds List */}
        <div className="space-y-4">
          {filteredRefunds.map(refund => (
            <div key={refund.id} className="rounded-lg bg-white p-6 shadow">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">{refund.customer.avatar}</div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{refund.id}</h3>
                      {getStatusBadge(refund.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600"><span className="font-medium">{refund.customer.name}</span> • {refund.orderId}</p>
                    <p className="mt-2 text-sm text-gray-700"><span className="font-medium text-gray-900">Reason:</span> {refund.reason}</p>
                    <p className="mt-1 text-sm text-gray-500">{refund.description}</p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-6 lg:text-right">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${refund.amount.toFixed(2)}</p>
                    <p className="mt-1 text-xs text-gray-500">{refund.requestDate}</p>
                    <p className="mt-1 text-xs text-gray-500">{refund.paymentMethod}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRefund(selectedRefund?.id === refund.id ? null : refund)}
                      className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    {refund.status === 'pending' && (
                      <>
                        <button
                          onClick={() => openProcessModal(refund, 'approve')}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                        >Approve</button>
                        <button
                          onClick={() => openProcessModal(refund, 'reject')}
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >Reject</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRefunds.length === 0 && (
            <div className="rounded-lg bg-white p-12 text-center shadow">
              <DollarSign className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No refunds found</h3>
              <p className="mt-2 text-sm text-gray-500">No refund requests match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Process Modal */}
      {showProcessModal && selectedRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{processAction === 'approve' ? 'Approve Refund' : 'Reject Refund'}</h3>
              <button onClick={() => setShowProcessModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Refund ID: <span className="font-medium text-gray-900">{selectedRefund.id}</span></p>
              <p className="text-sm text-gray-600">Customer: <span className="font-medium text-gray-900">{selectedRefund.customer.name}</span></p>
              <p className="mt-2 text-xl font-bold text-gray-900">${selectedRefund.amount.toFixed(2)}</p>
            </div>

            {processAction === 'reject' && (
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Rejection Reason</label>
                <textarea
                  id="rejectionReason"
                  placeholder="Explain why this refund is being rejected..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                  rows="3"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setShowProcessModal(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => {
                  const reason = processAction === 'reject' ? document.getElementById('rejectionReason')?.value || '' : '';
                  processRefund(reason);
                }}
                className={`flex-1 rounded-lg px-4 py-2 text-white ${processAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {processAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
