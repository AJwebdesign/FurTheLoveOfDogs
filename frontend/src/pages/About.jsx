import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Award, MapPin, Clock, Shield } from "lucide-react";
import { mockFamilyStory } from "../data/mockData";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-6">About Our Family</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
            {mockFamilyStory.title}
          </h1>
          <p className="text-xl text-orange-700 leading-relaxed">
            Family-owned and operated since {mockFamilyStory.founded}, providing exceptional care 
            with the warmth and attention only a family business can offer.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-700">
                {mockFamilyStory.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop" 
                  alt="Family with dogs at the kennel"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">15+</div>
                    <div className="text-sm text-gray-600">Years of Love</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Members Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Meet the Family</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hearts Behind the Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three generations working together to provide the love and expertise 
              your furry family members deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockFamilyStory.familyMembers.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg ring-4 ring-orange-200 group-hover:ring-orange-400 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full p-2">
                      <Heart className="h-4 w-4 text-white" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We Believe In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the exceptional 
              care experience we provide for every dog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockFamilyStory.values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-full p-3 flex-shrink-0">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-lg text-gray-800 leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-white/20 rounded-xl p-6 mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Users className="h-12 w-12 text-white mx-auto" />
              </div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Happy Families</div>
            </div>
            <div className="group">
              <div className="bg-white/20 rounded-xl p-6 mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Award className="h-12 w-12 text-white mx-auto" />
              </div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="group">
              <div className="bg-white/20 rounded-xl p-6 mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Shield className="h-12 w-12 text-white mx-auto" />
              </div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Care & Safety</div>
            </div>
            <div className="group">
              <div className="bg-white/20 rounded-xl p-6 mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <Heart className="h-12 w-12 text-white mx-auto" fill="currentColor" />
              </div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Love Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Visit Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Come See Our Facility
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We'd love to give you a tour of our beautiful facility and introduce you 
                to our family. See firsthand the care and attention your pup will receive.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">106 S 3rd Street, Watertown, WI 53094</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hours</h4>
                    <p className="text-gray-600">
                      Monday-Wednesday: 8am-4pm<br />
                      Thursday: 8am-5pm<br />
                      Friday: 8am-3pm<br />
                      Sunday: By appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=300&fit=crop" 
                alt="Our beautiful facility"
                className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule a Tour</h3>
              <p className="text-gray-600 mb-6">
                Book a personalized tour and meet our family. We'll show you around 
                and answer any questions you have about our services.
              </p>
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                <Link to="/booking">Schedule Your Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;