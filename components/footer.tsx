import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-apex-dark-blue border-t border-apex-teal-blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-apex-bright-red rounded-lg flex items-center justify-center">
                <span className="text-apex-light-yellow font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-apex-light-yellow">Apex Auto Detailers</span>
            </div>
            <p className="text-apex-light-yellow/70 text-sm">
              Professional mobile car detailing services across the Sunshine Coast. We bring the showroom shine to your
              doorstep.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-apex-orange-yellow fill-current" />
                ))}
              </div>
              <span className="text-apex-light-yellow/80 text-sm">4.9/5 from 1,200+ reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apex-light-yellow">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/services", label: "Our Services" },
                { href: "/subscriptions", label: "Monthly Plans" },
                { href: "/gallery", label: "Gallery" },
                { href: "/franchise", label: "Franchise" },
                { href: "/book", label: "Book Online" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-apex-light-yellow/70 hover:text-apex-orange-yellow transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apex-light-yellow">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-apex-orange-yellow" />
                <span className="text-apex-light-yellow/80 text-sm">0412 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-apex-orange-yellow" />
                <span className="text-apex-light-yellow/80 text-sm">hello@apexautodetailers.com.au</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-apex-orange-yellow" />
                <span className="text-apex-light-yellow/80 text-sm">Sunshine Coast, QLD</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-apex-orange-yellow" />
                <span className="text-apex-light-yellow/80 text-sm">7 Days, 7am - 7pm</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apex-light-yellow">Stay Updated</h3>
            <p className="text-apex-light-yellow/70 text-sm">
              Get car care tips and exclusive offers delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-apex-teal-blue/20 border-apex-teal-blue text-apex-light-yellow placeholder:text-apex-light-yellow/50"
              />
              <Button className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-apex-light-yellow hover:text-apex-orange-yellow">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-apex-light-yellow hover:text-apex-orange-yellow">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-apex-teal-blue/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-apex-light-yellow/70 text-sm">© 2024 Apex Auto Detailers. All rights reserved.</div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-apex-light-yellow/70 hover:text-apex-orange-yellow transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-apex-light-yellow/70 hover:text-apex-orange-yellow transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
