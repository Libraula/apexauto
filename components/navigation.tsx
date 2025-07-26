"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, MapPin } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/subscriptions", label: "Monthly Plans" },
    { href: "/gallery", label: "Gallery" },
    { href: "/franchise", label: "Franchise" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-apex-dark-blue/95 backdrop-blur-sm border-b border-apex-teal-blue/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-apex-bright-red rounded-lg flex items-center justify-center">
              <span className="text-apex-light-yellow font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-apex-light-yellow">Apex Auto Detailers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-apex-light-yellow hover:text-apex-orange-yellow transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-apex-light-yellow/80 text-sm">
              <Phone className="w-4 h-4" />
              <span>0412 345 678</span>
            </div>
            <div className="flex items-center space-x-2 text-apex-light-yellow/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Sunshine Coast</span>
            </div>
            <Link href="/book">
              <Button className="bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-apex-light-yellow">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-apex-dark-blue border-apex-teal-blue">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-apex-light-yellow hover:text-apex-orange-yellow transition-colors duration-200 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-apex-teal-blue/30">
                    <div className="flex items-center space-x-2 text-apex-light-yellow/80 mb-4">
                      <Phone className="w-4 h-4" />
                      <span>0412 345 678</span>
                    </div>
                    <div className="flex items-center space-x-2 text-apex-light-yellow/80 mb-6">
                      <MapPin className="w-4 h-4" />
                      <span>Sunshine Coast</span>
                    </div>
                    <Link href="/book" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-apex-bright-red hover:bg-apex-bright-red/90 text-apex-light-yellow">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
