"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, ImageIcon, Globe, CheckCircle, AlertCircle } from "lucide-react"

const artCategories = [
  { value: "madhubani", label: "Madhubani", labelHindi: "मधुबनी" },
  { value: "warli", label: "Warli", labelHindi: "वारली" },
  { value: "gond", label: "Gond", labelHindi: "गोंड" },
  { value: "pattachitra", label: "Pattachitra", labelHindi: "पट्टचित्र" },
  { value: "kalamkari", label: "Kalamkari", labelHindi: "कलमकारी" },
  { value: "phad", label: "Phad", labelHindi: "फड़" },
  { value: "miniature", label: "Miniature", labelHindi: "लघु चित्र" },
  { value: "tribal", label: "Tribal Art", labelHindi: "जनजातीय कला" },
  { value: "folk", label: "Folk Art", labelHindi: "लोक कला" },
  { value: "other", label: "Other", labelHindi: "अन्य" },
]

const indianStates = [
  { value: "andhra-pradesh", label: "Andhra Pradesh", labelHindi: "आंध्र प्रदेश" },
  { value: "bihar", label: "Bihar", labelHindi: "बिहार" },
  { value: "gujarat", label: "Gujarat", labelHindi: "गुजरात" },
  { value: "karnataka", label: "Karnataka", labelHindi: "कर्नाटक" },
  { value: "kerala", label: "Kerala", labelHindi: "केरल" },
  { value: "madhya-pradesh", label: "Madhya Pradesh", labelHindi: "मध्य प्रदेश" },
  { value: "maharashtra", label: "Maharashtra", labelHindi: "महाराष्ट्र" },
  { value: "odisha", label: "Odisha", labelHindi: "ओडिशा" },
  { value: "rajasthan", label: "Rajasthan", labelHindi: "राजस्थान" },
  { value: "tamil-nadu", label: "Tamil Nadu", labelHindi: "तमिल नाडु" },
  { value: "uttar-pradesh", label: "Uttar Pradesh", labelHindi: "उत्तर प्रदेश" },
  { value: "west-bengal", label: "West Bengal", labelHindi: "पश्चिम बंगाल" },
]

