"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/gallery", label: "Gallery" },
    { href: "/franchise", label: "Franchise" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Top Bar */}
      <div className="bg-apex-teal-blue text-apex-light-grey py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-apex-gold" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-apex-gold" />
              <span>info@apexautodetailers.com</span>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-apex-gold" />
            <span>Sunshine Coast, QLD</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-apex-dark-blue border-b border-apex-teal-blue sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Apex Auto Detailers" width={40} height={40} className="w-10 h-10" />
              <div className="hidden sm:block">
                <div className="text-apex-light-grey font-bold text-xl">Apex Auto</div>
                <div className="text-apex-gold text-sm font-medium">Detailers</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-apex-gold ${
                    isActive(item.href) ? "text-apex-gold border-b-2 border-apex-gold pb-1" : "text-apex-light-grey"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-apex-red hover:bg-apex-red/90 text-white font-semibold px-6 py-5 shadow-md shadow-apex-red/20 border-2 border-apex-red transition-transform hover:scale-105"
              >
                <Link href="/book">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-apex-light-grey">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-apex-dark-blue border-apex-teal-blue">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-apex-gold ${
                        isActive(item.href) ? "text-apex-gold" : "text-apex-light-grey"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="bg-apex-red hover:bg-apex-red/90 text-white font-semibold py-6 mt-4 shadow-md shadow-apex-red/20 border-2 border-apex-red"
                  >
                    <Link href="/book" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
