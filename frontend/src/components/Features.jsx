const Features = () => {
  return (
    <section className="py-24 bg-surface-container-low" id="features">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
            Infrastructure Management
          </h2>
          <p className="mt-4 text-on-surface-variant text-lg">
            Centralized control for every academic environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-sm group hover:shadow-md transition-all">
            <div className="flex flex-col h-full justify-between gap-12">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-4">
                  account_balance
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface">
                  Intelligent Lecture Halls
                </h3>
                <p className="mt-4 text-on-surface-variant leading-relaxed">
                  Automate HVAC, lighting, and AV systems based on real-time
                  attendance and scheduled courses. Reduce energy waste by 40%.
                </p>
              </div>

              <img
                alt="Lecture Hall"
                className="rounded-xl object-cover h-64 w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBZuP9_S6EcYaRSa58WsOv4eMAZaALCcEiYcmZtf_AzA-Qh1vSqPDrv9hiw7rswBnujGrz-PQ0ji0NoZT6UmWpMoDCUQAB_LR_4F4WdiM8uAc2NBqhDDF057nS0BGx7xskhtqJOB1YJg8u583UvGCdj6P_XXx4sQ7ggdso78pfn94Vn_bDx0IC-MfIo0WFHJ92EImwcj7RXC4xyAT1RdN_d7iXCbwHjH4QZ6Z3AceWMDKThSVe-_zSHHf-d6qoyRYRcMERJ3E5uDg"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              science
            </span>
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Lab Management
              </h3>
              <p className="mt-2 text-on-surface-variant text-sm">
                Real-time inventory tracking for chemicals, equipment, and
                sensitive instruments across all STEM departments.
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Learn more
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col gap-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              inventory_2
            </span>
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Equipment Lifecycle
              </h3>
              <p className="mt-2 text-on-surface-variant text-sm">
                From procurement to decommissioning. Track warranties and
                maintenance schedules automatically.
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Learn more
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-primary text-on-primary rounded-xl p-8 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            <div className="flex-1">
              <h3 className="font-headline text-2xl font-bold">
                Smart Access Control
              </h3>
              <p className="mt-4 opacity-80 leading-relaxed text-sm lg:text-base">
                Integrated ID card and mobile credential systems for secure,
                keyless entry to labs, faculty offices, and restricted zones.
              </p>
              <button className="mt-8 px-6 py-2.5 bg-on-primary text-primary rounded-xl font-bold text-sm">
                View Security Protocols
              </button>
            </div>

            <div className="flex-1 w-full h-full relative">
              <img
                alt="Security"
                className="rounded-xl object-cover h-48 w-full shadow-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCRgcUVHXVgOcfpIVpXQNuAc-GW2pM4Esu-OuvKVYIQyqWjl8eAK2TSMO1nhQ-RLms4tAFjONMdHgfZIYh1SPPDbW8ZOZM7ZWHHjXl4v6zvZygvKQBiTUyKdd5Z_VB-1Y9w8ww-thWbFbdcWEz8avvxbyyfePlSbPXCaEBCfCpM3j_-mcDjkYbHipIXF3I9IKk0TzRfsGyh85iQu7yvrfF749v8STAEmbylqQC9FqsnOW2iwp1lMHTBrsfihQH7S04P_0wwXeuRic"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;