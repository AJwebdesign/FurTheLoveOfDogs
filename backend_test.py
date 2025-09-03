#!/usr/bin/env python3
"""
Backend API Test Suite for Fur the Love of Dogs
Tests all API endpoints including services, reviews, bookings, and payments
"""

import requests
import json
from datetime import datetime, date, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://pet-retreat-1.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class DogKennelAPITester:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data
        })
        
    def test_services_endpoint(self):
        """Test GET /api/services endpoint"""
        print("\n=== Testing Services Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/services")
            
            if response.status_code == 200:
                services = response.json()
                
                # Check if we have 4 services
                if len(services) == 4:
                    self.log_test("Services Count", True, f"Found {len(services)} services as expected")
                else:
                    self.log_test("Services Count", False, f"Expected 4 services, got {len(services)}")
                
                # Check service IDs and pricing
                expected_services = {
                    "1": {"name": "Cage-Free Sleepovers", "price": 45.0},
                    "2": {"name": "Dog Daycare - Full Time", "price": 25.0},
                    "3": {"name": "Dog Daycare - Part Time", "price": 17.0},
                    "4": {"name": "Fur Salon Grooming", "price": 75.0}
                }
                
                services_by_id = {service['id']: service for service in services}
                
                for service_id, expected in expected_services.items():
                    if service_id in services_by_id:
                        service = services_by_id[service_id]
                        if service['name'] == expected['name'] and service['price'] == expected['price']:
                            self.log_test(f"Service {service_id}", True, f"Correct name and price: {service['name']} - ${service['price']}")
                        else:
                            self.log_test(f"Service {service_id}", False, f"Incorrect data: {service['name']} - ${service['price']}")
                    else:
                        self.log_test(f"Service {service_id}", False, f"Service ID {service_id} not found")
                
                self.log_test("Services API", True, "Services endpoint working correctly", services)
                
            else:
                self.log_test("Services API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Services API", False, f"Exception: {str(e)}")
    
    def test_reviews_endpoint(self):
        """Test GET /api/reviews endpoint"""
        print("\n=== Testing Reviews Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/reviews")
            
            if response.status_code == 200:
                reviews = response.json()
                
                if len(reviews) > 0:
                    self.log_test("Reviews Count", True, f"Found {len(reviews)} reviews")
                    
                    # Check review structure
                    first_review = reviews[0]
                    required_fields = ['id', 'customer_name', 'dog_name', 'rating', 'review_text', 'service_type']
                    
                    missing_fields = [field for field in required_fields if field not in first_review]
                    if not missing_fields:
                        self.log_test("Reviews Structure", True, "All required fields present")
                    else:
                        self.log_test("Reviews Structure", False, f"Missing fields: {missing_fields}")
                    
                    # Check ratings are valid (1-5)
                    valid_ratings = all(1 <= review['rating'] <= 5 for review in reviews)
                    if valid_ratings:
                        self.log_test("Reviews Ratings", True, "All ratings are valid (1-5)")
                    else:
                        self.log_test("Reviews Ratings", False, "Some ratings are invalid")
                    
                    self.log_test("Reviews API", True, "Reviews endpoint working correctly", reviews[:2])  # Log first 2 reviews
                else:
                    self.log_test("Reviews API", False, "No reviews found")
                    
            else:
                self.log_test("Reviews API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Reviews API", False, f"Exception: {str(e)}")
    
    def test_unavailable_dates_endpoint(self):
        """Test GET /api/unavailable-dates endpoint"""
        print("\n=== Testing Unavailable Dates Endpoint ===")
        
        try:
            response = self.session.get(f"{self.base_url}/unavailable-dates")
            
            if response.status_code == 200:
                data = response.json()
                
                if 'unavailable_dates' in data:
                    unavailable_dates = data['unavailable_dates']
                    
                    if len(unavailable_dates) > 0:
                        self.log_test("Unavailable Dates Count", True, f"Found {len(unavailable_dates)} unavailable dates")
                        
                        # Check date format
                        try:
                            for date_str in unavailable_dates[:3]:  # Check first 3 dates
                                datetime.fromisoformat(date_str)
                            self.log_test("Date Format", True, "Dates are in valid ISO format")
                        except ValueError:
                            self.log_test("Date Format", False, "Invalid date format found")
                        
                        self.log_test("Unavailable Dates API", True, "Unavailable dates endpoint working correctly", data)
                    else:
                        self.log_test("Unavailable Dates API", True, "No unavailable dates found (valid scenario)")
                else:
                    self.log_test("Unavailable Dates API", False, "Response missing 'unavailable_dates' field")
                    
            else:
                self.log_test("Unavailable Dates API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Unavailable Dates API", False, f"Exception: {str(e)}")
    
    def test_booking_creation(self):
        """Test POST /api/bookings endpoint with both payment methods"""
        print("\n=== Testing Booking Creation ===")
        
        # Get a future available date (30 days from now)
        future_date = (datetime.now() + timedelta(days=30)).date()
        
        # Test data for booking
        booking_data_stripe = {
            "owner_name": "Sarah Johnson",
            "phone": "555-0123",
            "email": "sarah.johnson@email.com",
            "dog_name": "Bella",
            "dog_breed": "Golden Retriever",
            "dog_age": "3 years",
            "service_id": "1",  # Cage-Free Sleepovers
            "booking_date": future_date.isoformat(),
            "special_needs": "Needs medication at 6 PM",
            "emergency_contact": "555-0456",
            "payment_method": "stripe"
        }
        
        booking_data_in_person = {
            "owner_name": "Michael Chen",
            "phone": "555-0789",
            "email": "michael.chen@email.com",
            "dog_name": "Max",
            "dog_breed": "German Shepherd",
            "dog_age": "5 years",
            "service_id": "2",  # Dog Daycare - Full Time
            "booking_date": (future_date + timedelta(days=1)).isoformat(),
            "special_needs": "Very energetic, needs lots of exercise",
            "emergency_contact": "555-0321",
            "payment_method": "in_person"
        }
        
        # Test Stripe payment booking
        try:
            response = self.session.post(
                f"{self.base_url}/bookings",
                json=booking_data_stripe,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                booking_response = response.json()
                
                if 'booking_id' in booking_response and booking_response.get('payment_required') == True:
                    self.log_test("Stripe Booking Creation", True, f"Booking created with ID: {booking_response['booking_id']}")
                    self.stripe_booking_id = booking_response['booking_id']
                else:
                    self.log_test("Stripe Booking Creation", False, f"Invalid response structure: {booking_response}")
            else:
                self.log_test("Stripe Booking Creation", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Stripe Booking Creation", False, f"Exception: {str(e)}")
        
        # Test in-person payment booking
        try:
            response = self.session.post(
                f"{self.base_url}/bookings",
                json=booking_data_in_person,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                booking_response = response.json()
                
                if 'booking_id' in booking_response and booking_response.get('payment_required') == False:
                    self.log_test("In-Person Booking Creation", True, f"Booking created with ID: {booking_response['booking_id']}")
                    self.in_person_booking_id = booking_response['booking_id']
                else:
                    self.log_test("In-Person Booking Creation", False, f"Invalid response structure: {booking_response}")
            else:
                self.log_test("In-Person Booking Creation", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("In-Person Booking Creation", False, f"Exception: {str(e)}")
    
    def test_stripe_checkout_session(self):
        """Test POST /api/payments/checkout/session endpoint"""
        print("\n=== Testing Stripe Checkout Session ===")
        
        if not hasattr(self, 'stripe_booking_id'):
            self.log_test("Stripe Checkout Session", False, "No Stripe booking ID available from previous test")
            return
        
        checkout_data = {
            "booking_id": self.stripe_booking_id,
            "origin_url": "https://pet-retreat-1.preview.emergentagent.com"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/payments/checkout/session",
                json=checkout_data,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                checkout_response = response.json()
                
                if 'checkout_url' in checkout_response and 'session_id' in checkout_response:
                    self.log_test("Stripe Checkout Session", True, f"Session created with ID: {checkout_response['session_id']}")
                    self.session_id = checkout_response['session_id']
                else:
                    self.log_test("Stripe Checkout Session", False, f"Invalid response structure: {checkout_response}")
            else:
                self.log_test("Stripe Checkout Session", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Stripe Checkout Session", False, f"Exception: {str(e)}")
    
    def test_payment_status_check(self):
        """Test GET /api/payments/checkout/status/{session_id} endpoint"""
        print("\n=== Testing Payment Status Check ===")
        
        if not hasattr(self, 'session_id'):
            self.log_test("Payment Status Check", False, "No session ID available from previous test")
            return
        
        try:
            response = self.session.get(f"{self.base_url}/payments/checkout/status/{self.session_id}")
            
            if response.status_code == 200:
                status_response = response.json()
                
                required_fields = ['status', 'payment_status', 'amount_total', 'currency']
                missing_fields = [field for field in required_fields if field not in status_response]
                
                if not missing_fields:
                    self.log_test("Payment Status Check", True, f"Status: {status_response['status']}, Payment: {status_response['payment_status']}")
                else:
                    self.log_test("Payment Status Check", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Payment Status Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Payment Status Check", False, f"Exception: {str(e)}")
    
    def test_api_health(self):
        """Test API health endpoint"""
        print("\n=== Testing API Health ===")
        
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                health_response = response.json()
                if 'message' in health_response:
                    self.log_test("API Health", True, f"API is running: {health_response['message']}")
                else:
                    self.log_test("API Health", False, "Health endpoint missing message field")
            else:
                self.log_test("API Health", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("API Health", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Dog Kennel API Tests")
        print(f"📍 Testing API at: {self.base_url}")
        print("=" * 60)
        
        # Initialize booking IDs
        self.stripe_booking_id = None
        self.in_person_booking_id = None
        self.session_id = None
        
        # Run all tests
        self.test_api_health()
        self.test_services_endpoint()
        self.test_reviews_endpoint()
        self.test_unavailable_dates_endpoint()
        self.test_booking_creation()
        self.test_stripe_checkout_session()
        self.test_payment_status_check()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  • {result['test']}: {result['message']}")
        
        print("\n" + "=" * 60)

if __name__ == "__main__":
    tester = DogKennelAPITester()
    tester.run_all_tests()