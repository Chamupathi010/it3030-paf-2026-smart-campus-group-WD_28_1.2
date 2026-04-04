const CTA = () => {
  return (
    <section className="py-32 px-8 text-center bg-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="font-headline text-5xl font-extrabold text-on-surface leading-tight">
          Ready to modernize your campus?
        </h2>

        <p className="text-xl text-on-surface-variant">
          Join 50+ leading universities already optimizing their operations with
          UniHub.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
          <div className="p-8 rounded-2xl bg-surface-container-low flex-1 hover:bg-surface-container transition-all group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              school
            </span>
            <h4 className="font-headline text-xl font-bold mb-2">
              For Institutions
            </h4>
            <p className="text-sm text-on-surface-variant mb-6">
              Scalable solutions for entire university systems.
            </p>
            <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold">
              Contact Enterprise
            </button>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low flex-1 hover:bg-surface-container transition-all group">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              person
            </span>
            <h4 className="font-headline text-xl font-bold mb-2">
              For Individuals
            </h4>
            <p className="text-sm text-on-surface-variant mb-6">
              Sign up with your university email address.
            </p>
            <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;