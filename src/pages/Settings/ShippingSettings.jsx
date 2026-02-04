import React, { useState, useEffect } from "react";
import { 
  Truck, Plus, Trash2, Edit2, Save, X, Package, MapPin, 
  DollarSign, Clock, Globe, Settings, AlertCircle, Check,
  ChevronDown, ChevronUp, GripVertical
} from 'lucide-react';

const ShippingSettings = () => {
  const [activeTab, setActiveTab] = useState('methods');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Shipping Methods State
  const [shippingMethods, setShippingMethods] = useState([]);
  const [isAddingMethod, setIsAddingMethod] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    deliveryTime: "",
    costType: "flat", // flat, percentage, free
    cost: "",
    freeThreshold: "",
    status: true
  });

  // Shipping Zones State
  const [shippingZones, setShippingZones] = useState([]);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [expandedZone, setExpandedZone] = useState(null);
  const [newZone, setNewZone] = useState({
    name: "",
    countries: [],
    defaultMethod: "",
    methodOverrides: []
  });

  // Carrier Settings State
  const [carriers, setCarriers] = useState([]);
  const [editingCarrier, setEditingCarrier] = useState(null);

  // Free Shipping Rules State
  const [freeShippingRules, setFreeShippingRules] = useState([]);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    type: "amount", // amount, user_type, product_category
    value: "",
    applyTo: "all"
  });

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    defaultMethod: "",
    handlingFee: "",
    enableDimensions: false,
    defaultWeight: "",
    weightUnit: "kg",
    dimensionUnit: "cm"
  });

  const countries = [
    "Bangladesh", "United States", "United Kingdom", "Canada", 
    "Australia", "India", "Pakistan", "Germany", "France", "Japan"
  ];

  // Fetch all data on mount
  useEffect(() => {
    fetchShippingMethods();
    fetchShippingZones();
    fetchCarriers();
    fetchFreeShippingRules();
    fetchGeneralSettings();
  }, []);

  // API Calls - Shipping Methods
  const fetchShippingMethods = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shipping/methods");
      if (!res.ok) throw new Error("Failed to fetch shipping methods");
      const data = await res.json();
      setShippingMethods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMethod = async () => {
    if (!newMethod.name || !newMethod.deliveryTime) {
      setError("Name and delivery time are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/shipping/methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMethod),
      });
      if (!res.ok) throw new Error("Failed to add shipping method");
      const data = await res.json();
      setShippingMethods([...shippingMethods, data]);
      setNewMethod({
        name: "", description: "", deliveryTime: "", costType: "flat",
        cost: "", freeThreshold: "", status: true
      });
      setIsAddingMethod(false);
      setSuccess("Shipping method added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMethod = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/methods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMethod),
      });
      if (!res.ok) throw new Error("Failed to update shipping method");
      const data = await res.json();
      setShippingMethods(shippingMethods.map(m => m.id === id ? data : m));
      setEditingMethod(null);
      setSuccess("Shipping method updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMethod = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping method?")) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/methods/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete shipping method");
      setShippingMethods(shippingMethods.filter(m => m.id !== id));
      setSuccess("Shipping method deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMethodStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/shipping/methods/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle status");
      const data = await res.json();
      setShippingMethods(shippingMethods.map(m => m.id === id ? data : m));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API Calls - Shipping Zones
  const fetchShippingZones = async () => {
    try {
      const res = await fetch("/api/admin/shipping/zones");
      if (!res.ok) throw new Error("Failed to fetch shipping zones");
      const data = await res.json();
      setShippingZones(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddZone = async () => {
    if (!newZone.name || newZone.countries.length === 0) {
      setError("Zone name and at least one country are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/shipping/zones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newZone),
      });
      if (!res.ok) throw new Error("Failed to add shipping zone");
      const data = await res.json();
      setShippingZones([...shippingZones, data]);
      setNewZone({ name: "", countries: [], defaultMethod: "", methodOverrides: [] });
      setIsAddingZone(false);
      setSuccess("Shipping zone added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateZone = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/zones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingZone),
      });
      if (!res.ok) throw new Error("Failed to update shipping zone");
      const data = await res.json();
      setShippingZones(shippingZones.map(z => z.id === id ? data : z));
      setEditingZone(null);
      setSuccess("Shipping zone updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZone = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping zone?")) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/zones/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete shipping zone");
      setShippingZones(shippingZones.filter(z => z.id !== id));
      setSuccess("Shipping zone deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API Calls - Carriers
  const fetchCarriers = async () => {
    try {
      const res = await fetch("/api/admin/shipping/carriers");
      if (!res.ok) throw new Error("Failed to fetch carriers");
      const data = await res.json();
      setCarriers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCarrier = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/carriers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCarrier),
      });
      if (!res.ok) throw new Error("Failed to update carrier");
      const data = await res.json();
      setCarriers(carriers.map(c => c.id === id ? data : c));
      setEditingCarrier(null);
      setSuccess("Carrier settings updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCarrier = async (id, currentStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/shipping/carriers/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle carrier");
      const data = await res.json();
      setCarriers(carriers.map(c => c.id === id ? data : c));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API Calls - Free Shipping Rules
  const fetchFreeShippingRules = async () => {
    try {
      const res = await fetch("/api/admin/shipping/free-rules");
      if (!res.ok) throw new Error("Failed to fetch free shipping rules");
      const data = await res.json();
      setFreeShippingRules(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddRule = async () => {
    if (!newRule.name || !newRule.value) {
      setError("Name and value are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/shipping/free-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      });
      if (!res.ok) throw new Error("Failed to add free shipping rule");
      const data = await res.json();
      setFreeShippingRules([...freeShippingRules, data]);
      setNewRule({ name: "", type: "amount", value: "", applyTo: "all" });
      setIsAddingRule(false);
      setSuccess("Free shipping rule added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRule = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rule?")) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipping/free-rules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete rule");
      setFreeShippingRules(freeShippingRules.filter(r => r.id !== id));
      setSuccess("Rule deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API Calls - General Settings
  const fetchGeneralSettings = async () => {
    try {
      const res = await fetch("/api/admin/shipping/settings");
      if (!res.ok) throw new Error("Failed to fetch general settings");
      const data = await res.json();
      setGeneralSettings(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveGeneralSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/shipping/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalSettings),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setSuccess("General settings updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">Shipping Settings</h1>
                <p className="mt-1 text-blue-100">Manage shipping methods, zones, and carrier integrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 flex items-start rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mr-3 mt-0.5 h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-700">Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
            <button onClick={() => setError("")} className="ml-auto">
              <X className="h-5 w-5 text-red-400 hover:text-red-600" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start rounded-lg border border-green-200 bg-green-50 p-4">
            <Check className="mr-3 mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-700">Success</p>
              <p className="text-sm text-green-600">{success}</p>
            </div>
            <button onClick={() => setSuccess("")} className="ml-auto">
              <X className="h-5 w-5 text-green-400 hover:text-green-600" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('methods')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'methods'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Package className="mr-2 inline-block h-4 w-4" />
                Shipping Methods
              </button>
              <button
                onClick={() => setActiveTab('zones')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'zones'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="mr-2 inline-block h-4 w-4" />
                Shipping Zones
              </button>
              <button
                onClick={() => setActiveTab('carriers')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'carriers'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Truck className="mr-2 inline-block h-4 w-4" />
                Carriers
              </button>
              <button
                onClick={() => setActiveTab('free-shipping')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'free-shipping'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <DollarSign className="mr-2 inline-block h-4 w-4" />
                Free Shipping
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="mr-2 inline-block h-4 w-4" />
                General
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* Shipping Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-blue-900">Shipping Methods</h3>
                  <p className="text-sm text-blue-700">Configure available shipping options for your customers.</p>
                </div>

                {!isAddingMethod && (
                  <button
                    onClick={() => setIsAddingMethod(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    Add Shipping Method
                  </button>
                )}

                {/* Add New Method Form */}
                {isAddingMethod && (
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add Shipping Method</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Method Name *
                        </label>
                        <input
                          type="text"
                          value={newMethod.name}
                          onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                          placeholder="e.g., Standard Shipping, Express"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={newMethod.description}
                          onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                          placeholder="Brief description"
                          rows="2"
                          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <Clock className="mr-2 inline-block h-4 w-4" />
                          Delivery Time *
                        </label>
                        <input
                          type="text"
                          value={newMethod.deliveryTime}
                          onChange={(e) => setNewMethod({ ...newMethod, deliveryTime: e.target.value })}
                          placeholder="e.g., 3-5 business days"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Cost Type
                        </label>
                        <select
                          value={newMethod.costType}
                          onChange={(e) => setNewMethod({ ...newMethod, costType: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="flat">Flat Rate</option>
                          <option value="percentage">Percentage of Order</option>
                          <option value="free">Free</option>
                        </select>
                      </div>
                      {newMethod.costType !== 'free' && (
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            {newMethod.costType === 'percentage' ? 'Percentage (%)' : 'Cost'}
                          </label>
                          <input
                            type="number"
                            value={newMethod.cost}
                            onChange={(e) => setNewMethod({ ...newMethod, cost: e.target.value })}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Free Threshold (optional)
                        </label>
                        <input
                          type="number"
                          value={newMethod.freeThreshold}
                          onChange={(e) => setNewMethod({ ...newMethod, freeThreshold: e.target.value })}
                          placeholder="Free above this amount"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => {
                          setIsAddingMethod(false);
                          setNewMethod({
                            name: "", description: "", deliveryTime: "", 
                            costType: "flat", cost: "", freeThreshold: "", status: true
                          });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddMethod}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Method
                      </button>
                    </div>
                  </div>
                )}

                {/* Shipping Methods List */}
                <div className="space-y-4">
                  {shippingMethods.map((method, index) => (
                    <div
                      key={method.id}
                      className="rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
                    >
                      {editingMethod?.id === method.id ? (
                        <div className="space-y-4 p-6">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-gray-700">Method Name</label>
                              <input
                                type="text"
                                value={editingMethod.name}
                                onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                value={editingMethod.description}
                                onChange={(e) => setEditingMethod({ ...editingMethod, description: e.target.value })}
                                rows="2"
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">Delivery Time</label>
                              <input
                                type="text"
                                value={editingMethod.deliveryTime}
                                onChange={(e) => setEditingMethod({ ...editingMethod, deliveryTime: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">Cost</label>
                              <input
                                type="number"
                                value={editingMethod.cost}
                                onChange={(e) => setEditingMethod({ ...editingMethod, cost: e.target.value })}
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setEditingMethod(null)}
                              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateMethod(method.id)}
                              disabled={loading}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="cursor-move">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <div className="mb-2 flex items-center gap-3">
                                  <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    method.status 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {method.status ? 'Active' : 'Inactive'}
                                  </span>
                                  {method.costType === 'free' && (
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                      FREE
                                    </span>
                                  )}
                                </div>
                                {method.description && (
                                  <p className="mb-3 text-sm text-gray-600">{method.description}</p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {method.deliveryTime}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <DollarSign className="mr-1 h-4 w-4" />
                                    {method.costType === 'free' ? 'Free' : 
                                     method.costType === 'percentage' ? `${method.cost}%` : 
                                     `$${method.cost}`}
                                  </div>
                                  {method.freeThreshold && (
                                    <div className="text-green-600">
                                      Free above ${method.freeThreshold}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                              <button
                                onClick={() => handleToggleMethodStatus(method.id, method.status)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  method.status ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  method.status ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                              <button
                                onClick={() => setEditingMethod(method)}
                                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMethod(method.id)}
                                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {shippingMethods.length === 0 && !isAddingMethod && (
                    <div className="py-12 text-center">
                      <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No shipping methods yet. Add your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Shipping Zones Tab */}
            {activeTab === 'zones' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-indigo-900">Shipping Zones</h3>
                  <p className="text-sm text-indigo-700">Group countries with specific shipping rules and methods.</p>
                </div>

                {!isAddingZone && (
                  <button
                    onClick={() => setIsAddingZone(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    Add Shipping Zone
                  </button>
                )}

                {/* Add New Zone Form */}
                {isAddingZone && (
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add Shipping Zone</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Zone Name *</label>
                        <input
                          type="text"
                          value={newZone.name}
                          onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                          placeholder="e.g., North America, Europe"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <Globe className="mr-2 inline-block h-4 w-4" />
                          Countries *
                        </label>
                        <select
                          multiple
                          value={newZone.countries}
                          onChange={(e) => setNewZone({ 
                            ...newZone, 
                            countries: Array.from(e.target.selectedOptions, option => option.value)
                          })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          size="5"
                        >
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Default Shipping Method</label>
                        <select
                          value={newZone.defaultMethod}
                          onChange={(e) => setNewZone({ ...newZone, defaultMethod: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select default method</option>
                          {shippingMethods.filter(m => m.status).map(method => (
                            <option key={method.id} value={method.id}>{method.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => {
                          setIsAddingZone(false);
                          setNewZone({ name: "", countries: [], defaultMethod: "", methodOverrides: [] });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddZone}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Zone
                      </button>
                    </div>
                  </div>
                )}

                {/* Shipping Zones List */}
                <div className="space-y-4">
                  {shippingZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
                    >
                      {editingZone?.id === zone.id ? (
                        <div className="space-y-4 p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">Zone Name</label>
                              <input
                                type="text"
                                value={editingZone.name}
                                onChange={(e) => setEditingZone({ ...editingZone, name: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">Countries</label>
                              <select
                                multiple
                                value={editingZone.countries}
                                onChange={(e) => setEditingZone({ 
                                  ...editingZone, 
                                  countries: Array.from(e.target.selectedOptions, option => option.value)
                                })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                size="4"
                              >
                                {countries.map(country => (
                                  <option key={country} value={country}>{country}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setEditingZone(null)}
                              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateZone(zone.id)}
                              disabled={loading}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="mb-3 flex items-center gap-3">
                                  <MapPin className="h-5 w-5 text-gray-400" />
                                  <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                    {zone.countries.length} countries
                                  </span>
                                </div>
                                <div className="mb-3 flex flex-wrap gap-2">
                                  {zone.countries.slice(0, 5).map((country, idx) => (
                                    <span key={idx} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                                      {country}
                                    </span>
                                  ))}
                                  {zone.countries.length > 5 && (
                                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                      +{zone.countries.length - 5} more
                                    </span>
                                  )}
                                </div>
                                {zone.defaultMethod && (
                                  <p className="text-sm text-gray-600">
                                    Default: {shippingMethods.find(m => m.id === zone.defaultMethod)?.name}
                                  </p>
                                )}
                              </div>
                              <div className="ml-4 flex items-center gap-2">
                                <button
                                  onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-50"
                                >
                                  {expandedZone === zone.id ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => setEditingZone(zone)}
                                  className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                >
                                  <Edit2 className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteZone(zone.id)}
                                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {expandedZone === zone.id && (
                            <div className="border-t border-gray-200 bg-gray-50 p-6">
                              <h4 className="mb-3 text-sm font-semibold text-gray-900">Available Methods:</h4>
                              <div className="space-y-2">
                                {shippingMethods.filter(m => m.status).map(method => (
                                  <div key={method.id} className="flex items-center justify-between rounded-lg bg-white p-3">
                                    <span className="text-sm text-gray-900">{method.name}</span>
                                    <span className="text-sm text-gray-600">{method.deliveryTime}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}

                  {shippingZones.length === 0 && !isAddingZone && (
                    <div className="py-12 text-center">
                      <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No shipping zones yet. Create your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Carriers Tab */}
            {activeTab === 'carriers' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-purple-900">Carrier Integrations</h3>
                  <p className="text-sm text-purple-700">Connect with shipping providers for live rate calculations.</p>
                </div>

                <div className="space-y-4">
                  {carriers.map((carrier) => (
                    <div
                      key={carrier.id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      {editingCarrier?.id === carrier.id ? (
                        <div className="space-y-4 p-6">
                          <h3 className="text-lg font-semibold text-gray-900">{carrier.name}</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">API Key</label>
                              <input
                                type="password"
                                value={editingCarrier.apiKey || ''}
                                onChange={(e) => setEditingCarrier({ ...editingCarrier, apiKey: e.target.value })}
                                placeholder="Enter API key"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">Account ID</label>
                              <input
                                type="text"
                                value={editingCarrier.accountId || ''}
                                onChange={(e) => setEditingCarrier({ ...editingCarrier, accountId: e.target.value })}
                                placeholder="Enter account ID"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 py-3">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Live Rate Calculation</h4>
                                <p className="text-sm text-gray-600">Get real-time shipping rates</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setEditingCarrier({ 
                                  ...editingCarrier, 
                                  liveRates: !editingCarrier.liveRates 
                                })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  editingCarrier.liveRates ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  editingCarrier.liveRates ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setEditingCarrier(null)}
                              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateCarrier(carrier.id)}
                              disabled={loading}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                                <Truck className="h-6 w-6 text-gray-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{carrier.name}</h3>
                                <p className="text-sm text-gray-600">{carrier.description}</p>
                                {carrier.apiKey && (
                                  <p className="mt-1 text-xs text-green-600">✓ Configured</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleCarrier(carrier.id, carrier.enabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  carrier.enabled ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                              >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  carrier.enabled ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                              <button
                                onClick={() => setEditingCarrier(carrier)}
                                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                              >
                                <Settings className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {carriers.length === 0 && (
                    <div className="py-12 text-center">
                      <Truck className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No carriers configured yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Free Shipping Tab */}
            {activeTab === 'free-shipping' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-green-900">Free Shipping Rules</h3>
                  <p className="text-sm text-green-700">Set conditions for when customers get free shipping.</p>
                </div>

                {!isAddingRule && (
                  <button
                    onClick={() => setIsAddingRule(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    Add Free Shipping Rule
                  </button>
                )}

                {/* Add New Rule Form */}
                {isAddingRule && (
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add Free Shipping Rule</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Rule Name *</label>
                        <input
                          type="text"
                          value={newRule.name}
                          onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                          placeholder="e.g., Free shipping over $50"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Rule Type</label>
                        <select
                          value={newRule.type}
                          onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="amount">Minimum Order Amount</option>
                          <option value="user_type">User Type</option>
                          <option value="product_category">Product Category</option>
                          <option value="coupon">Coupon Code</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Value *</label>
                        {newRule.type === 'amount' ? (
                          <input
                            type="number"
                            value={newRule.value}
                            onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                            placeholder="50.00"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <input
                            type="text"
                            value={newRule.value}
                            onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                            placeholder="Enter value"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Apply To</label>
                        <select
                          value={newRule.applyTo}
                          onChange={(e) => setNewRule({ ...newRule, applyTo: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Products</option>
                          <option value="specific">Specific Products</option>
                          <option value="categories">Specific Categories</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => {
                          setIsAddingRule(false);
                          setNewRule({ name: "", type: "amount", value: "", applyTo: "all" });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddRule}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Rule
                      </button>
                    </div>
                  </div>
                )}

                {/* Free Shipping Rules List */}
                <div className="space-y-4">
                  {freeShippingRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">{rule.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="mr-2 font-medium">Type:</span>
                              {rule.type === 'amount' ? 'Minimum Amount' : 
                               rule.type === 'user_type' ? 'User Type' : 
                               rule.type === 'product_category' ? 'Product Category' : 'Coupon Code'}
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2 font-medium">Value:</span>
                              {rule.type === 'amount' ? `$${rule.value}` : rule.value}
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2 font-medium">Apply To:</span>
                              {rule.applyTo === 'all' ? 'All Products' : 
                               rule.applyTo === 'specific' ? 'Specific Products' : 'Specific Categories'}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="ml-4 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {freeShippingRules.length === 0 && !isAddingRule && (
                    <div className="py-12 text-center">
                      <DollarSign className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No free shipping rules yet. Create your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-blue-900">General Shipping Configuration</h3>
                  <p className="text-sm text-blue-700">Configure default shipping settings and package dimensions.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Default Shipping Method
                    </label>
                    <select
                      value={generalSettings.defaultMethod}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, defaultMethod: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select default method</option>
                      {shippingMethods.filter(m => m.status).map(method => (
                        <option key={method.id} value={method.id}>{method.name}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">This method will appear first at checkout</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <DollarSign className="mr-2 inline-block h-4 w-4" />
                      Handling Fee
                    </label>
                    <input
                      type="number"
                      value={generalSettings.handlingFee}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, handlingFee: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Additional charge per order</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Package Dimensions & Weight</h4>
                        <p className="text-sm text-gray-600">Enable for accurate shipping cost calculation</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGeneralSettings({ 
                          ...generalSettings, 
                          enableDimensions: !generalSettings.enableDimensions 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          generalSettings.enableDimensions ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.enableDimensions ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {generalSettings.enableDimensions && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Default Weight
                          </label>
                          <input
                            type="number"
                            value={generalSettings.defaultWeight}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, defaultWeight: e.target.value })}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Weight Unit
                          </label>
                          <select
                            value={generalSettings.weightUnit}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, weightUnit: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="kg">Kilograms (kg)</option>
                            <option value="lb">Pounds (lb)</option>
                            <option value="g">Grams (g)</option>
                            <option value="oz">Ounces (oz)</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Dimension Unit
                          </label>
                          <select
                            value={generalSettings.dimensionUnit}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, dimensionUnit: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="cm">Centimeters (cm)</option>
                            <option value="in">Inches (in)</option>
                            <option value="m">Meters (m)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={fetchGeneralSettings}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSettings;