"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Globe, CreditCard } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const [isHindi, setIsHindi] = useState(false)
  const [promoCode, setPromoCode] = useState("")

  const toggleLanguage = () => setIsHindi(!isHindi)

  const handleCheckout = () => {
    // Checkout logic would go here
    alert(isHindi ? "चेकआउट सुविधा जल्द ही आ रही है!" : "Checkout functionality coming soon!")
  }

  const applyPromoCode = () => {
    // Promo code logic would go here
    alert(isHindi ? "प्रोमो कोड लागू किया गया!" : "Promo code applied!")
  }

  if (state.items.length === 0) {
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
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                <Globe className="h-4 w-4 mr-2" />
                {isHindi ? "English" : "हिंदी"}
              </Button>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{isHindi ? "आपका कार्ट खाली है" : "Your cart is empty"}</h2>
          <p className="text-muted-foreground mb-8">
            {isHindi ? "कुछ सुंदर कलाकृतियां खोजें और खरीदारी शुरू करें" : "Discover some beautiful artworks and start shopping"}
          </p>
          <Button onClick={() => router.push("/")} className="text-lg px-8 py-3">
            {isHindi ? "खरीदारी शुरू करें" : "Start Shopping"}
          </Button>
        </div>
      </div>
    )
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
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              <Globe className="h-4 w-4 mr-2" />
              {isHindi ? "English" : "हिंदी"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">{isHindi ? "आपका कार्ट" : "Your Cart"}</h2>
              <Button variant="outline" onClick={clearCart} className="text-destructive bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                {isHindi ? "सभी हटाएं" : "Clear All"}
              </Button>
            </div>

            <div className="space-y-4">
              {state.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={isHindi ? item.titleHindi : item.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{isHindi ? item.titleHindi : item.title}</h3>
                        <p className="text-muted-foreground mb-2">{isHindi ? item.artistHindi : item.artist}</p>
                        <p className="text-xl font-bold text-primary mb-3">₹{item.price}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{isHindi ? "ऑर्डर सारांश" : "Order Summary"}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>
                      {isHindi ? "वस्तुएं" : "Items"} ({state.itemCount})
                    </span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isHindi ? "शिपिंग" : "Shipping"}</span>
                    <span className="text-green-600">{isHindi ? "मुफ्त" : "Free"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isHindi ? "कर" : "Tax"}</span>
                    <span>₹{Math.round(state.total * 0.18)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>{isHindi ? "कुल" : "Total"}</span>
                  <span>₹{Math.round(state.total * 1.18)}</span>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder={isHindi ? "प्रोमो कोड" : "Promo code"}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      {isHindi ? "लागू करें" : "Apply"}
                    </Button>
                  </div>
                </div>

                <Button className="w-full text-lg py-6" onClick={handleCheckout}>
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isHindi ? "चेकआउट" : "Checkout"}
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>{isHindi ? "सुरक्षित भुगतान" : "Secure payment"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
