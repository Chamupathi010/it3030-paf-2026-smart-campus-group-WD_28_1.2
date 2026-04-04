const ResourceSection = () => {
  return (
    <section className="py-24 px-8" id="resources">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 order-2 lg:order-1">
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-2xl border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline font-bold text-xl">Quick Booking</h4>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">
                      meeting_room
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Study Room 402</p>
                    <p className="text-xs text-on-surface-variant">
                      Central Library • Floor 4
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  AVAILABLE
                </span>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">
                      biotech
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Chemistry Lab B</p>
                    <p className="text-xs text-on-surface-variant">
                      Science Wing • Wing 2
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full">
                  IN USE
                </span>
              </div>

              <div className="pt-4">
                <label className="text-xs font-bold text-on-surface-variant block mb-2 uppercase tracking-wider">
                  Select Duration
                </label>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold">
                    1 hr
                  </button>
                  <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant rounded-lg text-sm font-bold">
                    2 hrs
                  </button>
                  <button className="flex-1 py-2 bg-surface-container-highest text-on-surface-variant rounded-lg text-sm font-bold">
                    4 hrs
                  </button>
                </div>
              </div>

              <button className="w-full py-4 bg-primary-dim text-on-primary rounded-xl font-bold shadow-lg mt-4">
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 order-1 lg:order-2 space-y-8">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
            Seamless Resource Allocation
          </h2>

          <p className="text-lg text-on-surface-variant leading-relaxed">
            Empower students and staff with intuitive mobile-first booking.
            Whether it&apos;s a quiet study pod or a high-end research facility,
            UniHub manages conflicts and permissions automatically.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>
              <span className="font-medium">
                Calendar integration with Office 365 &amp; G-Suite
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>
              <span className="font-medium">
                QR code based "tap-to-enter" validation
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>
              <span className="font-medium">Auto-release for no-shows</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResourceSection;