const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
            The Smart Campus Standard
          </span>

          <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-on-surface leading-[1.1] tracking-tight">
            Empowering Your <br />
            <span className="text-primary">Campus Experience.</span>
          </h1>

          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Streamline operations, optimize facility usage, and enhance student
            engagement with the unified operating system designed for the modern
            academic institution.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold shadow-lg hover:-translate-y-[2px] transition-all">
              Launch Dashboard
            </button>
            <button className="px-8 py-4 rounded-xl bg-surface-container-highest text-primary font-headline font-bold hover:bg-surface-container-high transition-all">
              View Demo
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              alt="Academic Building"
              className="w-full h-auto object-cover aspect-[4/3]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0uD-HjD7L7vdFB7IFaqtDEBEWADMLi_haUguUd8w1DgqayxSDJEsjibHM9oSb-Cm6jkBHRpI-bn06oX8w8H5X-8Bl8RJv3DRMMfHqXzU6kYlWFCUsIHFpd2Z2T_O-5JjT2EHyX9pu10cAvRGBQYtSOdDK7Fj9La86-_RNKiMVzqUKilH3Oa2by4g5Jmj4lu0yfwZpkyG0tz1bY_vBL6ABgGtvZoloKsaYuz5ICywnubU2DO1nuOG8UdrIImgPIt77sXAWkQaKTk"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 z-20 bg-surface-container-lowest p-6 rounded-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">98% Efficiency</div>
              <div className="text-xs text-on-surface-variant">
                Resource Allocation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;