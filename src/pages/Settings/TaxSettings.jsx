import React, { useState, useEffect } from "react";
import { DollarSign, Plus, Trash2, Edit2, Save, X, Percent, MapPin, Globe, AlertCircle } from 'lucide-react';

const TaxSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // General tax settings
  const [generalSettings, setGeneralSettings] = useState({
    enableTax: true,
    taxIncluded: false,
    displayTax: true,
    defaultTaxRate: "",
    taxCalculationMethod: "subtotal",
  });

  // Tax classes
  const [taxClasses, setTaxClasses] = useState([]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClass, setNewClass] = useState({ name: "", rate: "", description: "" });
  const [editingClass, setEditingClass] = useState(null);

  // Regional tax rates
  const [regionalRates, setRegionalRates] = useState([]);
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegion, setNewRegion] = useState({
    country: "",
    state: "",
    city: "",
    zipCode: "",
    rate: "",
  });

  // Fetch tax settings from API
  useEffect(() => {
    fetchTaxSettings();
    fetchTaxClasses();
    fetchRegionalRates();
  }, []);

  const fetchTaxSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tax/settings");
      if (!res.ok) throw new Error("Failed to fetch tax settings");
      const data = await res.json();
      setGeneralSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaxClasses = async () => {
    try {
      const res = await fetch("/api/admin/tax/classes");
      if (!res.ok) throw new Error("Failed to fetch tax classes");
      const data = await res.json();
      setTaxClasses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRegionalRates = async () => {
    try {
      const res = await fetch("/api/admin/tax/regional");
      if (!res.ok) throw new Error("Failed to fetch regional rates");
      const data = await res.json();
      setRegionalRates(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle general settings change
  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save general settings
  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/admin/tax/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalSettings),
      });
      if (!res.ok) throw new Error("Failed to save tax settings");
      setSuccess("Tax settings updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add tax class
  const handleAddClass = async () => {
    if (!newClass.name || !newClass.rate) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/tax/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClass),
      });
      if (!res.ok) throw new Error("Failed to add tax class");
      const data = await res.json();
      setTaxClasses([...taxClasses, data]);
      setNewClass({ name: "", rate: "", description: "" });
      setIsAddingClass(false);
      setSuccess("Tax class added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update tax class
  const handleUpdateClass = async (id) => {
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/admin/tax/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClass),
      });
      if (!res.ok) throw new Error("Failed to update tax class");
      const data = await res.json();
      setTaxClasses(taxClasses.map(tc => tc.id === id ? data : tc));
      setEditingClass(null);
      setSuccess("Tax class updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete tax class
  const handleDeleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tax class?")) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/admin/tax/classes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete tax class");
      setTaxClasses(taxClasses.filter(tc => tc.id !== id));
      setSuccess("Tax class deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add regional rate
  const handleAddRegion = async () => {
    if (!newRegion.country || !newRegion.rate) {
      setError("Country and rate are required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/tax/regional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRegion),
      });
      if (!res.ok) throw new Error("Failed to add regional rate");
      const data = await res.json();
      setRegionalRates([...regionalRates, data]);
      setNewRegion({ country: "", state: "", city: "", zipCode: "", rate: "" });
      setIsAddingRegion(false);
      setSuccess("Regional tax rate added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete regional rate
  const handleDeleteRegion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this regional rate?")) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/admin/tax/regional/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete regional rate");
      setRegionalRates(regionalRates.filter(rr => rr.id !== id));
      setSuccess("Regional tax rate deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <Percent className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">Tax Settings</h1>
                <p className="mt-1 text-blue-100">Manage tax rates, classes, and regional settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 flex items-start rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mr-3 mt-0.5 h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start rounded-lg border border-green-200 bg-green-50 p-4">
            <AlertCircle className="mr-3 mt-0.5 h-5 w-5 text-green-600" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <DollarSign className="mr-2 inline-block h-4 w-4" />
                General Settings
              </button>
              <button
                onClick={() => setActiveTab('classes')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'classes'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Percent className="mr-2 inline-block h-4 w-4" />
                Tax Classes
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'regional'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <MapPin className="mr-2 inline-block h-4 w-4" />
                Regional Rates
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-blue-900">General Tax Configuration</h3>
                  <p className="text-sm text-blue-700">Configure default tax settings for your store.</p>
                </div>

                <div className="space-y-6">
                  {/* Enable Tax Toggle */}
                  <div className="flex items-center justify-between border-b border-gray-200 py-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Enable Tax Calculation</h4>
                      <p className="text-sm text-gray-600">Apply taxes to products and orders</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGeneralSettings(prev => ({ ...prev, enableTax: !prev.enableTax }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.enableTax ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.enableTax ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Tax Included Toggle */}
                  <div className="flex items-center justify-between border-b border-gray-200 py-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Prices Include Tax</h4>
                      <p className="text-sm text-gray-600">Product prices already include tax</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGeneralSettings(prev => ({ ...prev, taxIncluded: !prev.taxIncluded }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.taxIncluded ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.taxIncluded ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Display Tax Toggle */}
                  <div className="flex items-center justify-between border-b border-gray-200 py-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Display Tax in Cart</h4>
                      <p className="text-sm text-gray-600">Show tax breakdown in cart and checkout</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGeneralSettings(prev => ({ ...prev, displayTax: !prev.displayTax }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.displayTax ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.displayTax ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Default Tax Rate */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <Percent className="mr-2 inline-block h-4 w-4" />
                      Default Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      name="defaultTaxRate"
                      value={generalSettings.defaultTaxRate}
                      onChange={handleGeneralChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      This rate will be applied when no specific rate is defined
                    </p>
                  </div>

                  {/* Tax Calculation Method */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tax Calculation Method
                    </label>
                    <select
                      name="taxCalculationMethod"
                      value={generalSettings.taxCalculationMethod}
                      onChange={handleGeneralChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="subtotal">Based on Subtotal</option>
                      <option value="line_item">Based on Line Items</option>
                      <option value="total">Based on Total (including shipping)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => fetchTaxSettings()}
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

            {/* Tax Classes Tab */}
            {activeTab === 'classes' && (
              <div className="space-y-6">
                <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-indigo-900">Tax Classes</h3>
                  <p className="text-sm text-indigo-700">Create different tax rates for different product categories.</p>
                </div>

                {/* Add New Class Button */}
                {!isAddingClass && (
                  <button
                    onClick={() => setIsAddingClass(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    Add Tax Class
                  </button>
                )}

                {/* Add New Class Form */}
                {isAddingClass && (
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Tax Class</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Class Name *
                        </label>
                        <input
                          type="text"
                          value={newClass.name}
                          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                          placeholder="e.g., Standard, Reduced, Zero"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tax Rate (%) *
                        </label>
                        <input
                          type="number"
                          value={newClass.rate}
                          onChange={(e) => setNewClass({ ...newClass, rate: e.target.value })}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          max="100"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={newClass.description}
                          onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                          placeholder="Optional description"
                          rows="3"
                          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setIsAddingClass(false);
                          setNewClass({ name: "", rate: "", description: "" });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddClass}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Class
                      </button>
                    </div>
                  </div>
                )}

                {/* Tax Classes List */}
                <div className="space-y-4">
                  {taxClasses.map((taxClass) => (
                    <div
                      key={taxClass.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                    >
                      {editingClass?.id === taxClass.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Class Name
                              </label>
                              <input
                                type="text"
                                value={editingClass.name}
                                onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tax Rate (%)
                              </label>
                              <input
                                type="number"
                                value={editingClass.rate}
                                onChange={(e) => setEditingClass({ ...editingClass, rate: e.target.value })}
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                              </label>
                              <textarea
                                value={editingClass.description}
                                onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                                rows="2"
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setEditingClass(null)}
                              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateClass(taxClass.id)}
                              disabled={loading}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-900">{taxClass.name}</h3>
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {taxClass.rate}%
                              </span>
                            </div>
                            {taxClass.description && (
                              <p className="mt-2 text-sm text-gray-600">{taxClass.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingClass(taxClass)}
                              className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClass(taxClass.id)}
                              className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {taxClasses.length === 0 && !isAddingClass && (
                    <div className="py-12 text-center">
                      <Percent className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No tax classes yet. Add your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Regional Rates Tab */}
            {activeTab === 'regional' && (
              <div className="space-y-6">
                <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-purple-900">Regional Tax Rates</h3>
                  <p className="text-sm text-purple-700">Set different tax rates for specific locations.</p>
                </div>

                {/* Add New Region Button */}
                {!isAddingRegion && (
                  <button
                    onClick={() => setIsAddingRegion(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
                  >
                    <Plus className="h-5 w-5" />
                    Add Regional Rate
                  </button>
                )}

                {/* Add New Region Form */}
                {isAddingRegion && (
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add Regional Tax Rate</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <Globe className="mr-2 inline-block h-4 w-4" />
                          Country *
                        </label>
                        <select
                          value={newRegion.country}
                          onChange={(e) => setNewRegion({ ...newRegion, country: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Country</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="India">India</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={newRegion.state}
                          onChange={(e) => setNewRegion({ ...newRegion, state: e.target.value })}
                          placeholder="Optional"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          value={newRegion.city}
                          onChange={(e) => setNewRegion({ ...newRegion, city: e.target.value })}
                          placeholder="Optional"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          value={newRegion.zipCode}
                          onChange={(e) => setNewRegion({ ...newRegion, zipCode: e.target.value })}
                          placeholder="Optional"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tax Rate (%) *
                        </label>
                        <input
                          type="number"
                          value={newRegion.rate}
                          onChange={(e) => setNewRegion({ ...newRegion, rate: e.target.value })}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          max="100"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setIsAddingRegion(false);
                          setNewRegion({ country: "", state: "", city: "", zipCode: "", rate: "" });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddRegion}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                      >
                        Add Rate
                      </button>
                    </div>
                  </div>
                )}

                {/* Regional Rates List */}
                <div className="space-y-4">
                  {regionalRates.map((region) => (
                    <div
                      key={region.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900">
                              {region.country}
                              {region.state && `, ${region.state}`}
                              {region.city && `, ${region.city}`}
                            </h3>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                              {region.rate}%
                            </span>
                          </div>
                          {region.zipCode && (
                            <p className="ml-8 text-sm text-gray-600">ZIP: {region.zipCode}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteRegion(region.id)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {regionalRates.length === 0 && !isAddingRegion && (
                    <div className="py-12 text-center">
                      <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                      <p className="text-gray-600">No regional rates yet. Add your first one!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSettings;