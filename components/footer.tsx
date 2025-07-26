import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black-rich border-t border-red-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image src="/logo.png" alt="Apex Auto Detailers Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-text-warm">Apex Auto Detailers</span>
            </Link>
            <p className="text-text-light/70 max-w-sm">
              Premium car detailing services with unmatched attention to detail. Transform your vehicle with our expert
              care.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-text-light/60 hover:text-red-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-warm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Services", href: "/services" },
                { name: "Subscriptions", href: "/subscriptions" },
                { name: "Gallery", href: "/gallery" },
                { name: "Franchise", href: "/franchise" },
                { name: "Book Service", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-light/70 hover:text-red-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-text-warm mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Exterior Detailing",
                "Interior Detailing",
                "Paint Protection",
                "Ceramic Coating",
                "Mobile Service",
              ].map((service) => (
                <li key={service}>
                  <span className="text-text-light/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-text-warm mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-primary" />
                <span className="text-text-light/70">+61436920067</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-primary" />
                <span className="text-text-light/70">info@apexautodetailers.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-primary" />
                <span className="text-text-light/70">123 Detail Street, City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-primary/20 mt-8 pt-8 text-center">
          <p className="text-text-light/60">© 2025 Apex Auto Detailers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
