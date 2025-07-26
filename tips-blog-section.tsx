import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"

export function TipsBlogSection() {
  const blogPosts = [
    {
      title: "5 Essential Car Care Tips for Sunshine Coast Weather",
      excerpt: "Learn how to protect your vehicle from salt air, UV rays, and humidity with these expert tips.",
      author: "Apex Team",
      date: "Dec 15, 2023",
      category: "Car Care",
      readTime: "3 min read",
    },
    {
      title: "When to Detail Your Car: A Seasonal Guide",
      excerpt: "Discover the optimal timing for different detailing services throughout the year.",
      author: "Mike Johnson",
      date: "Dec 10, 2023",
      category: "Maintenance",
      readTime: "4 min read",
    },
    {
      title: "Interior vs Exterior: Which Detail Should You Choose?",
      excerpt: "Understanding the benefits of each service type to make the best choice for your vehicle.",
      author: "Sarah Chen",
      date: "Dec 5, 2023",
      category: "Services",
      readTime: "5 min read",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-apex-dark-blue to-apex-teal-blue/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-apex-gold mr-3" />
            <h2 className="text-3xl sm:text-4xl font-bold text-apex-light-grey">Car Care Tips & Insights</h2>
          </div>
          <p className="text-xl text-apex-light-grey/70 max-w-2xl mx-auto">
            Expert advice and tips to keep your vehicle looking its best between professional details.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-apex-teal-blue/20 border-apex-gold/20 hover:bg-apex-teal-blue/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-apex-gold/20 text-apex-gold border-apex-gold/30">{post.category}</Badge>
                  <span className="text-apex-light-grey/60 text-sm">{post.readTime}</span>
                </div>
                <CardTitle className="text-apex-light-grey group-hover:text-apex-gold transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-apex-light-grey/70">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-apex-light-grey/60 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-apex-gold hover:text-apex-light-grey hover:bg-apex-gold/20 group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-apex-gold text-apex-gold hover:bg-apex-gold hover:text-apex-dark-blue bg-transparent px-8 py-6 shadow-lg shadow-apex-gold/20 font-semibold"
          >
            <Link href="/blog">View All Tips & Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
