import React, { useState, useEffect } from "react";
import { Store, Mail, Phone, MapPin, DollarSign, Upload, Save, X, Globe, Image as ImageIcon } from 'lucide-react';

const StoreSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [logoPreview, setLogoPreview] = useState(null);
  const [store, setStore] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Bangladesh",
    zipCode: "",
    currency: "USD",
    taxRate: "",
    description: "",
    website: "",
    logo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock fetch store info from backend
  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/store");
        if (!res.ok) throw new Error("Failed to fetch store info");
        const data = await res.json();
        setStore(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files[0]) {
      const file = files[0];
      setStore((prev) => ({ ...prev, logo: file.name }));
      
      // Preview the logo
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setStore((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(store),
      });
      if (!res.ok) throw new Error("Failed to save store settings");
      alert("Store settings updated successfully!");
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
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-6 pb-6">
            <div className="-mt-16 flex flex-col items-center sm:-mt-12 sm:flex-row sm:items-end">
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-xl">
                  {logoPreview || store.logo ? (
                    <img 
                      src={logoPreview || `/logos/${store.logo}`} 
                      alt="Store Logo" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                      <Store className="h-16 w-16 text-white" />
                    </div>
                  )}
                </div>
                <label htmlFor="logo-upload" className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50">
                  <Upload className="h-5 w-5 text-gray-700" />
                  <input
                    id="logo-upload"
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {store.name || "Your Store Name"}
                </h1>
                <p className="mt-1 text-gray-600">{store.email || "store@example.com"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
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
                <Store className="mr-2 inline-block h-4 w-4" />
                General Information
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === 'business'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <DollarSign className="mr-2 inline-block h-4 w-4" />
                Business Settings
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* General Information Tab */}
            {activeTab === 'general' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-blue-900">Store Information</h3>
                  <p className="text-sm text-blue-700">Update your store's basic information and contact details.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <Store className="mr-2 inline-block h-4 w-4" />
                      Store Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={store.name}
                      onChange={handleChange}
                      placeholder="Enter your store name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <Mail className="mr-2 inline-block h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={store.email}
                      onChange={handleChange}
                      placeholder="store@example.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <Phone className="mr-2 inline-block h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={store.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <Globe className="mr-2 inline-block h-4 w-4" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={store.website}
                      onChange={handleChange}
                      placeholder="https://yourstore.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Store Description
                    </label>
                    <textarea
                      name="description"
                      value={store.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell customers about your store..."
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                    <MapPin className="mr-2 h-5 w-5" />
                    Store Address
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={store.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={store.city}
                        onChange={handleChange}
                        placeholder="Dhaka"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={store.zipCode}
                        onChange={handleChange}
                        placeholder="1000"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        name="country"
                        value={store.country}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Bangladesh</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* Business Settings Tab */}
            {activeTab === 'business' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-indigo-900">Business Configuration</h3>
                  <p className="text-sm text-indigo-700">Configure your store's currency, tax rates, and business settings.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <DollarSign className="mr-2 inline-block h-4 w-4" />
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={store.currency}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="BDT">BDT - Bangladeshi Taka</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      name="taxRate"
                      value={store.taxRate}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Store Logo</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100">
                      {logoPreview || store.logo ? (
                        <img 
                          src={logoPreview || `/logos/${store.logo}`} 
                          alt="Store Logo" 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Upload Store Logo
                      </label>
                      <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      />
                      {store.logo && (
                        <p className="mt-2 text-sm text-gray-600">Current Logo: {store.logo}</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Recommended size: 512x512px. Max file size: 2MB. Formats: JPG, PNG, SVG
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Enable Online Orders</h4>
                        <p className="text-sm text-gray-600">Allow customers to place orders online</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors"
                      >
                        <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Show Store in Marketplace</h4>
                        <p className="text-sm text-gray-600">Make your store visible in public marketplace</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors"
                      >
                        <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Inventory Notifications</h4>
                        <p className="text-sm text-gray-600">Get notified when products are low in stock</p>
                      </div>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors"
                      >
                        <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
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

export default StoreSettings;