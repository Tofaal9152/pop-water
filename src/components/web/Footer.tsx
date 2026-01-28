const Footer = () => {
  return (
    <footer className=" text-white border-t border-white/10">
      <div className="mx-auto container py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 flex mx-auto mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7.5 18.5h9.4c2.2 0 4.1-1.7 4.1-3.9 0-2-1.5-3.6-3.4-3.9-.4-3-2.9-5.3-6-5.3-2.6 0-4.8 1.6-5.7 3.9-2.1.2-3.9 2-3.9 4.2 0 2.4 2 4 4.5 4z"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-lg font-semibold">PoP Water Tower</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              A climate-resilient, zero-energy water system designed for the
              hill districts in Bangladesh and similar geo-topology areas.
            </p>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Information
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">How it works</li>
              <li className="hover:text-white cursor-pointer">Impact</li>
              <li className="hover:text-white cursor-pointer">Location</li>
              <li className="hover:text-white cursor-pointer">Get involved</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Roadmap</li>
              <li className="hover:text-white cursor-pointer">
                Updates / Stories
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Headquarters</li>
              <li className="hover:text-white cursor-pointer">Partnership</li>
              <li className="hover:text-white cursor-pointer">Sponsor</li>
              <li className="hover:text-white cursor-pointer">Why PoP</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-white/60 md:flex-row md:items-center">
          <p>© 2026 PoP Water Tower. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Terms</span>
            <span className="cursor-pointer hover:text-white">Privacy</span>
            <span className="cursor-pointer hover:text-white">Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
