import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="flex min-h-screen">
            {/* Left Side - Animated Image Section */}
            <div className="relative hidden overflow-hidden bg-blue-600 lg:flex lg:w-1/2">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="animate-blob absolute left-0 top-0 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-xl filter"></div>
                    <div className="animate-blob animation-delay-2000 absolute right-0 top-0 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-xl filter"></div>
                    <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-xl filter"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex w-full flex-col items-center justify-center p-12 text-white">
                    {/* Animated Illustration */}
                    <div className="relative mb-8">
                        {/* Main Circle with Animation */}
                        <div className="animate-float relative h-80 w-80">
                            {/* Outer Ring */}
                            <div className="animate-spin-slow absolute inset-0 rounded-full border-4 border-white/30"></div>
                            
                            {/* Middle Ring */}
                            <div className="animate-spin-reverse absolute inset-8 rounded-full border-4 border-white/20"></div>
                            
                            {/* Inner Circle */}
                            <div className="absolute inset-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                {/* Dashboard Icon Illustration */}
                                <svg className="animate-pulse-slow h-32 w-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>

                            {/* Floating Particles */}
                            <div className="animate-bounce-slow absolute -right-4 -top-4 h-8 w-8 rounded-full bg-white/20"></div>
                            <div className="animate-bounce-slow animation-delay-1000 absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-white/20"></div>
                            <div className="animate-bounce-slow animation-delay-2000 absolute -right-8 top-1/2 h-4 w-4 rounded-full bg-white/20"></div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="max-w-md text-center">
                        <h1 className="animate-fade-in mb-4 text-4xl font-bold">Welcome to Dashboard</h1>
                        <p className="animate-fade-in animation-delay-500 text-lg text-white/80">
                            Manage your business analytics, track performance, and make data-driven decisions all in one place.
                        </p>
                    </div>

                    {/* Feature Icons */}
                    <div className="animate-fade-in animation-delay-1000 mt-12 grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                <span className="text-3xl">📊</span>
                            </div>
                            <p className="text-sm text-white/70">Analytics</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                <span className="text-3xl">📈</span>
                            </div>
                            <p className="text-sm text-white/70">Reports</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <p className="text-sm text-white/70">Insights</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Logo and Company Name */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
                            <span className="text-4xl">🏢</span>
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-gray-900">Company Name</h2>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                    <span>⚠️</span>
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-400">📧</span>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="admin@test.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-400">🔒</span>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        <span className="text-gray-400 hover:text-gray-600">
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                                </label>
                                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin">⏳</span>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="mb-2 text-sm font-semibold text-blue-900">Demo Credentials:</p>
                            <p className="text-xs text-blue-700">Email: admin@test.com</p>
                            <p className="text-xs text-blue-700">Password: admin123</p>
                        </div>

                        {/* Divider */}
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                                <span className="text-xl">G</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                                <span className="text-xl">f</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                                <span className="text-xl">in</span>
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 15s linear infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }

                .animation-delay-500 {
                    animation-delay: 0.5s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}