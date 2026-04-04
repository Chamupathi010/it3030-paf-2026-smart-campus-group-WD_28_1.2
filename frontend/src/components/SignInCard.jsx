import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) return;

    const payload = {
      email,
      password,
    };

    try {
      const resp = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const err = await resp.json();
        console.error("Login failed:", err);
        setErrors({
          email: "",
          password: err.message || "Login failed. Please try again.",
        });
        return;
      }

      const data = await resp.json();
      console.log("Login successful:", data);
      navigate("/login-success");
    } catch (err) {
      console.error("Network error:", err);
      setErrors({
        email: "",
        password: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl p-10 shadow-[0_32px_64px_-12px_rgba(42,52,57,0.06)] ring-1 ring-outline-variant/10">
      <div className="text-center mb-10">
        <h1 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight mb-2">
          Sign In
        </h1>
        <p className="text-on-surface-variant font-medium">
          Welcome back to UniHub
        </p>
      </div>

      <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google"
        />
        Continue with Google
      </button>

      <div className="relative my-8 flex items-center">
        <div className="flex-grow h-px bg-outline-variant/20"></div>
        <span className="px-4 text-xs font-bold uppercase tracking-widest text-outline">
          or sign in with email
        </span>
        <div className="flex-grow h-px bg-outline-variant/20"></div>
      </div>

      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="block font-headline text-sm font-bold text-on-surface ml-1"
            htmlFor="email"
          >
            Email Address
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">
              mail
            </span>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
              }}
              placeholder="e.g., student@university.edu"
              className={`w-full pl-12 pr-4 py-3 bg-surface-container-low border rounded-xl outline-none transition-all font-body text-on-surface placeholder:text-outline/60 ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-outline-variant/20 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              }`}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500 font-medium ml-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label
              className="block font-headline text-sm font-bold text-on-surface"
              htmlFor="password"
            >
              Password
            </label>

            <a
              className="text-xs font-bold text-primary hover:underline underline-offset-4"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">
              lock
            </span>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setErrors((prev) => ({
                  ...prev,
                  password: validatePassword(value),
                }));
              }}
              placeholder="••••••••"
              className={`w-full pl-12 pr-4 py-3 bg-surface-container-low border rounded-xl outline-none transition-all font-body text-on-surface placeholder:text-outline/60 ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-outline-variant/20 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              }`}
            />
          </div>

          {errors.password && (
            <p className="text-sm text-red-500 font-medium ml-1">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 px-1">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium text-on-surface-variant cursor-pointer select-none"
          >
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-surface-container-highest text-primary font-headline font-bold py-3.5 px-6 rounded-xl hover:bg-surface-variant transition-all mt-4"
        >
          Sign In
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
        <p className="text-sm font-medium text-on-surface-variant">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="text-primary font-bold hover:underline underline-offset-4 ml-1"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInCard;