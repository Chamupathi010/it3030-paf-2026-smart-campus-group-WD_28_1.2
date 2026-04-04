const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#e1e9ee] border-t border-slate-200/10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-1 mb-6 md:mb-0">
          <div className="font-headline font-bold text-[#2a3439] text-lg">
            UniHub
          </div>
          <p className="font-body text-sm tracking-wide text-[#566166]">
            © 2024 UniHub Academic Systems. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a
            href="#"
            className="font-body text-sm tracking-wide text-[#566166] hover:text-[#1E3A8A] underline underline-offset-4 transition-all duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-wide text-[#566166] hover:text-[#1E3A8A] underline underline-offset-4 transition-all duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-wide text-[#566166] hover:text-[#1E3A8A] underline underline-offset-4 transition-all duration-300"
          >
            Accessibility
          </a>
          <a
            href="#"
            className="font-body text-sm tracking-wide text-[#566166] hover:text-[#1E3A8A] underline underline-offset-4 transition-all duration-300"
          >
            IT Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;