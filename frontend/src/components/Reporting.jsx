const Reporting = () => {
  return (
    <section className="py-24 bg-surface-container-highest/30" id="reporting">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
            Operational Resilience
          </h2>
          <p className="mt-4 text-on-surface-variant text-lg">
            Instant maintenance reporting and incident tracking keeps the campus
            running at peak performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-secondary-container rounded-lg">
                <span className="material-symbols-outlined text-on-secondary-container">
                  report
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                ID: #4492
              </span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">HVAC Malfunction</h5>
            <p className="text-xs text-on-surface-variant mb-4">
              Lecture Hall 102 • Reported 2h ago
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Urgent
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-container rounded-lg">
                <span className="material-symbols-outlined text-on-primary-container">
                  build
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                ID: #4489
              </span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">Projector Bulb</h5>
            <p className="text-xs text-on-surface-variant mb-4">
              Seminar Room B • Reported 5h ago
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                In Progress
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-secondary-container/50 rounded-lg">
                <span className="material-symbols-outlined text-secondary">
                  cleaning_services
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                ID: #4487
              </span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">Spill Reported</h5>
            <p className="text-xs text-on-surface-variant mb-4">
              Common Area • Reported 1h ago
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                Dispatched
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-tertiary-container rounded-lg">
                <span className="material-symbols-outlined text-on-tertiary-container">
                  check_circle
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                ID: #4480
              </span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">Elevator Check</h5>
            <p className="text-xs text-on-surface-variant mb-4">
              Main Admin • Completed 1d ago
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">
                Resolved
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div className="flex-1 p-12 bg-primary text-on-primary">
            <h4 className="font-headline text-3xl font-bold mb-6">
              Real-time Oversight
            </h4>
            <p className="opacity-90 leading-relaxed mb-8 text-lg">
              Administrators get a bird&apos;s-eye view of all ongoing
              operations, allowing for data-driven staffing and budget
              decisions.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-extrabold mb-1">4.2m</div>
                <div className="text-xs uppercase tracking-widest opacity-70">
                  Mean Resolution Time
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold mb-1">99.9%</div>
                <div className="text-xs uppercase tracking-widest opacity-70">
                  Uptime across facilities
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-1 bg-surface-container-highest">
            <img
              alt="Data Analytics"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE7vVzQKM9__3SfpESBciYMbO2j3srHnH5FLtACGll-rS1rOsqNMti6OLsGWywFn7lCXGqGou83Y2CVC9HOJPo_OjRKsp6dtX5kNynQYfi4c_nJHoRS7Gsqdo4edQxFWjEImqEgkM4VvpcipFIQ-15nr87F-gmplqpM8ZRrwIACGGcYE2LJJDZ81TT5msCQUQMz49adDzazyp2KWp_3c49M7UCLibMhJEC6PEZ3NkwOkP75zFGDLV_SSikIs22tV8A4l-aGBb_gNc"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reporting;