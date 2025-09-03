import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Heart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-900">Fur the Love of Dogs</h1>
              <p className="text-xs text-orange-600 -mt-1">Premium Dog Care</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 ${
                isActive("/") ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 ${
                isActive("/about") ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-gray-700"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/booking"
              className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 ${
                isActive("/booking") ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-gray-700"
              }`}
            >
              Book Now
            </Link>
            <Button 
              asChild
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/booking">Schedule Visit</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-orange-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-orange-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive("/") ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive("/about") ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/booking"
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive("/booking") ? "text-orange-600 bg-orange-50" : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <div className="pt-2">
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                >
                  <Link to="/booking" onClick={() => setIsMenuOpen(false)}>Schedule Visit</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;