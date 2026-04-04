import { Link } from "react-router-dom";


const AuthNavbar = () => {
  return (
    <header className="w-full top-0 sticky z-50 bg-[#f7f9fb]">
      <div className="flex justify-between items-center w-full px-12 py-4 max-w-[1440px] mx-auto">
        <div className="text-2xl font-bold text-[#1E3A8A] font-headline">
          UniHub
        </div>

        <nav className="hidden md:flex gap-8 items-center font-headline font-semibold tracking-tight">
          <a
            className="text-[#566166] hover:text-[#4059aa] transition-colors duration-200"
            href="#"
          >
            Admissions
          </a>
          <a
            className="text-[#566166] hover:text-[#4059aa] transition-colors duration-200"
            href="#"
          >
            Library
          </a>
          <a
            className="text-[#566166] hover:text-[#4059aa] transition-colors duration-200"
            href="#"
          >
            Research
          </a>
          <a
            className="text-[#566166] hover:text-[#4059aa] transition-colors duration-200"
            href="#"
          >
            Campus Life
          </a>
        </nav>

        <div>
          <Link to="/signin">
            <button className="bg-[#4059aa] text-white px-6 py-2 rounded-full font-semibold hover:opacity-80 transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;