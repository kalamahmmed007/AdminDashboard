import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // backend login expects email + password
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // dispatch login thunk from authSlice
      const user = await dispatch(login(form)).unwrap(); // unwrap to get actual result or error

      // optional: save token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(user));

      navigate("/dashboard"); // redirect after login
    } catch (err) {
      // backend error message
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-20 flex w-full max-w-sm flex-col gap-4">
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="rounded border p-2"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="rounded border p-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}
