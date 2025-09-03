import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Dog, Phone, Mail, User, CreditCard, MapPin } from "lucide-react";
import api from "../services/api";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [services, setServices] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    dogName: "",
    dogBreed: "",
    dogAge: "",
    specialNeeds: "",
    emergencyContact: ""
  });

  // Check URL parameters for payment status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const sessionId = urlParams.get('session_id');

    if (status === 'success' && sessionId) {
      checkPaymentStatus(sessionId);
    } else if (status === 'cancelled') {
      toast.error('Payment was cancelled. Please try again.');
    }
  }, []);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, unavailableDatesData] = await Promise.all([
          api.services.getAll(),
          api.booking.getUnavailableDates()
        ]);
        
        setServices(servicesData);
        setUnavailableDates(unavailableDatesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load booking data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Convert unavailable dates to Date objects for calendar
  const bookedDates = unavailableDates.map(dateStr => new Date(dateStr));
  
  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !formData.ownerName || !formData.phone || !formData.dogName) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock booking submission
    toast.success("Booking request submitted! We'll contact you within 24 hours to confirm.");
    
    // Reset form
    setSelectedDate(null);
    setSelectedService("");
    setFormData({
      ownerName: "",
      phone: "",
      email: "",
      dogName: "",
      dogBreed: "",
      dogAge: "",
      specialNeeds: "",
      emergencyContact: ""
    });
  };

  const selectedServiceDetails = mockServices.find(service => service.id === parseInt(selectedService));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-orange-100 text-orange-700 border-orange-300 mb-4">Book Your Visit</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6">
            Schedule Your Dog's Stay
          </h1>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto">
            Choose your service, pick your dates, and let us know about your furry friend. 
            We'll take care of the rest!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar & Service Selection */}
          <div className="space-y-8">
            {/* Service Selection */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dog className="h-5 w-5 text-orange-600" />
                  <span>Select Service</span>
                </CardTitle>
                <CardDescription>Choose the service you'd like to book</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        <div className="flex justify-between items-center w-full">
                          <span>{service.name}</span>
                          <span className="text-orange-600 font-semibold ml-4">
                            {service.price} {service.period}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedServiceDetails && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      {selectedServiceDetails.name} - {selectedServiceDetails.price} {selectedServiceDetails.period}
                    </h4>
                    <p className="text-orange-700 text-sm mb-3">{selectedServiceDetails.description}</p>
                    <ul className="space-y-1">
                      {selectedServiceDetails.features.map((feature, index) => (
                        <li key={index} className="text-sm text-orange-600 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-orange-600" />
                  <span>Select Date</span>
                </CardTitle>
                <CardDescription>
                  Choose your preferred date. Dates in red are unavailable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => isPastDate(date) || isDateBooked(date)}
                  className="rounded-md border border-orange-200"
                  modifiers={{
                    booked: bookedDates
                  }}
                  modifiersStyles={{
                    booked: { 
                      backgroundColor: '#dc2626', 
                      color: 'white',
                      textDecoration: 'line-through'
                    }
                  }}
                />
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-600">Selected date</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-sm text-gray-600">Unavailable dates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm text-gray-600">Available dates</span>
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Selected: {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-orange-600" />
                <span>Booking Details</span>
              </CardTitle>
              <CardDescription>Tell us about you and your furry friend</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2">
                    Owner Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Full Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Dog Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2">
                    Dog Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dogName">Dog's Name *</Label>
                    <Input
                      id="dogName"
                      value={formData.dogName}
                      onChange={(e) => handleInputChange('dogName', e.target.value)}
                      placeholder="Your dog's name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dogBreed">Breed</Label>
                      <Input
                        id="dogBreed"
                        value={formData.dogBreed}
                        onChange={(e) => handleInputChange('dogBreed', e.target.value)}
                        placeholder="Golden Retriever, Mixed, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dogAge">Age</Label>
                      <Input
                        id="dogAge"
                        value={formData.dogAge}
                        onChange={(e) => handleInputChange('dogAge', e.target.value)}
                        placeholder="2 years, 6 months, etc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialNeeds">Special Needs or Instructions</Label>
                    <Textarea
                      id="specialNeeds"
                      value={formData.specialNeeds}
                      onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                      placeholder="Any medical conditions, dietary restrictions, behavioral notes, etc."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact name and phone"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!selectedDate || !selectedService}
                >
                  Submit Booking Request
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields. We'll contact you within 24 hours to confirm your booking.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12 shadow-lg bg-gradient-to-br from-orange-100 to-amber-100">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Questions About Booking?</h3>
              <p className="text-orange-700">We're here to help! Contact us directly.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-orange-500 rounded-full p-3">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-900">Call Us</h4>
                <p className="text-orange-700">(920) 285-2706</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-orange-500 rounded-full p-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-900">Visit Us</h4>
                <p className="text-orange-700">106 S 3rd Street<br />Watertown, WI 53094</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-orange-500 rounded-full p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-900">Hours</h4>
                <p className="text-orange-700">Mon-Wed: 8am-4pm<br />Thu: 8am-5pm<br />Fri: 8am-3pm<br />Sun: By appointment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;