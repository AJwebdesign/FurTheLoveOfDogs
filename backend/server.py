from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
import json
from datetime import datetime, date

# Import models
from models import *

# Email/SMS notification imports
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Database helper functions
async def seed_data():
    """Seed the database with initial data"""
    
    # Check if services data already exists
    services_exist = await services_collection.count_documents({}) > 0
    unavailable_dates_exist = await unavailable_dates_collection.count_documents({}) > 0
    
    # Seed Services (only if not exists)
    if not services_exist:
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
    
    # Seed Reviews (only if services were just created)
    if not services_exist:
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
        {"id": "1", "date": date(2024, 12, 15).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "2", "date": date(2024, 12, 16).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "3", "date": date(2024, 12, 22).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "4", "date": date(2024, 12, 23).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "5", "date": date(2024, 12, 24).isoformat(), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "6", "date": date(2024, 12, 25).isoformat(), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "7", "date": date(2024, 12, 29).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "8", "date": date(2024, 12, 30).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "9", "date": date(2024, 12, 31).isoformat(), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "10", "date": date(2025, 1, 1).isoformat(), "reason": "holiday", "created_at": datetime.utcnow()},
        {"id": "11", "date": date(2025, 1, 5).isoformat(), "reason": "booked", "created_at": datetime.utcnow()},
        {"id": "12", "date": date(2025, 1, 6).isoformat(), "reason": "booked", "created_at": datetime.utcnow()}
    ]
    
    await unavailable_dates_collection.insert_many(unavailable_dates_data)

async def get_service_by_id(service_id: str):
    service_doc = await services_collection.find_one({"id": service_id, "active": True})
    return Service(**service_doc) if service_doc else None

async def get_booking_by_id(booking_id: str):
    booking_doc = await bookings_collection.find_one({"id": booking_id})
    return Booking(**booking_doc) if booking_doc else None

async def update_booking(booking_id: str, update_data: dict):
    await bookings_collection.update_one(
        {"id": booking_id}, 
        {"$set": update_data}
    )

async def get_payment_transaction_by_session_id(session_id: str):
    transaction_doc = await payment_transactions_collection.find_one({"stripe_session_id": session_id})
    return PaymentTransaction(**transaction_doc) if transaction_doc else None

async def update_payment_transaction(transaction_id: str, update_data: dict):
    update_data["updated_at"] = datetime.utcnow()
    await payment_transactions_collection.update_one(
        {"id": transaction_id},
        {"$set": update_data}
    )

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
services_collection = db.services
reviews_collection = db.reviews
bookings_collection = db.bookings
unavailable_dates_collection = db.unavailable_dates
payment_transactions_collection = db.payment_transactions

# Stripe integration
stripe_api_key = os.environ.get('STRIPE_API_KEY')
if not stripe_api_key:
    logging.error("STRIPE_API_KEY not found in environment variables")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize Stripe checkout (will be initialized per request)
def get_stripe_checkout(request: Request):
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    return StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)

# Services endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services():
    """Get all active services"""
    services_cursor = services_collection.find({"active": True})
    services = []
    async for service_doc in services_cursor:
        services.append(Service(**service_doc))
    return services

