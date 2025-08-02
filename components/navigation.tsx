"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
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
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image src="/logo.png" alt="Apex Auto Detailers Logo" fill className="object-contain" priority />
            </div>
            <span className="text-xl font-bold text-text-warm">Apex Auto Detailers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-red-primary",
                  pathname === item.href ? "text-red-primary" : "text-text-light/80",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-red-primary hover:bg-red-secondary text-text-warm">
              <Link href="/book">Book Service</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-text-light">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black-deep border-red-primary/20">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-red-primary px-4 py-2 rounded-lg",
                      pathname === item.href ? "text-red-primary bg-red-primary/10" : "text-text-light/80",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="bg-red-primary hover:bg-red-secondary text-text-warm mt-4">
                  <Link href="/book" onClick={() => setIsOpen(false)}>
                    Book Service
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
