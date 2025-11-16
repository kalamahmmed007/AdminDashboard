import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        await new Promise((r) => setTimeout(r, 800));

        // Dummy credentials
        if (form.email === "admin@test.com" && form.password === "admin123") {
            localStorage.setItem("adminLoggedIn", "true");
            navigate("/");
        } else {
            setError("Invalid email or password");
        }

        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="animate-float relative w-full max-w-md transform rounded-2xl border-4 border-red-600 bg-white p-8 shadow-2xl transition-all hover:scale-105">
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <UserCircle2 className="h-16 w-16 text-red-600" />
                </div>

                <h2 className="mb-6 text-center text-3xl font-bold text-black">
                    Admin Login
                </h2>

                {error && (
                    <div className="mb-4 text-center font-medium text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="admin@test.com"
                            required
                            className="w-full rounded-xl border border-black px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-xl border border-black px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-black"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-700">
                    Demo credentials: <br />
                    <span className="font-medium text-red-600">
                        admin@test.com / admin123
                    </span>
                </p>
            </div>

            {/* Floating animation keyframes */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}
            </style>
        </div>
    );
}
