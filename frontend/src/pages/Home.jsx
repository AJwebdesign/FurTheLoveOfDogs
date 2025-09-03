import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, Heart, Shield, Clock, Users, Award } from "lucide-react";
import { mockServices, mockReviews } from "../data/mockData";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-orange-50/50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-200/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-500/10 text-orange-700 border-orange-300 mb-6 text-sm px-4 py-2">
              ✨ Family-Owned Since 2009
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-orange-900 mb-6 leading-tight">
              Fur the Love of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                Dogs
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-700 mb-8 leading-relaxed">
              Premium dog care services where your furry family members receive the love, 
              attention, and professional care they deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/booking">Book Your Visit Today</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg transition-all duration-300"
              >
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="bg-white/60 rounded-xl p-4 mb-2 shadow-lg">
                  <Users className="h-8 w-8 text-orange-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-orange-900">1000+</div>
                <div className="text-sm text-orange-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="bg-white/60 rounded-xl p-4 mb-2 shadow-lg">
                  <Award className="h-8 w-8 text-orange-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-orange-900">15+</div>
                <div className="text-sm text-orange-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="bg-white/60 rounded-xl p-4 mb-2 shadow-lg">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-orange-900">24/7</div>
                <div className="text-sm text-orange-600">Care & Safety</div>
              </div>
              <div className="text-center">
                <div className="bg-white/60 rounded-xl p-4 mb-2 shadow-lg">
                  <Heart className="h-8 w-8 text-orange-600 mx-auto" fill="currentColor" />
                </div>
                <div className="text-2xl font-bold text-orange-900">100%</div>
                <div className="text-sm text-orange-600">Love Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Care for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From overnight boarding to training programs, we provide professional, 
              loving care tailored to your dog's unique personality and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service) => (
              <Card 
                key={service.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 group ${
                  service.popular ? 'ring-2 ring-orange-400 ring-opacity-50' : ''
                }`}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                    {service.name}
                  </CardTitle>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-orange-600">{service.price}</span>
                    <span className="text-gray-500">{service.period}</span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="bg-orange-100 rounded-full p-1">
                          <Heart className="h-3 w-3 text-orange-600" fill="currentColor" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all duration-200"
                  >
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Customer Reviews</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Families Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the families who trust us 
              with their most precious companions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockReviews.slice(0, 6).map((review) => (
              <Card key={review.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">
                        {review.dogName} • {review.service}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.review}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              <Link to="/about">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="h-16 w-16 mx-auto mb-8 text-white/80" fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Give Your Pup the Best Care?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Join over 1,000 families who trust us with their furry family members. 
            Schedule your visit today and see why we're the premier dog care facility in Happy Valley.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/booking">Schedule Your Visit</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all duration-300"
            >
              <Link to="/about">Meet Our Family</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;