import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-apex-dark-blue border-t border-apex-teal-blue/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/logo.png" alt="Apex Auto Detailers" width={50} height={50} className="w-12 h-12" />
              <div>
                <div className="text-apex-light-grey font-bold text-xl">Apex Auto</div>
                <div className="text-apex-gold text-sm font-medium">Detailers</div>
              </div>
            </div>
            <p className="text-apex-light-grey/70 text-sm">
              Professional mobile car detailing services across the Sunshine Coast. We bring the showroom shine to your
              doorstep.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-apex-light-grey font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Book Online
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Monthly Plans
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Franchise Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-apex-light-grey font-semibold mb-4 text-lg">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Exterior Detailing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Interior Detailing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Paint Protection
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Ceramic Coating
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-apex-light-grey/70 hover:text-apex-gold transition-colors">
                  Headlight Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-apex-light-grey font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-apex-gold mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-apex-light-grey/70">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-apex-gold mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-apex-light-grey/70">info@apexautodetailers.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-apex-gold mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-apex-light-grey/70">Serving the entire Sunshine Coast region</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-apex-teal-blue/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-apex-light-grey/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Apex Auto Detailers. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-apex-light-grey/60 hover:text-apex-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-apex-light-grey/60 hover:text-apex-gold text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-apex-light-grey/60 hover:text-apex-gold text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
