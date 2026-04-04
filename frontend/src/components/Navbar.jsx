import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold text-blue-900 tracking-tight">
          UniHub
        </div>

        <div className="hidden md:flex items-center gap-8 font-semibold">
          <a href="#features" className="text-blue-700 border-b-2 border-blue-700 pb-1">
            Features
          </a>
          <a href="#resources" className="text-slate-600 hover:text-blue-800">
            Resources
          </a>
          <a href="#reporting" className="text-slate-600 hover:text-blue-800">
            Reporting
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 rounded-xl font-semibold text-blue-800 hover:bg-slate-200"
          >
            Sign In
          </button>

          <button className="hidden lg:block px-6 py-2 rounded-xl bg-primary text-white font-bold">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;