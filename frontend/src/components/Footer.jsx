import React from "react";
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-900 to-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Fur the Love of Dogs</h3>
                <p className="text-orange-200 text-sm">Premium Dog Care</p>
              </div>
            </div>
            <p className="text-orange-100 leading-relaxed mb-6">
              A family-owned business dedicated to providing exceptional care for your beloved pets. 
              With over 15 years of experience, we treat every dog as if they were our own.
            </p>
            <div className="flex items-center space-x-2 text-orange-200">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Trusted by over 1,000 happy families</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-200">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-300" />
                <span className="text-orange-100">(920) 285-2706</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-300" />
                <span className="text-orange-100">Contact us by phone</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-orange-300 mt-1" />
                <span className="text-orange-100">106 S 3rd Street<br />Watertown, WI 53094</span>
              </div>
            </div>
          </div>

          {/* Hours & Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-200">Hours & Links</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-300" />
                <div className="text-orange-100">
                  <div>Mon-Wed: 8am-4pm</div>
                  <div>Thu: 8am-5pm</div>
                  <div>Fri: 8am-3pm</div>
                  <div>Sun: By appointment</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/" className="block text-orange-200 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="block text-orange-200 hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link to="/booking" className="block text-orange-200 hover:text-white transition-colors duration-200">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-800 mt-8 pt-8 text-center">
          <p className="text-orange-200">
            © 2024 Fur the Love of Dogs. Made with{" "}
            <Heart className="inline h-4 w-4 text-red-400" fill="currentColor" />{" "}
            for your furry friends.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;