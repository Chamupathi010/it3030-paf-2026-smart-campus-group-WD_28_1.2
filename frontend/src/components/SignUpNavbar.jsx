import { Link } from "react-router-dom";

const SignUpNavbar = () => {
  return (
    <nav className="bg-[#f0f4f7] w-full flex justify-between items-center px-12 py-4 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tighter text-[#1E3A8A] font-headline">
          UniHub
        </span>

        <div className="hidden md:flex gap-6">
          <a
            className="text-[#566166] hover:text-[#2a3439] font-headline font-semibold tracking-tight text-sm transition-colors duration-200"
            href="#"
          >
            Campus
          </a>
          <a
            className="text-[#566166] hover:text-[#2a3439] font-headline font-semibold tracking-tight text-sm transition-colors duration-200"
            href="#"
          >
            Courses
          </a>
          <a
            className="text-[#566166] hover:text-[#2a3439] font-headline font-semibold tracking-tight text-sm transition-colors duration-200"
            href="#"
          >
            Research
          </a>
          <a
            className="text-[#566166] hover:text-[#2a3439] font-headline font-semibold tracking-tight text-sm transition-colors duration-200"
            href="#"
          >
            Student Life
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-[#566166] hover:text-[#2a3439] font-headline font-semibold tracking-tight text-sm px-4 py-2 rounded-xl transition-colors duration-200">
          Support
        </button>

        <Link to="/signin">
          <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-semibold tracking-tight text-sm px-6 py-2 rounded-xl scale-95 duration-150 ease-in-out hover:opacity-90">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default SignUpNavbar;
