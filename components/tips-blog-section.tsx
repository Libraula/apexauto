import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Droplets, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

export function TipsBlogSection() {
  const blogPosts = [
    {
      title: "Basic Interior Cleaning Tips",
      excerpt: "Learn professional techniques for maintaining your car's interior between details",
      icon: Sparkles,
      readTime: "5 min read",
      category: "DIY Tips",
    },
    {
      title: "Washing Your Car: Do's and Don'ts",
      excerpt: "Avoid common mistakes that can damage your paint and learn the proper washing technique",
      icon: Droplets,
      readTime: "7 min read",
      category: "Car Care",
    },
    {
      title: "Paint Protection: Which Option is Right for You?",
      excerpt: "Compare ceramic, nano, and traditional wax protection to make the best choice",
      icon: Shield,
      readTime: "10 min read",
      category: "Protection",
    },
    {
      title: "Preparing Your Car for Sale",
      excerpt: "Maximize your car's value with professional detailing and presentation tips",
      icon: BookOpen,
      readTime: "6 min read",
      category: "Selling Tips",
    },
  ]

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Expert Car Care Tips</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Professional advice and insights from our experienced detailing team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <post.icon className="w-8 h-8 text-blue-500" />
                  <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">{post.category}</span>
                </div>
                <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0"
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
