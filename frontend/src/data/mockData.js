// Mock data for the dog kennel application

export const mockServices = [
  {
    id: 1,
    name: "Cage-Free Sleepovers",
    price: "$45",
    period: "per night",
    description: "Your dog enjoys a social environment without cages in our private rooms",
    features: [
      "Private room accommodations",
      "Cage-free social environment",
      "Second dog: $25/night",
      "Third dog: $10/night",
      "Up-to-date vaccinations required"
    ],
    popular: true
  },
  {
    id: 2,
    name: "Dog Daycare - Full Time",
    price: "$25",
    period: "per day (4+ hours)",
    description: "Supervised playtime and socialization for 4 hours or more",
    features: [
      "Full day of supervised play",
      "Social interaction with other dogs",
      "Professional supervision",
      "Multi-day packages available",
      "Second dog: $21/day"
    ]
  },
  {
    id: 3,
    name: "Dog Daycare - Part Time", 
    price: "$17",
    period: "per day (up to 4 hours)",
    description: "Perfect for shorter visits with supervised play and care",
    features: [
      "Up to 4 hours of care",
      "Supervised playtime",
      "Social interaction",
      "Flexible scheduling",
      "With grooming: $17/day"
    ]
  },
  {
    id: 4,
    name: "Fur Salon Grooming",
    price: "Call for pricing",
    period: "per session",
    description: "Professional grooming tailored to your dog's specific needs",
    features: [
      "Professional baths",
      "Haircuts and styling",
      "Nail trimming",
      "Ear cleaning",
      "Customized grooming plans"
    ]
  }
];

export const mockReviews = [
  {
    id: 1,
    name: "Lisa M.",
    rating: 5,
    date: "2 weeks ago",
    review: "The cage-free sleepovers are amazing! My dog Buddy loves staying here. The staff is so caring and professional. I never worry when he's at Fur the Love of Dogs - he comes home happy and well-cared for.",
    dogName: "Buddy",
    service: "Cage-Free Sleepovers"
  },
  {
    id: 2,
    name: "Tom & Karen W.",
    rating: 5,
    date: "1 month ago", 
    review: "We've been using their daycare services for months now and couldn't be happier. Sadie gets great exercise and socialization. The staff knows every dog by name and treats them like their own.",
    dogName: "Sadie",
    service: "Dog Daycare"
  },
  {
    id: 3,
    name: "Michelle P.",
    rating: 5,
    date: "3 weeks ago",
    review: "The grooming services are top-notch! Max always looks fantastic after his appointments. The groomers are gentle and skilled, and they really care about making each dog comfortable.",
    dogName: "Max",
    service: "Fur Salon Grooming"
  },
  {
    id: 4,
    name: "John D.",
    rating: 5,
    date: "1 week ago",
    review: "Great experience with the cage-free environment. My two dogs, Jake and Luna, love playing with the other dogs. The meet and greet process was thorough and professional.",
    dogName: "Jake & Luna", 
    service: "Cage-Free Sleepovers"
  },
  {
    id: 5,
    name: "Patricia R.",
    rating: 5,
    date: "2 months ago",
    review: "Fantastic daycare service! My senior dog Chester gets gentle, individualized attention. They understand that older dogs have different needs. Highly recommend this place!",
    dogName: "Chester",
    service: "Dog Daycare"
  }
];

export const mockBookedDates = [
  "2024-12-15",
  "2024-12-16", 
  "2024-12-22",
  "2024-12-23",
  "2024-12-24",
  "2024-12-25",
  "2024-12-29",
  "2024-12-30",
  "2024-12-31",
  "2025-01-01",
  "2025-01-05",
  "2025-01-06"
];

export const mockFamilyStory = {
  title: "Serving Watertown's Four-Legged Family Members",
  founded: "established",
  story: `Located in the heart of Watertown, Wisconsin, Fur the Love of Dogs has become a trusted name in premium pet care services. Our facility at 106 S 3rd Street serves as a second home for dogs throughout the Watertown community and surrounding areas.

What sets us apart is our commitment to providing both cage-free sleepovers and professional grooming services in a warm, welcoming environment. We understand that every dog is unique, which is why we offer both social cage-free environments for outgoing pups and private room accommodations for dogs who prefer a quieter setting.

Our experienced team takes pride in treating each dog as an individual, ensuring they receive the specific care and attention they need. From energetic puppies who love to socialize during daycare to senior dogs who appreciate a gentler approach, we tailor our services to meet every dog's personality and needs.

Safety and health are our top priorities. We require all dogs to be current on their vaccinations including Rabies, Distemper, and Bordetella, and maintain strict standards for cleanliness and care. This commitment to excellence has made us a trusted choice for Watertown families who want the best for their furry companions.

Whether you need daily daycare, overnight boarding, or professional grooming services, we're here to provide exceptional care with the love and attention your dog deserves.`,
  
  familyMembers: [
    {
      name: "Our Dedicated Team",
      role: "Professional Pet Care Specialists",
      bio: "Our experienced staff members are passionate about providing exceptional care for every dog that enters our facility.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Grooming Specialists",
      role: "Fur Salon Professionals", 
      bio: "Our skilled groomers provide personalized grooming services tailored to each dog's specific needs and breed requirements.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Daycare Supervisors",
      role: "Play & Socialization Experts",
      bio: "Our trained supervisors ensure safe, fun, and engaging daycare experiences for dogs of all sizes and temperaments.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    }
  ],

  values: [
    "Every dog receives individualized care and attention",
    "Safety and health are our highest priorities", 
    "Professional service with a personal touch",
    "Building trust with pets and their families",
    "Creating a comfortable, stress-free environment"
  ]
};