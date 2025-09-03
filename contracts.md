# API Contracts for Fur the Love of Dogs Kennel

## Current Mock Data (in mockData.js)

### Services
- 4 services: Overnight Boarding ($100/night), Daycare ($45/day), Grooming ($75/session), Training ($120/package)
- Each service has features array and pricing info

### Reviews  
- 5 customer reviews with ratings, names, dog names, service type, dates
- All currently 5-star ratings

### Booked Dates
- Array of unavailable dates for the calendar (December 2024 & January 2025)

### Family Story
- Business founded in 2009
- 3 family members with roles and bio
- Company values and story text

## Backend Implementation Needed

### 1. Database Models

#### Service Model
```
- id: ObjectId
- name: String
- price: Number  
- period: String (per night, per day, etc)
- description: String
- features: [String]
- popular: Boolean
- active: Boolean
- created_at: DateTime
```

#### Review Model  
```
- id: ObjectId
- customer_name: String
- dog_name: String
- rating: Number (1-5)
- review_text: String
- service_type: String
- date: DateTime
- approved: Boolean
- created_at: DateTime
```

#### Booking Model
```
- id: ObjectId
- owner_name: String
- phone: String
- email: String
- dog_name: String
- dog_breed: String
- dog_age: String
- service_id: ObjectId (ref to Service)
- booking_date: Date
- special_needs: String
- emergency_contact: String
- status: String (pending, confirmed, cancelled)
- created_at: DateTime
```

#### Unavailable_Date Model
```
- id: ObjectId
- date: Date
- reason: String (booked, maintenance, holiday)
- created_at: DateTime
```

### 2. API Endpoints Needed

#### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get single service

#### Reviews
- `GET /api/reviews` - Get approved reviews (with pagination)
- `POST /api/reviews` - Submit new review (requires approval)

#### Bookings  
- `POST /api/bookings` - Submit booking request
- `GET /api/unavailable-dates` - Get dates that are not available for booking

#### Admin (future)
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id` - Update booking status
- `POST /api/admin/unavailable-dates` - Add unavailable date

### 3. Frontend Integration Changes

#### Remove Mock Data Usage
- Update Home.jsx to fetch services and reviews from API
- Update Booking.jsx to fetch services and unavailable dates from API
- Remove imports of mockData.js from all components

#### Add API Service Layer
- Create `src/services/api.js` with axios instance and API calls
- Handle loading states and errors in components
- Add proper error messages and loading spinners

#### Form Submission
- Update Booking.jsx to submit real booking data to API
- Show success/error messages using toast notifications
- Reset form after successful submission

### 4. Error Handling
- Validate booking form data on both frontend and backend
- Handle date conflicts (if date becomes unavailable between load and submit)
- Proper error responses with meaningful messages
- Loading states for all API calls

### 5. Data Seeding
- Seed database with mock services data
- Seed database with mock reviews data  
- Seed database with mock unavailable dates
- Ensure consistent data structure with current mock data

## Implementation Priority
1. Create database models and seed with mock data
2. Implement GET endpoints for services, reviews, unavailable dates
3. Implement POST endpoint for bookings  
4. Update frontend to use real API calls
5. Add proper error handling and loading states