import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Shield, Sparkles, Clock } from "lucide-react"
import Link from "next/link"

export function TipsBlogSection() {
  const tips = [
    {
      title: "How Often Should You Detail Your Car?",
      description:
        "Learn the optimal frequency for different detailing services to keep your vehicle in pristine condition.",
      icon: Clock,
      readTime: "3 min read",
    },
    {
      title: "Benefits of Ceramic Coating",
      description: "Discover why ceramic coating is the ultimate protection for your vehicle's paint and finish.",
      icon: Shield,
      readTime: "5 min read",
    },
    {
      title: "Interior Care Tips",
      description: "Simple daily habits that will keep your car's interior looking and smelling fresh.",
      icon: Sparkles,
      readTime: "4 min read",
    },
    {
      title: "Washing vs Professional Detailing",
      description: "Understanding the difference between a basic wash and professional detailing services.",
      icon: Droplets,
      readTime: "6 min read",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-apex-teal-blue/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey mb-4">Car Care Tips & Insights</h2>
          <p className="text-xl text-apex-light-grey/70 max-w-2xl mx-auto">
            Expert advice and tips to help you maintain your vehicle between professional detailing services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <Card
              key={index}
              className="bg-apex-teal-blue/30 border-apex-gold/20 hover:bg-apex-teal-blue/40 transition-all duration-300"
            >
              <CardHeader>
                <tip.icon className="w-8 h-8 text-apex-gold mb-3" />
                <CardTitle className="text-apex-light-grey text-lg">{tip.title}</CardTitle>
                <CardDescription className="text-apex-light-grey/70">{tip.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-apex-light-grey/60 text-sm">{tip.readTime}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-apex-gold hover:text-apex-gold/80 hover:bg-apex-gold/10"
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-apex-gold text-apex-gold hover:bg-apex-gold/10 bg-transparent"
          >
            <Link href="/tips">View All Tips</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
