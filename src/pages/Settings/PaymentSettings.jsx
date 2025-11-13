import React from "react";

export default function PaymentSettings() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
                Connect your preferred payment gateways.
            </p>
            <div className="space-y-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" /> Enable Stripe
                </label>
                <input className="p-2 border rounded w-full" placeholder="Stripe API Key" />
                <label className="flex items-center gap-2">
                    <input type="checkbox" /> Enable PayPal
                </label>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Save Payment Settings
                </button>
            </div>
        </div>
    );
}
