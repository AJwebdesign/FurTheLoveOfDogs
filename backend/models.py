from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime, date
from enum import Enum
import uuid

# Enums
class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed" 
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class PaymentStatus(str, Enum):
    INITIATED = "initiated"
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"

class PaymentMethod(str, Enum):
    IN_PERSON = "in_person"

# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float
    period: str
    description: str
    features: List[str]
    popular: bool = False
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    name: str
    price: float
    period: str
    description: str
    features: List[str]
    popular: bool = False

# Review Models
class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    dog_name: str
    rating: int = Field(ge=1, le=5)
    review_text: str
    service_type: str
    date: str
    approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ReviewCreate(BaseModel):
    customer_name: str
    dog_name: str
    rating: int = Field(ge=1, le=5)
    review_text: str
    service_type: str

# Booking Models
class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    owner_name: str
    phone: str
    email: Optional[str] = None
    dog_name: str
    dog_breed: Optional[str] = None
    dog_age: Optional[str] = None
    service_id: str
    service_name: str
    booking_date: date
    special_needs: Optional[str] = None
    emergency_contact: Optional[str] = None
    status: BookingStatus = BookingStatus.PENDING
    payment_method: PaymentMethod = PaymentMethod.IN_PERSON
    payment_required: bool = True
    total_amount: float
    payment_status: PaymentStatus = PaymentStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BookingCreate(BaseModel):
    owner_name: str
    phone: str
    email: Optional[str] = None
    dog_name: str
    dog_breed: Optional[str] = None
    dog_age: Optional[str] = None
    service_id: str
    booking_date: date
    special_needs: Optional[str] = None
    emergency_contact: Optional[str] = None
    payment_method: PaymentMethod

# Unavailable Date Models
class UnavailableDate(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str  # Store as ISO format string
    reason: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UnavailableDateCreate(BaseModel):
    date: str  # Accept as ISO format string
    reason: str

# Payment Models
class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_id: str
    session_id: Optional[str] = None
    amount: float
    currency: str = "usd"
    payment_method: PaymentMethod
    payment_status: PaymentStatus = PaymentStatus.INITIATED
    stripe_session_id: Optional[str] = None
    metadata: Optional[Dict[str, str]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PaymentTransactionCreate(BaseModel):
    booking_id: str
    amount: float
    currency: str = "usd"
    payment_method: PaymentMethod
    metadata: Optional[Dict[str, str]] = None

# Stripe Models
class StripeCheckoutRequest(BaseModel):
    booking_id: str
    origin_url: str

class StripeCheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str