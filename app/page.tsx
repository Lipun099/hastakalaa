"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Heart, Star, Upload, Globe, Download } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for artworks
const artworks = [
  {
    id: 1,
    title: "Madhubani Peacock",
    titleHindi: "मधुबनी मोर",
    artist: "Sunita Devi",
    artistHindi: "सुनीता देवी",
    price: 2500,
    originalPrice: 3000,
    image: "/colorful-madhubani-peacock-painting-traditional-in.jpg",
    category: "Madhubani",
    categoryHindi: "मधुबनी",
    rating: 4.8,
    reviews: 24,
    location: "Bihar",
    locationHindi: "बिहार",
  },
  {
    id: 2,
    title: "Warli Village Scene",
    titleHindi: "वारली गांव दृश्य",
    artist: "Ramesh Kokni",
    artistHindi: "रमेश कोकनी",
    price: 1800,
    originalPrice: 2200,
    image: "/warli-tribal-art-village-scene-black-and-white-tra.jpg",
    category: "Warli",
    categoryHindi: "वारली",
    rating: 4.6,
    reviews: 18,
    location: "Maharashtra",
    locationHindi: "महाराष्ट्र",
  },
  {
    id: 3,
    title: "Gond Tree of Life",
    titleHindi: "गोंड जीवन वृक्ष",
    artist: "Bhajju Shyam",
    artistHindi: "भज्जू श्याम",
    price: 3200,
    originalPrice: 4000,
    image: "/gond-art-tree-of-life-colorful-dots-patterns-triba.jpg",
    category: "Gond",
    categoryHindi: "गोंड",
    rating: 4.9,
    reviews: 32,
    location: "Madhya Pradesh",
    locationHindi: "मध्य प्रदेश",
  },
  {
    id: 4,
    title: "Pattachitra Krishna",
    titleHindi: "पट्टचित्र कृष्ण",
    artist: "Apindra Swain",
    artistHindi: "अपिंद्र स्वैन",
    price: 2800,
    originalPrice: 3500,
    image: "/pattachitra-krishna-painting-traditional-odisha-ar.jpg",
    category: "Pattachitra",
    categoryHindi: "पट्टचित्र",
    rating: 4.7,
    reviews: 21,
    location: "Odisha",
    locationHindi: "ओडिशा",
  },
  {
    id: 5,
    title: "Kalamkari Elephant",
    titleHindi: "कलमकारी हाथी",
    artist: "Niranjan Reddy",
    artistHindi: "निरंजन रेड्डी",
    price: 2200,
    originalPrice: 2800,
    image: "/kalamkari-elephant-painting-traditional-andhra-pra.jpg",
    category: "Kalamkari",
    categoryHindi: "कलमकारी",
    rating: 4.5,
    reviews: 15,
    location: "Andhra Pradesh",
    locationHindi: "आंध्र प्रदेश",
  },
  {
    id: 6,
    title: "Phad Painting Epic",
    titleHindi: "फड़ चित्रकारी महाकाव्य",
    artist: "Kalyan Joshi",
    artistHindi: "कल्याण जोशी",
    price: 4500,
    originalPrice: 5500,
    image: "/phad-painting-rajasthani-folk-art-epic-story-color.jpg",
    category: "Phad",
    categoryHindi: "फड़",
    rating: 4.8,
    reviews: 28,
    location: "Rajasthan",
    locationHindi: "राजस्थान",
  },
]

export default function HomePage() {
  const router = useRouter()
  const { state, addItem } = useCart()
  const [isHindi, setIsHindi] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleLanguage = () => setIsHindi(!isHindi)

  const handleInstallApp = () => {
    // Check if PWA install prompt is available
    if ("serviceWorker" in navigator) {
      // For now, show a simple alert - in production this would trigger PWA install
      alert(
        isHindi
          ? "ऐप इंस्टॉल करने के लिए ब्राउज़र मेनू से 'होम स्क्रीन पर जोड़ें' चुनें"
          : "To install the app, select 'Add to Home Screen' from your browser menu",
      )
    }
  }

  const addToCart = (artwork: (typeof artworks)[0]) => {
    addItem({
      id: artwork.id,
      title: artwork.title,
      titleHindi: artwork.titleHindi,
      artist: artwork.artist,
      artistHindi: artwork.artistHindi,
      price: artwork.price,
      image: artwork.image,
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">{isHindi ? "हस्तकला" : "HastaKalaa"}</h1>
              <Badge variant="secondary" className="hidden md:inline-flex">
                {isHindi ? "कलाकारों का बाज़ार" : "Artists Marketplace"}
              </Badge>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-transparent"
              >
                <Globe className="h-4 w-4" />
                {isHindi ? "English" : "हिंदी"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleInstallApp}
                className="hidden sm:flex items-center gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                {isHindi ? "ऐप डाउनलोड करें" : "Install App"}
              </Button>

              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Heart className="h-4 w-4" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{favorites.length}</Badge>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-4 w-4" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{state.itemCount}</Badge>
                )}
              </Button>

              <Button size="sm" className="hidden md:flex items-center gap-2" onClick={() => router.push("/upload")}>
                <Upload className="h-4 w-4" />
                {isHindi ? "कलाकृति अपलोड करें" : "Upload Artwork"}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isHindi ? "कलाकृति खोजें..." : "Search artworks..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight">
            {isHindi ? (
              <span className="hindi-text">प्रामाणिक भारतीय कलाकृतियों की खोज करें</span>
            ) : (
              "Discover Authentic Indian Artworks"
            )}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 text-pretty leading-relaxed">
            {isHindi ? (
              <span className="hindi-text">ग्रामीण कलाकारों से सीधे खरीदें और पारंपरिक शिल्प का समर्थन करें</span>
            ) : (
              "Buy directly from rural artists and support traditional crafts"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base mb-6">
            <Badge variant="outline" className="px-4 py-2">
              {isHindi ? "500+ कलाकृतियां" : "500+ Artworks"}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {isHindi ? "मुफ्त शिपिंग" : "Free Shipping"}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {isHindi ? "प्रामाणिकता की गारंटी" : "Authenticity Guaranteed"}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {isHindi ? "मोबाइल ऐप उपलब्ध" : "Mobile App Available"}
            </Badge>
          </div>

          <Button size="lg" onClick={handleInstallApp} className="sm:hidden flex items-center gap-2 mb-4">
            <Download className="h-4 w-4" />
            {isHindi ? "ऐप डाउनलोड करें" : "Install App"}
          </Button>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">{isHindi ? "विशेष कलाकृतियां" : "Featured Artworks"}</h3>
            <p className="text-muted-foreground">
              {filteredArtworks.length} {isHindi ? "कलाकृतियां मिलीं" : "artworks found"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArtworks.map((artwork) => (
              <Card key={artwork.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href={`/product/${artwork.id}`}>
                  <div className="relative">
                    <img
                      src={artwork.image || "/placeholder.svg"}
                      alt={isHindi ? artwork.titleHindi : artwork.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-secondary">
                      {isHindi ? artwork.categoryHindi : artwork.category}
                    </Badge>
                  </div>

                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg md:text-xl text-balance">
                        {isHindi ? artwork.titleHindi : artwork.title}
                      </h4>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{artwork.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-2">
                      {isHindi
                        ? `${artwork.artistHindi} • ${artwork.locationHindi}`
                        : `${artwork.artist} • ${artwork.location}`}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">₹{artwork.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{artwork.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        {Math.round((1 - artwork.price / artwork.originalPrice) * 100)}% {isHindi ? "छूट" : "OFF"}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>

                <CardContent className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                  <div className="flex gap-2">
                    <Button className="flex-1 text-lg py-3" onClick={() => addToCart(artwork)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isHindi ? "कार्ट में डालें" : "Add to Cart"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 bg-transparent"
                      onClick={() => toggleFavorite(artwork.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(artwork.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Download/Install Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content and Button */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                  {isHindi ? "मोबाइल ऐप" : "Mobile App"}
                </Badge>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  {isHindi ? (
                    <span className="hindi-text">
                      अपने फोन में
                      <br />
                      <span className="text-primary">हस्तकला</span> लाएं
                    </span>
                  ) : (
                    <>
                      Get <span className="text-primary">HastaKalaa</span>
                      <br />
                      on your phone
                    </>
                  )}
                </h2>

                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  {isHindi ? (
                    <span className="hindi-text">
                      कभी भी, कहीं भी भारतीय कलाकृतियों की खरीदारी करें। तेज़, सुरक्षित और उपयोग में आसान।
                    </span>
                  ) : (
                    "Shop authentic Indian artworks anytime, anywhere. Fast, secure, and easy to use."
                  )}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{isHindi ? "ऑफलाइन ब्राउज़िंग" : "Offline browsing"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{isHindi ? "तुरंत नोटिफिकेशन" : "Instant notifications"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{isHindi ? "सुरक्षित भुगतान" : "Secure payments"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={handleInstallApp}
                  className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="h-5 w-5 mr-3" />
                  {isHindi ? "अभी इंस्टॉल करें" : "Install Now"}
                </Button>

                <p className="text-sm text-muted-foreground">
                  {isHindi ? (
                    <span className="hindi-text">* कोई डाउनलोड की आवश्यकता नहीं - सीधे ब्राउज़र से इंस्टॉल करें</span>
                  ) : (
                    "* No download required - install directly from your browser"
                  )}
                </p>
              </div>
            </div>

            {/* Right side - Mobile Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone frame */}
                <div className="relative w-72 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Phone screen content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                      {/* Status bar */}
                      <div className="flex justify-between items-center px-6 py-3 text-xs">
                        <span className="font-medium">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                          <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                          <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        </div>
                      </div>

                      {/* App header */}
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-primary">{isHindi ? "हस्तकला" : "HastaKalaa"}</h3>
                      </div>

                      {/* Sample artwork cards */}
                      <div className="p-4 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="h-32 bg-gradient-to-r from-orange-200 to-red-200"></div>
                          <div className="p-3">
                            <h4 className="font-semibold text-sm">Madhubani Art</h4>
                            <p className="text-xs text-gray-600">₹2,500</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                          <div className="h-32 bg-gradient-to-r from-green-200 to-blue-200"></div>
                          <div className="p-3">
                            <h4 className="font-semibold text-sm">Warli Painting</h4>
                            <p className="text-xs text-gray-600">₹1,800</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone button */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
                </div>

                {/* Floating elements around phone */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary/20 rounded-full animate-bounce delay-700"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent/20 rounded-full animate-bounce delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 md:py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl md:text-2xl font-bold mb-4">{isHindi ? "हस्तकला" : "HastaKalaa"}</h4>
          <p className="text-muted-foreground mb-4">
            {isHindi ? (
              <span className="hindi-text">भारतीय कलाकारों को सशक्त बनाना, एक कलाकृति एक समय में</span>
            ) : (
              "Empowering Indian artists, one artwork at a time"
            )}
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleInstallApp}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              {isHindi ? "वेब ऐप इंस्टॉल करें" : "Install Web App"}
            </Button>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <span>{isHindi ? "संपर्क" : "Contact"}</span>
            <span>•</span>
            <span>{isHindi ? "सहायता" : "Help"}</span>
            <span>•</span>
            <span>{isHindi ? "नीति" : "Policy"}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
