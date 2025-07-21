import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Apex Auto Detailers" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Apex Auto Detailers</span>
            </div>
            <p className="text-slate-400 text-sm lg:text-base">
              Professional mobile car detailing across the Sunshine Coast. Your car, our passion.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Essential Detail
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Premium Interior
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Signature Detail
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Elite Detail
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Showroom Package
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-white transition-colors">
                  Franchise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="hover:text-white transition-colors">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Apex Auto Detailers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
