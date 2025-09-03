from motor.motor_asyncio import AsyncIOMotorClient
from models import Service, Review, Booking, UnavailableDate, PaymentTransaction
import os
from datetime import datetime, date
import json

# Database connection - import from main server.py environment
# This will be set by server.py when it imports this module

# Collections
services_collection = db.services
reviews_collection = db.reviews
bookings_collection = db.bookings
unavailable_dates_collection = db.unavailable_dates
payment_transactions_collection = db.payment_transactions

async def seed_data():
    """Seed the database with initial data"""
    
    # Check if data already exists
    if await services_collection.count_documents({}) > 0:
        return  # Data already seeded
    
    # Seed Services
    services_data = [
        {
            "id": "1",
            "name": "Cage-Free Sleepovers",
            "price": 45.0,
            "period": "per night",
            "description": "Your dog enjoys a social environment without cages in our private rooms",
            "features": [
                "Private room accommodations",
                "Cage-free social environment", 
                "Second dog: $25/night",
                "Third dog: $10/night",
                "Up-to-date vaccinations required"
            ],
            "popular": True,
            "active": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "2", 
            "name": "Dog Daycare - Full Time",
            "price": 25.0,
            "period": "per day (4+ hours)",
            "description": "Supervised playtime and socialization for 4 hours or more",
            "features": [
                "Full day of supervised play",
                "Social interaction with other dogs",
                "Professional supervision",
                "Multi-day packages available",
                "Second dog: $21/day"
            ],
            "popular": False,
            "active": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "3",
            "name": "Dog Daycare - Part Time",
            "price": 17.0,
            "period": "per day (up to 4 hours)",
            "description": "Perfect for shorter visits with supervised play and care",
            "features": [
                "Up to 4 hours of care",
                "Supervised playtime",
                "Social interaction",
                "Flexible scheduling",
                "With grooming: $17/day"
            ],
            "popular": False,
            "active": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "4",
            "name": "Fur Salon Grooming",
            "price": 75.0,
            "period": "per session",
            "description": "Professional grooming tailored to your dog's specific needs",
            "features": [
                "Professional baths",
                "Haircuts and styling",
                "Nail trimming",
                "Ear cleaning",
                "Customized grooming plans"
            ],
            "popular": False,
            "active": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await services_collection.insert_many(services_data)
    
    # Seed Reviews
    reviews_data = [
        {
            "id": "1",
            "customer_name": "Lisa M.",
            "dog_name": "Buddy",
            "rating": 5,
            "review_text": "The cage-free sleepovers are amazing! My dog Buddy loves staying here. The staff is so caring and professional. I never worry when he's at Fur the Love of Dogs - he comes home happy and well-cared for.",
            "service_type": "Cage-Free Sleepovers",
            "date": "2 weeks ago",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "2",
            "customer_name": "Tom & Karen W.",
            "dog_name": "Sadie",
            "rating": 5,
            "review_text": "We've been using their daycare services for months now and couldn't be happier. Sadie gets great exercise and socialization. The staff knows every dog by name and treats them like their own.",
            "service_type": "Dog Daycare",
            "date": "1 month ago",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "3",
            "customer_name": "Michelle P.",
            "dog_name": "Max",
            "rating": 5,
            "review_text": "The grooming services are top-notch! Max always looks fantastic after his appointments. The groomers are gentle and skilled, and they really care about making each dog comfortable.",
            "service_type": "Fur Salon Grooming",
            "date": "3 weeks ago",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "4",
            "customer_name": "John D.",
            "dog_name": "Jake & Luna",
            "rating": 5,
            "review_text": "Great experience with the cage-free environment. My two dogs, Jake and Luna, love playing with the other dogs. The meet and greet process was thorough and professional.",
            "service_type": "Cage-Free Sleepovers",
            "date": "1 week ago",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": "5",
            "customer_name": "Patricia R.",
            "dog_name": "Chester",
            "rating": 5,
            "review_text": "Fantastic daycare service! My senior dog Chester gets gentle, individualized attention. They understand that older dogs have different needs. Highly recommend this place!",
            "service_type": "Dog Daycare",
            "date": "2 months ago",
            "approved": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await reviews_collection.insert_many(reviews_data)
    
    # Seed unavailable dates (December 2024 & January 2025)
    unavailable_dates_data = [
        {"id": "1", "date": date(2024, 12, 15), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "2", "date": date(2024, 12, 16), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "3", "date": date(2024, 12, 22), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "4", "date": date(2024, 12, 23), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "5", "date": date(2024, 12, 24), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "6", "date": date(2024, 12, 25), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "7", "date": date(2024, 12, 29), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "8", "date": date(2024, 12, 30), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "9", "date": date(2024, 12, 31), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "10", "date": date(2025, 1, 1), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "11", "date": date(2025, 1, 5), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "12", "date": date(2025, 1, 6), "reason": "booked", "created_at": datetime.utcnow()}
    ]
    
    await unavailable_dates_collection.insert_many(unavailable_dates_data)

# Helper functions
async def get_service_by_id(service_id: str):
    service_doc = await services_collection.find_one({"id": service_id, "active": True})
    return Service(**service_doc) if service_doc else None

async def create_booking(booking_data: dict):
    result = await bookings_collection.insert_one(booking_data)
    return str(result.inserted_id)

async def get_booking_by_id(booking_id: str):
    booking_doc = await bookings_collection.find_one({"id": booking_id})
    return Booking(**booking_doc) if booking_doc else None

async def update_booking(booking_id: str, update_data: dict):
    await bookings_collection.update_one(
        {"id": booking_id}, 
        {"$set": update_data}
    )

async def create_payment_transaction(transaction_data: dict):
    result = await payment_transactions_collection.insert_one(transaction_data)
    return str(result.inserted_id)

async def get_payment_transaction_by_session_id(session_id: str):
    transaction_doc = await payment_transactions_collection.find_one({"stripe_session_id": session_id})
    return PaymentTransaction(**transaction_doc) if transaction_doc else None

async def update_payment_transaction(transaction_id: str, update_data: dict):
    update_data["updated_at"] = datetime.utcnow()
    await payment_transactions_collection.update_one(
        {"id": transaction_id},
        {"$set": update_data}
    )