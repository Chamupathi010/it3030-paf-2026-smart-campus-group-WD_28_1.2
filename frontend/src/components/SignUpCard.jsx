import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpCard = () => {
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "University email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!data.terms) {
      newErrors.terms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(updatedData);
    setErrors(validate(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: role.toUpperCase(),
    };

    try {
      const resp = await fetch("http://localhost:8080/api/auth/register", { // adjust URL as needed change it 8081 to 8080
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const err = await resp.json();
        // show message from backend, e.g. err.message
        console.error("Register failed:", err);
        return;
      }

      const data = await resp.json();
      console.log("Registered:", data);
      // navigate("/signin") or /dashboard after success
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const passwordStrength = () => {
    let score = 0;
    if (formData.password.length >= 6) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;
    return score;
  };

  const strength = passwordStrength();

  return (
    <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl p-10 md:p-12 shadow-sm">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-2">
          Create Your UniHub Account
        </h1>
        <p className="text-on-surface-variant font-body">
          Join your university&apos;s smart campus ecosystem.
        </p>
      </div>

      <div className="mb-8">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-variant text-on-primary-container font-headline font-bold py-4 px-6 rounded-xl transition-all duration-200"
        >
          <span className="material-symbols-outlined">account_balance</span>
          Sign up with Google
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-grow bg-outline-variant opacity-20"></div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-outline uppercase font-label">
          OR SIGN UP WITH EMAIL
        </span>
        <div className="h-px flex-grow bg-outline-variant opacity-20"></div>
      </div>

      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface-variant tracking-wide font-label uppercase">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Alex Morgan"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-surface-container-lowest border py-3 px-4 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body outline-none ${
                errors.fullName
                  ? "border-red-500"
                  : "border-outline-variant/20"
              }`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface-variant tracking-wide font-label uppercase">
              University Email Address
            </label>
            <input
              name="email"
              type="text"
              placeholder="student@university.edu"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-surface-container-lowest border py-3 px-4 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body outline-none ${
                errors.email ? "border-red-500" : "border-outline-variant/20"
              }`}
            />
            <p className="text-[10px] text-outline mt-1 italic">
              Please use your official .edu institutional email
            </p>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-on-surface-variant tracking-wide font-label uppercase">
              Select Your Role
            </label>

            <div className="flex flex-wrap gap-2">
              {["Student", "Staff", "Technician"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    role === item
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant tracking-wide font-label uppercase">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-surface-container-lowest border py-3 px-4 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-outline-variant/20"
                }`}
              />

              <div className="flex gap-1 mt-2">
                <div
                  className={`h-1 flex-grow rounded-full ${
                    strength >= 1 ? "bg-primary" : "bg-outline-variant/30"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-grow rounded-full ${
                    strength >= 2 ? "bg-primary" : "bg-outline-variant/30"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-grow rounded-full ${
                    strength >= 3 ? "bg-primary" : "bg-outline-variant/30"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-grow rounded-full ${
                    strength >= 4 ? "bg-primary" : "bg-outline-variant/30"
                  }`}
                ></div>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant tracking-wide font-label uppercase">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-surface-container-lowest border py-3 px-4 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface font-body outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-outline-variant/20"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            className="mt-1 rounded text-primary focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-sm text-on-surface-variant leading-relaxed font-body"
          >
            I agree to the{" "}
            <a className="text-primary font-semibold hover:underline" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-primary font-semibold hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/10 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-on-surface-variant font-body">
          Already have an account?
          <Link to="/signin" className="text-primary font-bold hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpCard;