"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Globe,
  MapPin,
  User,
  Calendar,
} from "lucide-react"

// Mock data for artworks (same as homepage)
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
    description:
      "A beautiful traditional Madhubani painting featuring a vibrant peacock with intricate patterns and natural colors.",
    descriptionHindi: "प्राकृतिक रंगों और जटिल पैटर्न के साथ एक जीवंत मोर की सुंदर पारंपरिक मधुबनी पेंटिंग।",
    dimensions: "16x20 inches",
    medium: "Natural pigments on handmade paper",
    mediumHindi: "हस्तनिर्मित कागज पर प्राकृतिक रंग",
    yearCreated: "2024",
    artistBio:
      "Sunita Devi is a renowned Madhubani artist from Bihar with over 20 years of experience in traditional painting.",
    artistBioHindi: "सुनीता देवी बिहार की एक प्रसिद्ध मधुबनी कलाकार हैं जिनके पास पारंपरिक चित्रकारी में 20 से अधिक वर्षों का अनुभव है।",
    images: [
      "/colorful-madhubani-peacock-painting-traditional-in.jpg",
      "/colorful-madhubani-peacock-painting-traditional-in.jpg",
      "/colorful-madhubani-peacock-painting-traditional-in.jpg",
    ],
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
    description:
      "Traditional Warli tribal art depicting village life with characteristic stick figures and geometric patterns.",
    descriptionHindi: "विशिष्ट स्टिक फिगर और ज्यामितीय पैटर्न के साथ गांव के जीवन को दर्शाने वाली पारंपरिक वारली जनजातीय कला।",
    dimensions: "12x16 inches",
    medium: "White pigment on brown paper",
    mediumHindi: "भूरे कागज पर सफेद रंग",
    yearCreated: "2024",
    artistBio:
      "Ramesh Kokni comes from a family of traditional Warli artists and has been practicing this art form for 15 years.",
    artistBioHindi: "रमेश कोकनी पारंपरिक वारली कलाकारों के परिवार से आते हैं और 15 वर्षों से इस कला रूप का अभ्यास कर रहे हैं।",
    images: [
      "/warli-tribal-art-village-scene-black-and-white-tra.jpg",
      "/warli-tribal-art-village-scene-black-and-white-tra.jpg",
      "/warli-tribal-art-village-scene-black-and-white-tra.jpg",
    ],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [isHindi, setIsHindi] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const productId = Number.parseInt(params.id as string)
  const artwork = artworks.find((art) => art.id === productId)

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background pattern-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const toggleLanguage = () => setIsHindi(!isHindi)

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
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
  }

  const toggleFavorite = () => setIsFavorite(!isFavorite)

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: isHindi ? artwork.titleHindi : artwork.title,
        text: isHindi ? artwork.descriptionHindi : artwork.description,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isHindi ? "वापस" : "Back"}
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-primary">{isHindi ? "हस्तकला" : "HastaKalaa"}</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                <Globe className="h-4 w-4 mr-2" />
                {isHindi ? "English" : "हिंदी"}
              </Button>
              <Button variant="outline" size="sm" onClick={shareProduct}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={artwork.images[selectedImageIndex] || "/placeholder.svg"}
                alt={isHindi ? artwork.titleHindi : artwork.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {artwork.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{isHindi ? artwork.categoryHindi : artwork.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
                {isHindi ? artwork.titleHindi : artwork.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{isHindi ? artwork.artistHindi : artwork.artist}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{isHindi ? artwork.locationHindi : artwork.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{artwork.yearCreated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{artwork.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({artwork.reviews} {isHindi ? "समीक्षाएं" : "reviews"})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-bold text-primary">₹{artwork.price}</span>
              <span className="text-xl text-muted-foreground line-through">₹{artwork.originalPrice}</span>
              <Badge variant="destructive">
                {Math.round((1 - artwork.price / artwork.originalPrice) * 100)}% {isHindi ? "छूट" : "OFF"}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">{isHindi ? "विवरण" : "Description"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {isHindi ? artwork.descriptionHindi : artwork.description}
              </p>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">{isHindi ? "विनिर्देश" : "Specifications"}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isHindi ? "आयाम" : "Dimensions"}:</span>
                    <span>{artwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isHindi ? "माध्यम" : "Medium"}:</span>
                    <span>{isHindi ? artwork.mediumHindi : artwork.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isHindi ? "वर्ष" : "Year"}:</span>
                    <span>{artwork.yearCreated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">{isHindi ? "मात्रा" : "Quantity"}:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <Button className="w-full text-lg py-6" onClick={addToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isHindi ? "कार्ट में डालें" : "Add to Cart"} - ₹{artwork.price * quantity}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>{isHindi ? "प्रामाणिकता की गारंटी" : "Authenticity Guaranteed"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>{isHindi ? "मुफ्त शिपिंग" : "Free Shipping"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>{isHindi ? "7 दिन वापसी" : "7 Day Returns"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artist Bio Section */}
        <Separator className="my-12" />
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{isHindi ? "कलाकार के बारे में" : "About the Artist"}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{isHindi ? artwork.artistHindi : artwork.artist}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isHindi ? artwork.artistBioHindi : artwork.artistBio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
