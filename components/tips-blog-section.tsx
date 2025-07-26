import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

export function TipsBlogSection() {
  const blogPosts = [
    {
      title: "5 Signs Your Car Needs Professional Detailing",
      excerpt: "Learn to recognize when your vehicle needs more than just a basic wash",
      category: "Maintenance Tips",
      readTime: "3 min read",
      date: "Dec 15, 2024",
      image: "/placeholder.svg?height=200&width=300",
      slug: "signs-car-needs-detailing",
    },
    {
      title: "How to Maintain Your Car Between Details",
      excerpt: "Simple steps to keep your car looking great between professional services",
      category: "DIY Tips",
      readTime: "5 min read",
      date: "Dec 10, 2024",
      image: "/placeholder.svg?height=200&width=300",
      slug: "maintain-car-between-details",
    },
    {
      title: "The Benefits of Ceramic Coating",
      excerpt: "Why ceramic coating is the ultimate protection for your vehicle's paint",
      category: "Protection",
      readTime: "4 min read",
      date: "Dec 5, 2024",
      image: "/placeholder.svg?height=200&width=300",
      slug: "benefits-ceramic-coating",
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-apex-light-yellow/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-apex-light-yellow mb-4">
            Car Care Tips & Insights
          </h2>
          <p className="text-xl text-apex-light-yellow/80 max-w-3xl mx-auto">
            Expert advice to help you maintain your vehicle and get the most from your detailing investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-apex-teal-blue/20 border-apex-teal-blue hover:bg-apex-teal-blue/30 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-apex-bright-red text-apex-light-yellow">
                  {post.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center space-x-4 text-apex-light-yellow/70 text-sm mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-apex-light-yellow text-lg group-hover:text-apex-orange-yellow transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-apex-light-yellow/70">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="ghost"
                  className="text-apex-orange-yellow hover:text-apex-light-yellow hover:bg-apex-orange-yellow/20 p-0 h-auto"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-apex-teal-blue text-apex-light-yellow hover:bg-apex-teal-blue/20 bg-transparent"
          >
            View All Tips & Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
