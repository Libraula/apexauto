"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Gallery", href: "/gallery" },
  { name: "Franchise", href: "/franchise" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-red-primary/20 bg-black-rich/95 backdrop-blur supports-[backdrop-filter]:bg-black-rich/60">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 relative">
              <Image src="/logo.png" alt="Apex Auto Detailers Logo" fill className="object-contain" priority />
            </div>
            <span className="text-sm sm:text-lg lg:text-xl font-bold text-text-warm truncate">
              <span className="hidden sm:inline">Apex Auto Detailers</span>
              <span className="sm:hidden">Apex Auto</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-red-primary whitespace-nowrap",
                  pathname === item.href ? "text-red-primary" : "text-text-light/80",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-red-primary hover:bg-red-secondary text-text-warm text-sm px-4 py-2">
              <Link href="/book">Book Service</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-text-light h-8 w-8 sm:h-10 sm:w-10">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-black-deep border-red-primary/20 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-red-primary/20">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <div className="w-8 h-8 relative">
                      <Image src="/logo.png" alt="Apex Auto Detailers Logo" fill className="object-contain" />
                    </div>
                    <span className="text-lg font-bold text-text-warm">Apex Auto</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-text-light h-8 w-8"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-1 p-4 flex-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-red-primary px-4 py-3 rounded-lg",
                        pathname === item.href ? "text-red-primary bg-red-primary/10" : "text-text-light/80",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-red-primary/20">
                  <Button asChild className="w-full bg-red-primary hover:bg-red-secondary text-text-warm">
                    <Link href="/book" onClick={() => setIsOpen(false)}>
                      Book Service
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