@api_router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    """Get a specific service by ID"""
    service = await get_service_by_id(service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# Reviews endpoints
@api_router.get("/reviews", response_model=List[Review])
async def get_reviews(limit: int = 20, approved_only: bool = True):
    """Get reviews with pagination"""
    query = {"approved": True} if approved_only else {}
    reviews_cursor = reviews_collection.find(query).limit(limit)
    reviews = []
    async for review_doc in reviews_cursor:
        reviews.append(Review(**review_doc))
    return reviews

@api_router.post("/reviews", response_model=Review)
async def create_review(review_data: ReviewCreate):
    """Submit a new review (requires approval)"""
    review = Review(**review_data.dict())
    await reviews_collection.insert_one(review.dict())
    return review

# Unavailable dates endpoint
@api_router.get("/unavailable-dates")
async def get_unavailable_dates():
    """Get dates that are not available for booking"""
    dates_cursor = unavailable_dates_collection.find({})
    unavailable_dates = []
    async for date_doc in dates_cursor:
        # Convert date to ISO format string
        date_str = date_doc["date"].isoformat() if isinstance(date_doc["date"], date) else date_doc["date"]
        unavailable_dates.append(date_str)
    return {"unavailable_dates": unavailable_dates}

# Booking endpoints
@api_router.post("/bookings")
async def create_booking_request(booking_data: BookingCreate):
    """Create a new booking request"""
    # Get service details
    service = await get_service_by_id(booking_data.service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Check if date is available
    booking_date_str = booking_data.booking_date.isoformat()
    existing_unavailable = await unavailable_dates_collection.find_one({
        "date": booking_date_str
    })
    
    if existing_unavailable:
        raise HTTPException(status_code=400, detail="Selected date is not available")
    
    # Create booking
    booking = Booking(
        **booking_data.dict(),
        service_name=service.name,
        total_amount=service.price,
        payment_required=(booking_data.payment_method == PaymentMethod.STRIPE)
    )
    
    # Save to database
    await bookings_collection.insert_one(booking.dict())
    
    # If payment method is in-person, mark as confirmed
    if booking_data.payment_method == PaymentMethod.IN_PERSON:
        await bookings_collection.update_one(
            {"id": booking.id},
            {"$set": {"payment_status": PaymentStatus.PENDING}}
        )
        return {
            "booking_id": booking.id,
            "message": "Booking created successfully. Payment will be collected in person.",
            "payment_required": False
        }
    
    # If Stripe payment, return booking ID for payment processing
    return {
        "booking_id": booking.id,
        "message": "Booking created. Please proceed with payment.",
        "payment_required": True,
        "amount": service.price
    }

# Payment endpoints
@api_router.post("/payments/checkout/session")
async def create_checkout_session(request: Request, checkout_request: StripeCheckoutRequest):
    """Create Stripe checkout session for booking payment"""
    
    # Get booking details
    booking = await get_booking_by_id(checkout_request.booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking.payment_method != PaymentMethod.STRIPE:
        raise HTTPException(status_code=400, detail="Booking is not set for Stripe payment")
    
    # Initialize Stripe checkout
    stripe_checkout = get_stripe_checkout(request)
    
    # Build success and cancel URLs
    success_url = f"{checkout_request.origin_url}/booking?session_id={{CHECKOUT_SESSION_ID}}&status=success"
    cancel_url = f"{checkout_request.origin_url}/booking?status=cancelled"
    
    # Create checkout session request
    session_request = CheckoutSessionRequest(
        amount=booking.total_amount,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "booking_id": booking.id,
            "service_name": booking.service_name,
            "dog_name": booking.dog_name,
            "owner_name": booking.owner_name
        }
    )
    
    try:
        # Create Stripe checkout session
        session_response: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(session_request)
        
        # Create payment transaction record
        payment_transaction = PaymentTransaction(
            booking_id=booking.id,
            session_id=session_response.session_id,
            amount=booking.total_amount,
            currency="usd",
            payment_method=PaymentMethod.STRIPE,
            payment_status=PaymentStatus.INITIATED,
            stripe_session_id=session_response.session_id,
            metadata=session_request.metadata
        )
        
        # Save payment transaction
        await payment_transactions_collection.insert_one(payment_transaction.dict())
        
        # Update booking with Stripe session ID
        await update_booking(booking.id, {
            "stripe_session_id": session_response.session_id,
            "payment_status": PaymentStatus.INITIATED
        })
        
        return {
            "checkout_url": session_response.url,
            "session_id": session_response.session_id
        }
        
    except Exception as e:
        logging.error(f"Error creating Stripe checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create payment session")

@api_router.get("/payments/checkout/status/{session_id}")
async def get_checkout_status(request: Request, session_id: str):
    """Get payment status for checkout session"""
    
    # Get payment transaction
    transaction = await get_payment_transaction_by_session_id(session_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Payment session not found")
    
    # Initialize Stripe checkout and get status
    stripe_checkout = get_stripe_checkout(request)
    
    try:
        status_response: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update payment transaction if status changed
        if status_response.payment_status != transaction.payment_status.value:
            await update_payment_transaction(transaction.id, {
                "payment_status": status_response.payment_status
            })
            
            # Update booking if payment was successful
            if status_response.payment_status == "paid":
                await update_booking(transaction.booking_id, {
                    "payment_status": PaymentStatus.PAID,
                    "status": BookingStatus.CONFIRMED
                })
                
                # Add booking date to unavailable dates
                booking = await get_booking_by_id(transaction.booking_id)
                if booking:
                    unavailable_date = UnavailableDate(
                        date=booking.booking_date.isoformat() if isinstance(booking.booking_date, date) else booking.booking_date,
                        reason="booked"
                    )
                    await unavailable_dates_collection.insert_one(unavailable_date.dict())
        
        return {
            "status": status_response.status,
            "payment_status": status_response.payment_status,
            "amount_total": status_response.amount_total,
            "currency": status_response.currency,
            "metadata": status_response.metadata
        }
        
    except Exception as e:
        logging.error(f"Error checking payment status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")

# Stripe webhook endpoint
@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    
    try:
        # Get raw body and signature
        body = await request.body()
        signature = request.headers.get("stripe-signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="Missing Stripe signature")
        
        # Initialize Stripe checkout
        stripe_checkout = get_stripe_checkout(request)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Process webhook event
        if webhook_response.event_type in ["checkout.session.completed", "payment_intent.succeeded"]:
            # Update payment transaction
            transaction = await get_payment_transaction_by_session_id(webhook_response.session_id)
            if transaction:
                await update_payment_transaction(transaction.id, {
                    "payment_status": webhook_response.payment_status
                })
                
                # Update booking if payment was successful
                if webhook_response.payment_status == "paid":
                    await update_booking(transaction.booking_id, {
                        "payment_status": PaymentStatus.PAID,
                        "status": BookingStatus.CONFIRMED
                    })
        
        return {"status": "success"}
        
    except Exception as e:
        logging.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Fur the Love of Dogs API is running"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Seed database with initial data on startup"""
    await seed_data()
    logger.info("Database seeded with initial data")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()