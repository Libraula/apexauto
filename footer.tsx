import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-apex-dark-blue border-t border-apex-teal-blue">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-apex-light-grey mb-2">Apex Auto Detailers</h3>
              <p className="text-apex-light-grey/70 text-sm">
                Premium mobile car detailing services across the Sunshine Coast. We bring showroom-quality results
                directly to you.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-apex-light-grey/80">
                <Phone className="w-4 h-4 mr-3 text-apex-gold" />
                <span className="text-sm">+61436920067</span>
              </div>
              <div className="flex items-center text-apex-light-grey/80">
                <Mail className="w-4 h-4 mr-3 text-apex-gold" />
                <span className="text-sm">info@apexautodetailers.com</span>
              </div>
              <div className="flex items-center text-apex-light-grey/80">
                <MapPin className="w-4 h-4 mr-3 text-apex-gold" />
                <span className="text-sm">Sunshine Coast, QLD</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-apex-light-grey mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Exterior Detailing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Interior Detailing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Full Detail Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/subscriptions"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Monthly Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-apex-light-grey mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/book" className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/franchise"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Franchise Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-apex-light-grey/70 hover:text-apex-gold text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-apex-light-grey mb-4">Stay Updated</h4>
            <p className="text-apex-light-grey/70 text-sm mb-4">
              Get car care tips and exclusive offers delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Your email address"
                className="bg-apex-teal-blue/20 border-apex-teal-blue text-apex-light-grey placeholder:text-apex-light-grey/50"
              />
              <Button className="w-full bg-apex-red hover:bg-apex-red/90 text-white">Subscribe</Button>
            </div>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="text-apex-light-grey hover:text-apex-gold">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-apex-light-grey hover:text-apex-gold">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-apex-light-grey hover:text-apex-gold">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-apex-teal-blue" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-apex-light-grey/60 text-sm">© 2023 Apex Auto Detailers. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-apex-light-grey/60 hover:text-apex-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-apex-light-grey/60 hover:text-apex-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
