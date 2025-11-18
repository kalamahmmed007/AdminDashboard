import React from "react";

export default function OrderTimeline({ status, timestamps }) {
    const steps = ["placed", "paid", "shipped", "delivered"];
    const icons = ["🛒", "💳", "🚚", "✅"];
    const STATUS_COLORS = {
        placed: "bg-yellow-400",
        paid: "bg-blue-400",
        shipped: "bg-orange-400",
        delivered: "bg-green-500",
        cancelled: "bg-red-500",
        return: "bg-purple-500",
    };

    // index of current status
    let currentIndex = steps.indexOf(status.toLowerCase());
    if (status.toLowerCase() === "cancelled") currentIndex = -1;
    if (status.toLowerCase() === "return") currentIndex = -1;

    return (
        <div className="my-4 flex flex-col items-center md:flex-row md:justify-between">
            {steps.map((step, i) => {
                const completed = i <= currentIndex;
                const isCurrent = i === currentIndex;

                return (
                    <div key={step} className="relative my-2 flex flex-1 flex-col items-center md:mx-2 md:my-0">
                        {/* Step circle */}
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${completed
                                    ? STATUS_COLORS[step]
                                    : "bg-gray-300 text-gray-600"
                                } ${isCurrent ? "animate-pulse shadow-lg" : ""}`}
                            title={timestamps?.[step] ?? ""}
                        >
                            {icons[i]}
                        </div>

                        {/* Step label */}
                        <span className="mt-1 text-xs capitalize">{step}</span>

                        {/* Connecting line */}
                        {i < steps.length - 1 && (
                            <div className={`absolute left-1/2 top-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-300 md:bottom-0 md:left-auto md:top-auto md:h-1 md:w-full md:translate-x-0 md:translate-y-0`}>
                                <div
                                    className={`h-full w-full bg-green-500 transition-all duration-500`}
                                    style={{
                                        width: completed ? "100%" : "0%",
                                        backgroundColor: completed
                                            ? STATUS_COLORS[step]
                                            : "bg-gray-300",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Special statuses */}
            {(status.toLowerCase() === "cancelled" || status.toLowerCase() === "return") && (
                <div className="mt-4 flex flex-1 flex-col items-center md:mt-0">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${STATUS_COLORS[status.toLowerCase()]
                            } animate-pulse`}
                    >
                        {status.toLowerCase() === "cancelled" ? "❌" : "↩️"}
                    </div>
                    <span className="mt-1 text-xs capitalize">{status}</span>
                </div>
            )}
        </div>
    );
}
