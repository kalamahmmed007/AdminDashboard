// src/components/RedxDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://sandbox.redx.com.bd/v1.0.0-beta";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzM1NTMxNjU2LCJpc3MiOiJ0OTlnbEVnZTBUTm5MYTNvalh6MG9VaGxtNEVoamNFMyIsInNob3BfaWQiOjEsInVzZXJfaWQiOjZ9.zpKfyHK6zPBVaTrYevnCqnUA-e2jFKQJ7lK-z4aOx2g";

const RedxDashboard = ({ trackingId }) => {
    const [data, setData] = useState({
        sorting: 0,
        transit: 0,
        hub: 0,
        delivery: 0,
        hold: 0,
    });

    const [loading, setLoading] = useState(true);

    // Fetch tracking details
    const loadTracking = async () => {
        try {
            const res = await axios.get(`${API_BASE}/parcel/track/${trackingId}`, {
                headers: {
                    "API-ACCESS-TOKEN": `Bearer ${TOKEN}`,
                },
            });

            const trackList = res.data?.tracking || [];

            let sorting = 0,
                transit = 0,
                hub = 0,
                delivery = 0,
                hold = 0;

            trackList.forEach((step) => {
                const msg = step.message_en.toLowerCase();

                if (msg.includes("sorting")) sorting++;
                else if (msg.includes("in transit")) transit++;
                else if (msg.includes("hub")) hub++;
                else if (msg.includes("delivery")) delivery++;
                else if (msg.includes("hold")) hold++;
            });

            setData({ sorting, transit, hub, delivery, hold });
        } catch (err) {
            console.log("Error loading tracking:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTracking();
    }, [trackingId]);

    if (loading)
        return (
            <p className="mt-4 animate-pulse text-center text-gray-500">
                Loading REDX data...
            </p>
        );

    const total =
        data.sorting + data.transit + data.hub + data.delivery + data.hold;

    const steps = [
        { label: "At Sorting", value: data.sorting, emoji: "📦", color: "bg-yellow-400" },
        { label: "In Transit", value: data.transit, emoji: "🚚", color: "bg-blue-400" },
        { label: "At Delivery Hub", value: data.hub, emoji: "🏢", color: "bg-purple-400" },
        { label: "Delivery in Progress", value: data.delivery, emoji: "📬", color: "bg-green-400" },
        { label: "Hold", value: data.hold, emoji: "⏸️", color: "bg-red-400" },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-6 text-center text-xl font-bold text-red-600">
                🚀 Forward In Progress Breakdown
            </h2>

            {/* Total */}
            <div className="mb-6 flex justify-center">
                <div className="w-40 rounded-xl bg-gray-100 p-4 text-center shadow-md dark:bg-gray-700">
                    <div className="text-3xl font-extrabold text-red-600">{total}</div>
                    <p className="mt-1 font-medium text-gray-500 dark:text-gray-300">
                        Total Forward in Progress
                    </p>
                </div>
            </div>

            {/* Steps with vertical progress bars */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {steps.map((step, index) => {
                    const percentage = total > 0 ? (step.value / total) * 100 : 0;
                    return (
                        <div
                            key={index}
                            className="flex transform flex-col items-center justify-between rounded-xl bg-gray-50 p-4 shadow-md transition hover:scale-105 dark:bg-gray-700"
                        >
                            <div className="mb-2 text-3xl">{step.emoji}</div>
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {step.value}
                            </div>
                            <div className="mt-1 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                                {step.label}
                            </div>
                            {/* Vertical progress bar */}
                            <div className="relative mt-4 h-24 w-2 overflow-hidden rounded-full bg-gray-300">
                                <div
                                    className={`${step.color} absolute bottom-0 w-full rounded-full transition-all duration-700`}
                                    style={{ height: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RedxDashboard;