export default function UploadPage() {
  const router = useRouter()
  const [isHindi, setIsHindi] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Artwork Details
    title: "",
    titleHindi: "",
    description: "",
    descriptionHindi: "",
    category: "",
    price: "",
    dimensions: "",
    medium: "",
    mediumHindi: "",
    yearCreated: new Date().getFullYear().toString(),

    // Artist Details
    artistName: "",
    artistNameHindi: "",
    artistBio: "",
    artistBioHindi: "",
    location: "",
    phone: "",
    email: "",

    // Images
    images: [] as File[],
  })

  const toggleLanguage = () => setIsHindi(!isHindi)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files].slice(0, 5) }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        title: "",
        titleHindi: "",
        description: "",
        descriptionHindi: "",
        category: "",
        price: "",
        dimensions: "",
        medium: "",
        mediumHindi: "",
        yearCreated: new Date().getFullYear().toString(),
        artistName: "",
        artistNameHindi: "",
        artistBio: "",
        artistBioHindi: "",
        location: "",
        phone: "",
        email: "",
        images: [],
      })
    }, 3000)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background pattern-bg flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {isHindi ? "सफलतापूर्वक अपलोड हो गया!" : "Successfully Uploaded!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isHindi
                ? "आपकी कलाकृति समीक्षा के लिए भेजी गई है। हम 24-48 घंटों में आपसे संपर्क करेंगे।"
                : "Your artwork has been submitted for review. We'll contact you within 24-48 hours."}
            </p>
            <Button onClick={() => router.push("/")} className="w-full">
              {isHindi ? "होम पर वापस जाएं" : "Back to Home"}
            </Button>
          </CardContent>
        </Card>
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isHindi ? "अपनी कलाकृति अपलोड करें" : "Upload Your Artwork"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {isHindi
                ? "अपनी पारंपरिक कलाकृति को हजारों कला प्रेमियों के साथ साझा करें"
                : "Share your traditional artwork with thousands of art lovers"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2">
                {isHindi ? "मुफ्त लिस्टिंग" : "Free Listing"}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {isHindi ? "तुरंत भुगतान" : "Instant Payments"}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {isHindi ? "24/7 सहायता" : "24/7 Support"}
              </Badge>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Artwork Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  {isHindi ? "कलाकृति की जानकारी" : "Artwork Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">{isHindi ? "शीर्षक (अंग्रेजी)" : "Title (English)"} *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder={isHindi ? "जैसे: Madhubani Peacock" : "e.g., Madhubani Peacock"}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="titleHindi">{isHindi ? "शीर्षक (हिंदी)" : "Title (Hindi)"} *</Label>
                    <Input
                      id="titleHindi"
                      value={formData.titleHindi}
                      onChange={(e) => handleInputChange("titleHindi", e.target.value)}
                      placeholder={isHindi ? "जैसे: मधुबनी मोर" : "e.g., मधुबनी मोर"}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">{isHindi ? "कला श्रेणी" : "Art Category"} *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={isHindi ? "श्रेणी चुनें" : "Select category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {artCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {isHindi ? category.labelHindi : category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">{isHindi ? "मूल्य (₹)" : "Price (₹)"} *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="2500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dimensions">{isHindi ? "आयाम" : "Dimensions"} *</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange("dimensions", e.target.value)}
                      placeholder="16x20 inches"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="medium">{isHindi ? "माध्यम (अंग्रेजी)" : "Medium (English)"} *</Label>
                    <Input
                      id="medium"
                      value={formData.medium}
                      onChange={(e) => handleInputChange("medium", e.target.value)}
                      placeholder="Natural pigments on paper"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearCreated">{isHindi ? "निर्माण वर्ष" : "Year Created"} *</Label>
                    <Input
                      id="yearCreated"
                      type="number"
                      value={formData.yearCreated}
                      onChange={(e) => handleInputChange("yearCreated", e.target.value)}
                      min="1900"
                      max={new Date().getFullYear()}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mediumHindi">{isHindi ? "माध्यम (हिंदी)" : "Medium (Hindi)"}</Label>
                  <Input
                    id="mediumHindi"
                    value={formData.mediumHindi}
                    onChange={(e) => handleInputChange("mediumHindi", e.target.value)}
                    placeholder={isHindi ? "कागज पर प्राकृतिक रंग" : "कागज पर प्राकृतिक रंग"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description">{isHindi ? "विवरण (अंग्रेजी)" : "Description (English)"} *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder={
                        isHindi ? "अपनी कलाकृति के बारे में विस्तार से बताएं..." : "Describe your artwork in detail..."
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionHindi">{isHindi ? "विवरण (हिंदी)" : "Description (Hindi)"} *</Label>
                    <Textarea
                      id="descriptionHindi"
                      value={formData.descriptionHindi}
                      onChange={(e) => handleInputChange("descriptionHindi", e.target.value)}
                      placeholder={isHindi ? "अपनी कलाकृति के बारे में हिंदी में बताएं..." : "Describe your artwork in Hindi..."}
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artist Information */}
            <Card>
              <CardHeader>
                <CardTitle>{isHindi ? "कलाकार की जानकारी" : "Artist Information"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="artistName">{isHindi ? "कलाकार का नाम (अंग्रेजी)" : "Artist Name (English)"} *</Label>
                    <Input
                      id="artistName"
                      value={formData.artistName}
                      onChange={(e) => handleInputChange("artistName", e.target.value)}
                      placeholder="Sunita Devi"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="artistNameHindi">
                      {isHindi ? "कलाकार का नाम (हिंदी)" : "Artist Name (Hindi)"} *
                    </Label>
                    <Input
                      id="artistNameHindi"
                      value={formData.artistNameHindi}
                      onChange={(e) => handleInputChange("artistNameHindi", e.target.value)}
                      placeholder="सुनीता देवी"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">{isHindi ? "राज्य" : "State"} *</Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={isHindi ? "राज्य चुनें" : "Select state"} />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {isHindi ? state.labelHindi : state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">{isHindi ? "फोन नंबर" : "Phone Number"} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{isHindi ? "ईमेल पता" : "Email Address"} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="artist@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="artistBio">{isHindi ? "कलाकार का परिचय (अंग्रेजी)" : "Artist Bio (English)"} *</Label>
                    <Textarea
                      id="artistBio"
                      value={formData.artistBio}
                      onChange={(e) => handleInputChange("artistBio", e.target.value)}
                      placeholder={
                        isHindi
                          ? "अपने बारे में और अपने कला अनुभव के बारे में बताएं..."
                          : "Tell us about yourself and your art experience..."
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="artistBioHindi">
                      {isHindi ? "कलाकार का परिचय (हिंदी)" : "Artist Bio (Hindi)"} *
                    </Label>
                    <Textarea
                      id="artistBioHindi"
                      value={formData.artistBioHindi}
                      onChange={(e) => handleInputChange("artistBioHindi", e.target.value)}
                      placeholder={isHindi ? "अपने बारे में हिंदी में बताएं..." : "Tell us about yourself in Hindi..."}
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>{isHindi ? "कलाकृति की तस्वीरें" : "Artwork Images"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold mb-2">{isHindi ? "तस्वीरें अपलोड करें" : "Upload Images"}</p>
                  <p className="text-muted-foreground mb-4">
                    {isHindi
                      ? "अधिकतम 5 तस्वीरें (JPG, PNG, WEBP - अधिकतम 5MB प्रत्येक)"
                      : "Maximum 5 images (JPG, PNG, WEBP - Max 5MB each)"}
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload">
                    <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                      {isHindi ? "फाइलें चुनें" : "Choose Files"}
                    </Button>
                  </Label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.images.length === 0 && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">
                      {isHindi ? "कृपया कम से कम एक तस्वीर अपलोड करें" : "Please upload at least one image"}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="px-12 py-4 text-lg"
                disabled={isSubmitting || formData.images.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="h-5 w-5 mr-2 animate-spin" />
                    {isHindi ? "अपलोड हो रहा है..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    {isHindi ? "कलाकृति सबमिट करें" : "Submit Artwork"}
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                {isHindi
                  ? "सबमिट करने के बाद, हमारी टीम 24-48 घंटों में आपकी कलाकृति की समीक्षा करेगी।"
                  : "After submission, our team will review your artwork within 24-48 hours."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
