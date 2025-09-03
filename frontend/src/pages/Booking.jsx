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
import { Calendar as CalendarIcon, Clock, Dog, Phone, Mail, User, DollarSign, CheckCircle } from "lucide-react";
import api from "../services/api";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Arrival date
  const [selectedPickupDate, setSelectedPickupDate] = useState(null); // Pickup date for sleepovers
  const [dateSelectionStep, setDateSelectionStep] = useState(1); // 1 = arrival, 2 = pickup
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedService || !formData.ownerName || !formData.phone || !formData.dogName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      // Create booking
      const bookingData = {
        owner_name: formData.ownerName,
        phone: formData.phone,
        email: formData.email || null,
        dog_name: formData.dogName,
        dog_breed: formData.dogBreed || null,
        dog_age: formData.dogAge || null,
        service_id: selectedService,
        booking_date: selectedDate.toISOString().split('T')[0],
        special_needs: formData.specialNeeds || null,
        emergency_contact: formData.emergencyContact || null
      };

      const bookingResponse = await api.booking.create(bookingData);

      // Show confirmation
      setConfirmationDetails(bookingResponse);
      setBookingConfirmed(true);
      
      toast.success("Booking confirmed successfully! " + (bookingResponse.email_sent ? "Confirmation email sent." : ""));
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(api.handleError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const startNewBooking = () => {
    setBookingConfirmed(false);
    setConfirmationDetails(null);
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

  const selectedServiceDetails = services.find(service => service.id === selectedService);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-600">Loading booking form...</p>
        </div>
      </div>
    );
  }

  // Show confirmation screen after successful booking
  if (bookingConfirmed && confirmationDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl bg-white">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed! 🎉</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Thank you for choosing Fur the Love of Dogs. We can't wait to meet {formData.dogName}!
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-orange-900 mb-6">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-gray-600 mb-1">Owner</p>
                    <p className="font-semibold text-gray-900">{formData.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Dog</p>
                    <p className="font-semibold text-gray-900">{formData.dogName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Service</p>
                    <p className="font-semibold text-gray-900">{confirmationDetails.service_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{new Date(confirmationDetails.booking_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Total Amount</p>
                    <p className="font-semibold text-green-600 text-xl">${confirmationDetails.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Payment</p>
                    <p className="font-semibold text-gray-900">In-Person</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
                <h3 className="text-lg font-bold text-blue-900 mb-3">What's Next?</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• We'll contact you within 24 hours to confirm details</li>
                  <li>• Payment of ${confirmationDetails.total_amount} will be collected when you drop off {formData.dogName}</li>
                  <li>• Please bring your dog's vaccination records</li>
                  <li>• Arrive 15 minutes early for check-in</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-orange-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-800">
                  <div>
                    <p><strong>Phone:</strong> (920) 285-2706</p>
                    <p><strong>Address:</strong> 106 S 3rd Street</p>
                    <p>Watertown, WI 53094</p>
                  </div>
                  <div>
                    <p><strong>Hours:</strong></p>
                    <p>Mon-Wed: 8am-4pm</p>
                    <p>Thu: 8am-5pm, Fri: 8am-3pm</p>
                    <p>Sun: By appointment</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={startNewBooking}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                >
                  Make Another Booking
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{service.name}</span>
                          <span className="text-orange-600 font-semibold ml-4">
                            {service.name === "Fur Salon Grooming" ? "Call for pricing" : `$${service.price} ${service.period}`}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedServiceDetails && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      {selectedServiceDetails.name} - {selectedServiceDetails.name === "Fur Salon Grooming" ? "Call for pricing" : `$${selectedServiceDetails.price} ${selectedServiceDetails.period}`}
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

                {/* Payment Information */}
                {selectedServiceDetails && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-orange-200 pb-2">
                      Payment Information
                    </h3>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                        <div>
                          <div className="text-2xl font-bold text-orange-900">
                            ${selectedServiceDetails.price}
                          </div>
                          <div className="text-sm text-orange-700">
                            {selectedServiceDetails.period}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/60 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">Payment Details</h4>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Payment will be collected in person</li>
                          <li>• Pay when you drop off your dog</li>
                          <li>• Cash, check, or card accepted</li>
                          <li>• No online payment required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  disabled={!selectedDate || !selectedService || submitting}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Confirm Booking</span>
                    </div>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields. We'll contact you within 24 hours to confirm your booking and arrange payment details.
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