// OrderTimeline.jsx
export default function OrderTimeline({ status }) {
    const steps = ["placed", "paid", "shipped", "delivered"];
    return (
        <div className="flex justify-between items-center my-4">
            {steps.map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${steps.indexOf(status) >= i ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                        {i + 1}
                    </div>
                    <span className="text-xs mt-1 capitalize">{step}</span>
                    {i < steps.length - 1 && <div className={`flex-1 h-1 ${steps.indexOf(status) >= i ? "bg-green-600" : "bg-gray-300"}`}></div>}
                </div>
            ))}
        </div>
    );
}
