const SignUpFooter = () => {
  return (
    <footer className="bg-[#e1e9ee] w-full mt-auto flex flex-col md:flex-row justify-between items-center px-16 py-12">
      <div className="flex flex-col items-center md:items-start gap-2 mb-8 md:mb-0">
        <span className="text-lg font-bold text-[#2a3439] font-headline">
          UniHub
        </span>
        <p className="font-body text-xs font-medium uppercase tracking-widest text-[#566166] text-center md:text-left">
          © 2024 UniHub Academic Atelier. All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <a
          className="font-body text-xs font-medium uppercase tracking-widest text-[#566166] hover:text-[#4059aa] transition-opacity opacity-80 hover:opacity-100"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="font-body text-xs font-medium uppercase tracking-widest text-[#566166] hover:text-[#4059aa] transition-opacity opacity-80 hover:opacity-100"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="font-body text-xs font-medium uppercase tracking-widest text-[#566166] hover:text-[#4059aa] transition-opacity opacity-80 hover:opacity-100"
          href="#"
        >
          Accessibility
        </a>
        <a
          className="font-body text-xs font-medium uppercase tracking-widest text-[#566166] hover:text-[#4059aa] transition-opacity opacity-80 hover:opacity-100"
          href="#"
        >
          Contact Registry
        </a>
      </div>
    </footer>
  );
};

export default SignUpFooter;