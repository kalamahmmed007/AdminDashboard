import React from "react";

const sales = [
    { name: "Pisang Kepok", price: "Rp25,000", qty: 65434, change: "+10%" },
    { name: "Kelapa Ijo", price: "Rp35,000", qty: 34434, change: "+2.2%" },
    { name: "Mangga Manalagi", price: "Rp40,000", qty: 21234, change: "-1.5%" },
];

export default function TopSalesCard() {
    // Calculate total orders
    const totalOrders = sales.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Top Sales Products
            </h3>

            {/* Total Orders */}
            <div className="text-sm text-red-600 font-semibold mb-3">
                Total Orders: {totalOrders.toLocaleString()}
            </div>

            {sales.map((item) => (
                <div
                    key={item.name}
                    className="flex justify-between items-center border-b last:border-none py-2"
                >
                    <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                            {item.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            {item.price} • Qty: {item.qty.toLocaleString()}
                        </div>
                    </div>
                    <div
                        className={`font-semibold ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {item.change}
                    </div>
                </div>
            ))}
        </div>
    );
}
