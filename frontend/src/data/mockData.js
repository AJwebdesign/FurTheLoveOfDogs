// Mock data for the dog kennel application

export const mockServices = [
  {
    id: 1,
    name: "Overnight Boarding",
    price: "$100",
    period: "per night",
    description: "Premium overnight care in our comfortable, climate-controlled facility",
    features: [
      "24/7 supervision",
      "Individual kennels with outdoor runs",
      "Daily exercise and playtime",
      "Feeding per your instructions",
      "Bedtime treats and stories"
    ],
    popular: true
  },
  {
    id: 2,
    name: "Daycare Services",
    price: "$45",
    period: "per day",
    description: "Fun-filled days of socialization and activities",
    features: [
      "Group play sessions",
      "Individual attention",
      "Outdoor adventures", 
      "Rest periods",
      "Pick-up/drop-off flexibility"
    ]
  },
  {
    id: 3,
    name: "Grooming Services",
    price: "$75",
    period: "per session",
    description: "Professional grooming to keep your pup looking their best",
    features: [
      "Full wash and dry",
      "Nail trimming",
      "Ear cleaning",
      "Brushing and styling",
      "Flea and tick treatment"
    ]
  },
  {
    id: 4,
    name: "Training Programs",
    price: "$120",
    period: "per package",
    description: "Expert training sessions for well-behaved, happy dogs",
    features: [
      "Basic obedience training",
      "Behavioral correction",
      "Socialization skills",
      "Take-home practice guides",
      "Progress tracking"
    ]
  }
];

export const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    review: "Absolutely wonderful! My golden retriever Max had the best time here. The staff truly cares about each dog and sends updates throughout the day. I never worry when Max is at Fur the Love of Dogs!",
    dogName: "Max",
    service: "Overnight Boarding"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago", 
    review: "The family atmosphere here is incredible. You can tell this is more than just a business - they genuinely love what they do. Bella always comes home happy and tired from all the fun activities.",
    dogName: "Bella",
    service: "Daycare Services"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    date: "3 weeks ago",
    review: "Outstanding grooming services! Rocky looked absolutely handsome after his session. The attention to detail and gentle care they provide is unmatched. Highly recommend!",
    dogName: "Rocky",
    service: "Grooming Services"
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    date: "1 week ago",
    review: "The training program worked wonders for our rescue pup Luna. The patient, loving approach helped her gain confidence and learn basic commands. Thank you for helping our family!",
    dogName: "Luna", 
    service: "Training Programs"
  },
  {
    id: 5,
    name: "Jennifer Martinez",
    rating: 5,
    date: "2 months ago",
    review: "I've been bringing Charlie here for over a year now. The consistency of care and the genuine love they show each dog is remarkable. It's like leaving your pup with family!",
    dogName: "Charlie",
    service: "Overnight Boarding"
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
  title: "Three Generations of Dog Love",
  founded: "2009",
  story: `What started as a simple love for dogs has grown into a three-generation family business that has been serving the Happy Valley community for over 15 years.

It all began when our founder, Margaret Thompson, started watching neighborhood dogs in her backyard while their families were away. Word spread quickly about her natural way with animals and genuine care for each pup that stayed with her.

Today, the business is run by Margaret alongside her daughter Susan and granddaughter Emily. Each brings their own special touch to the care we provide - Margaret's wisdom and experience, Susan's business expertise, and Emily's fresh energy and modern training techniques.

We've cared for over 1,000 dogs throughout the years, from tiny puppies taking their first steps away from home to senior dogs who need a little extra TLC. Every dog that comes through our doors becomes part of our extended family.

Our facility has grown from Margaret's backyard to a beautiful 5-acre property complete with indoor climate-controlled kennels, outdoor play areas, grooming stations, and training facilities. But what hasn't changed is our commitment to treating every dog as if they were our own.`,
  
  familyMembers: [
    {
      name: "Margaret Thompson",
      role: "Founder & Head of Operations",
      bio: "With over 15 years of experience, Margaret's intuitive understanding of dog behavior and needs forms the foundation of our care approach.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Susan Thompson-Williams",
      role: "Business Manager & Grooming Specialist", 
      bio: "Susan combines her business acumen with professional grooming expertise, ensuring both excellent service and beautiful pups.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Emily Williams",
      role: "Training Coordinator & Activities Director",
      bio: "Our youngest team member brings modern training techniques and boundless energy to keep all our furry guests happy and engaged.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    }
  ],

  values: [
    "Every dog deserves individual attention and care",
    "Family-owned means family-focused service", 
    "Continuous learning and improvement in animal care",
    "Building lasting relationships with pets and families",
    "Creating a safe, fun environment for all dogs"
  ]
};