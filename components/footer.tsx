import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black-rich border-t border-red-primary/20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
                <Image src="/logo.png" alt="Apex Auto Detailers Logo" fill className="object-contain" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-text-warm">
                <span className="hidden sm:inline">Apex Auto Detailers</span>
                <span className="sm:hidden">Apex Auto</span>
              </span>
            </Link>
            <p className="text-sm sm:text-base text-text-light/70 max-w-sm leading-relaxed">
              Premium mobile car detailing services with unmatched attention to detail. We come to you across the
              Sunshine Coast & surrounds.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-text-warm">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Services", href: "/services" },
                { name: "Subscriptions", href: "/subscriptions" },
                { name: "Gallery", href: "/gallery" },
                { name: "Franchise", href: "/franchise" },
                { name: "Book Service", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-text-light/70 hover:text-red-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-text-warm">Services</h3>
            <ul className="space-y-2">
              {[
                "Custom Detail - $95",
                "Interior Detail - $250",
                "Full Detail - $345",
                "Pre-Sale Detail - $395",
                "Mobile Service",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm sm:text-base text-text-light/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-text-warm">Contact</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-text-light/70">+61436920067</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-text-light/70 break-all">info@apexautodetailers.com</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-text-light/70 leading-relaxed">
                  Sunshine Coast & Surrounds
                  <br />
                  Mobile Service Area
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-primary/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-text-light/60">© 2025 Apex Auto Detailers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
