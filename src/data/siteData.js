export const CALLING_NUMBER = "+919048606444"; // Primary Calling Helpline 1 (India Desk)
export const CALLING_NUMBER_DISPLAY = "+91 90486 06444";
export const CALLING_NUMBER_ALT = "+919048608444"; // Secondary Calling Helpline 2 (India Desk)
export const CALLING_NUMBER_ALT_DISPLAY = "+91 90486 08444";
export const WHATSAPP_NUMBER = "96560387543"; // Official Flyzo Travels WhatsApp (+965 6038 7543)
export const WHATSAPP_NUMBER_DISPLAY = "+965 6038 7543";
export const OFFICIAL_EMAIL = "flyzosolutions@gmail.com";
export const HEAD_OFFICE_ADDRESS = "Erackson Complex, 3rd Floor, Ram Mohan Road, Behind Francis Alukkas, Calicut, KL 673004";

export const CONTACT_INFO = {
  callingNumber: CALLING_NUMBER,
  callingNumberDisplay: CALLING_NUMBER_DISPLAY,
  callingNumberAlt: CALLING_NUMBER_ALT,
  callingNumberAltDisplay: CALLING_NUMBER_ALT_DISPLAY,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappNumberDisplay: WHATSAPP_NUMBER_DISPLAY,
  officialEmail: OFFICIAL_EMAIL,
  headOfficeAddress: HEAD_OFFICE_ADDRESS,
};

export const HERO_CONTENT = {
  badge: "IATA ACCREDITED • ISO 9001:2015 GLOBAL TRAVEL DESK",
  headlineHighlight: "TICKETS, UMRAH",
  headlineMain: "& GLOBAL VISAS.",
  headlineSub: "One trusted agency for holidays, attestation & overseas careers.",
  description: "Skip the generic booking portals. Whether you need an urgent Flight, Train or Bus ticket, a 5-Star Makkah & Madinah Umrah group, express MEA/Embassy Attestation, or verified GCC Job Recruitment — our specialists handle every stamp.",
  calendarTitle: "Today's Flash Travel & Visa Dispatch",
  calendarQuestion: "Which Flyzo special would you like to unlock today?",
};

export const DAILY_DISPATCH_DEALS = [
  {
    code: 'A',
    title: 'Dubai 5D/4N + Visa + Airfare',
    price: '₹48,999',
    tag: 'Tourist Package',
    reply: 'Locked! Includes Return Flights, 4-Star Hotel, Burj Khalifa, Desert Safari & UAE Visa.',
  },
  {
    code: 'B',
    title: '14 Days Sacred Umrah All-Inclusive',
    price: '₹74,999',
    tag: 'Umrah Special',
    reply: 'MashaAllah! Includes Direct Saudia Flight, Umrah Visa, Makkah/Madinah Hotels, Buffet & Ziyarat.',
  },
  {
    code: 'C',
    title: 'UAE / Saudi Express Visa + Attestation',
    price: '₹6,499',
    tag: '24–48h Express',
    reply: '99.8% Approval! Doorstep certificate pickup for MEA/Embassy Attestation + Express e-Visa.',
  },
];

export const buildWhatsAppUrl = (message, customWaNumber) => {
  const encoded = encodeURIComponent(message);
  const num = (customWaNumber || WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${encoded}`;
};

export const POPULAR_ROUTES = {
  flight: [
    { from: "Mumbai (BOM)", to: "Dubai (DXB)", airline: "Emirates / Indigo", price: "₹14,800", duration: "3h 30m", tag: "Daily Direct" },
    { from: "Delhi (DEL)", to: "Jeddah (JED)", airline: "Saudia / Air India", price: "₹26,500", duration: "5h 45m", tag: "Umrah Special" },
    { from: "Kochi (COK)", to: "Riyadh (RUH)", airline: "Flynas / Oman Air", price: "₹18,200", duration: "4h 50m", tag: "Best Value" },
    { from: "Bengaluru (BLR)", to: "Singapore (SIN)", airline: "Singapore Airlines", price: "₹16,900", duration: "4h 35m", tag: "Hot Deal" },
  ],
  train: [
    { from: "Mumbai Central", to: "New Delhi", train: "12951 Tejas Rajdhani", class: "1A / 2A / 3A", price: "₹2,850", tag: "Tatkal Support" },
    { from: "Chennai Central", to: "Bengaluru", train: "20607 Vande Bharat Exp", class: "EC / CC", price: "₹1,250", tag: "Instant Confirm" },
    { from: "Howrah Jn", to: "Puri", train: "22895 Vande Bharat", class: "EC / CC", price: "₹1,590", tag: "Fastest Route" },
    { from: "New Delhi", to: "Srinagar / Katra", train: "22439 Vande Bharat", class: "EC / CC", price: "₹1,750", tag: "Holiday Special" },
  ],
  bus: [
    { from: "Hyderabad", to: "Bengaluru", operator: "Flyzo Volvo Multi-Axle", type: "AC Sleeper (2+1)", price: "₹1,199", tag: "Night Luxury" },
    { from: "Mumbai", to: "Goa (Panjim)", operator: "Scania Lounge Sleeper", type: "AC Bharat Benz", price: "₹1,350", tag: "Top Rated" },
    { from: "Delhi", to: "Manali", operator: "Mercedes-Benz Glider", type: "Semi-Sleeper Volvo", price: "₹1,499", tag: "Mountain Express" },
    { from: "Chennai", to: "Coimbatore", operator: "Flyzo Royal Sleeper", type: "AC Sleeper", price: "₹999", tag: "Guaranteed Seat" },
  ]
};

export const TOURIST_PACKAGES = [
  {
    id: "dubai-royal",
    title: "Royal Dubai & Abu Dhabi Escape",
    category: "Middle East",
    duration: "5 Days / 4 Nights",
    price: "₹48,999",
    rating: "4.9",
    reviews: 340,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Burj Khalifa 124th Floor", "Luxury Desert Safari & BBQ", "Marina Dhow Cruise", "Sheikh Zayed Grand Mosque", "UAE Visa + Return Flights Included"],
    itinerary: [
      "Day 1: Arrival in Dubai, VIP Airport Transfer & Evening Marina Dhow Cruise with Dinner",
      "Day 2: Half-Day Dubai City Tour, Dubai Mall & Burj Khalifa At The Top",
      "Day 3: Desert Safari with Dune Bashing, Camel Ride & Tanoura Fire Show",
      "Day 4: Full-Day Abu Dhabi Grand Mosque & Ferrari World Photo Stop",
      "Day 5: Miracle Garden / Frame Visit, Duty-Free Shopping & Departure"
    ]
  },
  {
    id: "swiss-alps",
    title: "Majestic Swiss Alps & Paris",
    category: "Europe",
    duration: "7 Days / 6 Nights",
    price: "₹1,45,000",
    rating: "5.0",
    reviews: 185,
    badge: "Luxury Curated",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Mt. Titlis Rotair Gondola", "Eiffel Tower Summit Access", "Seine River Illumination Cruise", "Swiss Travel Pass Included", "Schengen Visa Assistance"],
    itinerary: [
      "Day 1: Arrival in Paris, Private Transfer & Evening Seine Cruise",
      "Day 2: Eiffel Tower Summit, Louvre Museum & Champs-Élysées",
      "Day 3: High-Speed TGV Train to Geneva & Montreux Lakeside Walk",
      "Day 4: Interlaken & Jungfraujoch / Mt. Titlis Eternal Snow Experience",
      "Day 5: Lucerne Chapel Bridge, Lion Monument & Lake Cruise",
      "Day 6: Rhine Falls & Zurich Bahnhofstrasse Luxury Shopping",
      "Day 7: Breakfast & Departure from Zurich International Airport"
    ]
  },
  {
    id: "bali-tropical",
    title: "Exotic Bali Island & Nusa Penida",
    category: "Asia",
    duration: "6 Days / 5 Nights",
    price: "₹54,500",
    rating: "4.8",
    reviews: 412,
    badge: "Honeymoon Favorite",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Private Pool Villa in Ubud", "Nusa Penida Kelingking Beach", "Uluwatu Sunset Kecak Dance", "Bali Swing & Tegalalang Rice Terrace", "Candlelight Beach Dinner"],
    itinerary: [
      "Day 1: Denpasar Arrival, Flower Garland Welcome & Seminyak Check-in",
      "Day 2: Full-Day Nusa Penida Speedboat Tour (Kelingking & Crystal Bay)",
      "Day 3: Uluwatu Cliff Temple, Padang Beach & Sunset Kecak Fire Dance",
      "Day 4: Transfer to Ubud Private Pool Villa, Bali Swing & Kintamani Volcano",
      "Day 5: Tanah Lot Floating Temple & Jimbaran Bay Seafood Dinner",
      "Day 6: Souvenir Shopping & Airport Drop"
    ]
  },
  {
    id: "turkey-ottoman",
    title: "Grand Istanbul & Cappadocia",
    category: "Middle East",
    duration: "6 Days / 5 Nights",
    price: "₹89,900",
    rating: "4.9",
    reviews: 228,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Cappadocia Cave Suite Stay", "Hot Air Balloon Sunrise View", "Bosphorus Yacht Cruise", "Hagia Sophia & Blue Mosque", "Domestic Flights Included"],
    itinerary: [
      "Day 1: Arrival in Istanbul, Check-in at Sultanahmet Boutique Hotel",
      "Day 2: Old City Tour: Hagia Sophia, Blue Mosque, Topkapi Palace & Grand Bazaar",
      "Day 3: Bosphorus Strait Cruise & Flight to Cappadocia",
      "Day 4: Sunrise Hot Air Balloon Ride, Goreme Open Air Museum & Fairy Chimneys",
      "Day 5: Underground City Tour & Evening Flight back to Istanbul",
      "Day 6: Spice Bazaar Visit & International Departure"
    ]
  },
  {
    id: "kashmir-paradise",
    title: "Royal Kashmir Houseboat & Gulmarg",
    category: "Domestic",
    duration: "5 Days / 4 Nights",
    price: "₹24,999",
    rating: "4.9",
    reviews: 520,
    badge: "Family Pick",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Dal Lake Luxury Houseboat", "Gulmarg Gondola Snow Ride", "Pahalgam Betaab Valley", "Private Shikara Ride", "Mughal Gardens Tour"],
    itinerary: [
      "Day 1: Srinagar Arrival, Mughal Gardens & Sunset Dal Lake Shikara Ride",
      "Day 2: Excursion to Gulmarg Meadow of Flowers & Gondola Cable Car",
      "Day 3: Scenic Drive to Pahalgam, Awantipora Ruins & Lidder River",
      "Day 4: Sonamarg Golden Meadow Excursion & Luxury Houseboat Stay",
      "Day 5: Kashmiri Dry Fruit & Pashmina Shopping & Airport Drop"
    ]
  },
  {
    id: "maldives-overwater",
    title: "Maldives Overwater Lagoon Villa",
    category: "Island",
    duration: "4 Days / 3 Nights",
    price: "₹76,000",
    rating: "5.0",
    reviews: 290,
    badge: "All-Inclusive",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    highlights: ["2N Beach + 1N Overwater Villa", "Speedboat / Seaplane Transfers", "All Meals & Complimentary Drinks", "Coral Reef Snorkeling & Dolphin Cruise", "Visa on Arrival Free"],
    itinerary: [
      "Day 1: Male Airport Arrival & Speedboat Transfer to Private Island Resort",
      "Day 2: Coral Reef Snorkeling Safari & Sunset Dolphin Cruise",
      "Day 3: Upgrade to Overwater Villa with Direct Lagoon Deck Access",
      "Day 4: Leisure Breakfast by the Ocean & Return Speedboat to Male"
    ]
  }
];

export const UMRAH_PACKAGES = [
  {
    id: "umrah-economy",
    tier: "Economy",
    title: "14 Days Barakah Economy Umrah",
    price: "₹74,999",
    duration: "14 Days (7N Makkah / 7N Madinah)",
    distanceMakkah: "800m from Haram (24/7 Shuttle)",
    distanceMadinah: "450m from Masjid an-Nabawi",
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    inclusions: [
      "Return Direct Flights (Saudia / Air India)",
      "Umrah Visa with Comprehensive Insurance",
      "3-Star Clean & Verified Hotels",
      "3x Daily Indian / Continental Buffet Meals",
      "Complete Makkah & Madinah Ziyarat in AC Luxury Bus",
      "Experienced Multilingual Muallim (Scholar Guide)",
      "Complimentary 5 Liters Zamzam & Flyzo Umrah Kit"
    ]
  },
  {
    id: "umrah-deluxe",
    tier: "5-Star Royal Haram View",
    title: "10 Days Executive Clock Tower & Oberoi Umrah",
    price: "₹1,38,000",
    duration: "10 Days (5N Makkah / 5N Madinah)",
    distanceMakkah: "0m – Zero Distance (Haram Courtyard)",
    distanceMadinah: "50m from Ladies & Gents Gate",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    inclusions: [
      "Haramain High-Speed Bullet Train (Makkah ↔ Madinah)",
      "5-Star Pullman Zamzam / Swissôtel Makkah Stay",
      "5-Star Anwar Al Madinah Mövenpick / Dar Al Taqwa",
      "Private GMC Yukon / Luxury Coaster Airport Transfers",
      "International Open Buffet Breakfast & Dinner",
      "Private Guided Ziyarat (Badr, Uhud, Quba, Hira)",
      "Priority Visa Processing + VIP Ihram & Travel Kit"
    ]
  },
  {
    id: "umrah-ramadan",
    tier: "Ramadan & Family Custom",
    title: "15 Days Blessed Ramadan / Custom Family Umrah",
    price: "₹1,05,000",
    duration: "15 Days (8N Makkah / 7N Madinah)",
    distanceMakkah: "300m Walkable (Ajyad / Ibrahim Khalil)",
    distanceMadinah: "200m Markazia Central Area",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1000&q=80",
    featured: false,
    inclusions: [
      "Flexible Departure Dates from All Major Cities",
      "4-Star Walking Distance Hotels in Markazia",
      "Suhoor & Iftar / Full Board Dining Included",
      "Dedicated Wheelchair Assistance for Senior Citizens",
      "Taif & Badar Historical Excursion Included",
      "24/7 Flyzo Ground Support Team in Makkah & Madinah",
      "5L Zamzam Water, Prayer Mat & Digital Tasbeeh"
    ]
  }
];

export const VISA_SERVICES = [
  {
    country: "United Arab Emirates",
    flagCode: "ae",
    types: ["30 / 60 Days Tourist Visa", "Freelance & Green Visa", "96-Hour Transit Visa", "Multiple Entry 5-Year"],
    processing: "24 – 48 Hours Express",
    successRate: "99.8%",
    startingPrice: "₹6,499",
    documents: "Passport Front/Back Scan, White Background Photo, Confirmed Ticket"
  },
  {
    country: "Saudi Arabia",
    flagCode: "sa",
    types: ["Umrah e-Visa", "Family Visit Visa (MOFA)", "Business & Commercial Visa", "Work Visa Stamping (Wakala)"],
    processing: "2 – 4 Working Days",
    successRate: "99.5%",
    startingPrice: "₹9,500",
    documents: "Original Passport, Biometrics (VFS/Tasheer), Sponsor Iqama/Invitation"
  },
  {
    country: "Schengen (29 Countries)",
    flagCode: "eu",
    types: ["Tourist & Holiday Visa", "Business Conference Visa", "Family / Friend Visit", "VFS Appointment Priority"],
    processing: "10 – 15 Working Days",
    successRate: "96.4%",
    startingPrice: "₹11,999",
    documents: "6 Months Bank Statement, ITR, Cover Letter, Travel Insurance, Flight & Hotel Voucher"
  },
  {
    country: "United Kingdom & USA",
    flagCode: "gb",
    types: ["UK Standard Visitor (6M/2Y)", "US B1/B2 Tourist & Business", "Student Visa (CAS / I-20)", "Early Biometric Slot Booking"],
    processing: "15 – 21 Working Days",
    successRate: "95.2%",
    startingPrice: "₹14,500",
    documents: "DS-160 / UKVI Application, Financial Proof, Employment NOC, Mock Interview Prep"
  },
  {
    country: "Qatar, Oman & Kuwait",
    flagCode: "qa",
    types: ["Hayya / Tourist e-Visa", "GCC Employment Visa Stamping", "Family Joining Visa", "Medical (GAMCA / Wafid) Booking"],
    processing: "2 – 5 Working Days",
    successRate: "99.2%",
    startingPrice: "₹4,999",
    documents: "Passport Copy, Photograph, Wafid Medical Fit Certificate (for Work Visa)"
  },
  {
    country: "Malaysia, Singapore & Thailand",
    flagCode: "sg",
    types: ["Singapore Authorized e-Visa", "Malaysia MDAC & e-Visa", "Thailand DTV / Tourist Visa", "Vietnam & Indonesia e-Visa"],
    processing: "24 – 72 Hours",
    successRate: "99.6%",
    startingPrice: "₹2,499",
    documents: "Passport Scan, Digital Photo, Return Ticket & Hotel Confirmation"
  }
];

export const ATTESTATION_STEPS = [
  {
    step: "01",
    title: "Notary & Home Department / HRD",
    desc: "Initial verification from state-level HRD (Educational), Home Department (Personal), or Chamber of Commerce (Commercial)."
  },
  {
    step: "02",
    title: "MEA Attestation & Apostille",
    desc: "Official stamp or Hague Convention Apostille sticker from the Ministry of External Affairs (MEA) for global validity."
  },
  {
    step: "03",
    title: "Embassy & Consulate Legalization",
    desc: "Attestation from UAE, Saudi Culture & Embassy, Qatar, Kuwait, Oman, or European Embassies in New Delhi / Mumbai."
  },
  {
    step: "04",
    title: "MOFA (Ministry of Foreign Affairs)",
    desc: "Final destination country MOFA attestation & secure courier delivery right back to your doorstep with live tracking."
  }
];

export const ATTESTATION_CATEGORIES = [
  {
    title: "Educational Certificates",
    turnaround: "5 – 8 Working Days",
    items: [
      "Degree Certificate (B.Tech, MBA, MBBS, B.Sc, B.Com)",
      "Diploma, Nursing & Pharmacy Certificates",
      "HSC / SSC Marksheets & Transcripts",
      "Saudi Cultural Attaché & Mosadaqa Verification"
    ]
  },
  {
    title: "Personal / Non-Educational Documents",
    turnaround: "4 – 7 Working Days",
    items: [
      "Marriage Certificate (For Family Residence Visa)",
      "Birth Certificate (For Child Visa Endorsement)",
      "Police Clearance Certificate (PCC) & Medical Certificates",
      "Power of Attorney, Affidavit & Divorce Decree"
    ]
  },
  {
    title: "Commercial & Corporate Documents",
    turnaround: "3 – 6 Working Days",
    items: [
      "Certificate of Incorporation & Board Resolution",
      "Memorandum & Articles of Association (MOA / AOA)",
      "Commercial Invoices & Certificate of Origin",
      "Export / Import Power of Attorney & Agency Agreements"
    ]
  }
];

export const JOB_LISTINGS = [
  {
    id: "job-1",
    title: "Senior HVAC & MEP Project Engineer",
    company: "Al-Futtaim Engineering Group",
    location: "Dubai, UAE",
    flagCode: "ae",
    category: "Engineering",
    salary: "AED 12,000 – 16,000 / mo (Tax-Free)",
    benefits: ["Free Family Visa", "Annual Return Tickets", "Medical Insurance"],
    experience: "5+ Years GCC/India Experience",
    urgent: true
  },
  {
    id: "job-2",
    title: "5-Star Hospitality Chef de Partie & F&B Supervisors",
    company: "Marriott / Hilton Red Sea Hospitality",
    location: "Riyadh & Jeddah, Saudi Arabia",
    flagCode: "sa",
    category: "Hospitality",
    salary: "SAR 4,500 – 7,000 / mo + Duty Meals",
    benefits: ["Free Accommodation", "Transportation", "2-Year Renewable Contract"],
    experience: "3+ Years Luxury Hotel Experience",
    urgent: true
  },
  {
    id: "job-3",
    title: "Registered Staff Nurses (DHA / MOH / Prometric)",
    company: "Aster & Saudi German Healthcare",
    location: "Dubai, Doha & Dammam",
    flagCode: "qa",
    category: "Healthcare",
    salary: "AED 7,500 – 10,500 / mo",
    benefits: ["DataFlow & Licensing Assistance", "Shared Executive Accommodation", "30 Days Paid Leave"],
    experience: "B.Sc / GNM Nursing + 2 Years Exp",
    urgent: false
  },
  {
    id: "job-4",
    title: "Heavy Duty / Light GCC License Drivers & Logistics Supervisors",
    company: "Aramex & Emirates Transport Partner",
    location: "Abu Dhabi, UAE & Muscat, Oman",
    flagCode: "om",
    category: "Logistics & Technical",
    salary: "AED 3,800 – 5,500 / mo + Overtime",
    benefits: ["Free Visa & Accommodation", "Overtime as per Labour Law", "Immediate Joining"],
    experience: "Valid GCC or Indian Heavy License",
    urgent: true
  },
  {
    id: "job-5",
    title: "Civil QA/QC Inspector & Safety Officer (NEBOSH IGC)",
    company: "NEOM & Red Sea Mega Project Contractors",
    location: "Tabuk / NEOM, Saudi Arabia",
    flagCode: "sa",
    category: "Engineering",
    salary: "SAR 8,500 – 13,000 / mo",
    benefits: ["Food + Camp Accommodation", "Wakala Ready", "Flight Provided"],
    experience: "Aramco / SABIC Approval Preferred",
    urgent: false
  },
  {
    id: "job-6",
    title: "Retail Sales Executives & Gold Showroom Managers",
    company: "Malabar / Joyalukkas / Duty Free Partners",
    location: "Dubai, Sharjah & Kuwait City",
    flagCode: "kw",
    category: "Hospitality",
    salary: "AED 4,500 – 8,000 + High Incentives",
    benefits: ["Employment Visa", "Health Cover", "Yearly Bonus"],
    experience: "Fluent English/Hindi/Arabic + 2 Yrs Retail",
    urgent: false
  }
];

export const SOCIAL_HUB = {
  instagram: {
    handle: "@flyzo_global",
    followers: "Flyzo Global Official",
    bio: "Build a career that speaks globally • Travel | Immigration | Ticketing | Certificate Attestation • Calicut (+91 90486 06444 / +91 90486 08444)",
    url: "https://www.instagram.com/flyzo_global/",
    posts: [
      {
        id: "ig-1",
        image: "/uploads/ig-post-1-malaysia.jpg",
        caption: "Experience Malaysia — Special UAE National Day & International Holiday Package! DM or WhatsApp Flyzo Global to lock your seats.",
        likes: "Verified Post",
        type: "Carousel"
      },
      {
        id: "ig-2",
        image: "/uploads/ig-post-2-attestation.jpg",
        caption: "Certificate Attestation On Time! Complete Document Attestation, End-to-End Assistance, Doorstep Pick-up & Delivery with 24/7 Service.",
        likes: "Verified Post",
        type: "Post"
      },
      {
        id: "ig-3",
        image: "/uploads/ig-post-3-flights.jpg",
        caption: "ലോകത്തെവിടേക്കുമുള്ള വിമാന ടിക്കറ്റുകൾ — Global Flight Tickets to any destination worldwide at the best fares and trusted service!",
        likes: "Verified Post",
        type: "Post"
      },
      {
        id: "ig-4",
        image: "/uploads/ig-post-4-sharjah-jobs.jpg",
        caption: "URGENT HIRING IN SHARJAH, UAE — Packing Workers Required! Basic Salary: 1600 AED + Benefits. Immediate Joining | Men & Women Can Apply.",
        likes: "Urgent Hiring",
        type: "Job Alert"
      }
    ]
  },
  facebook: {
    name: "Flyzo Travels & Global Services Official",
    likes: "82,000+ Community Members",
    rating: "4.9 / 5.0 (1,450+ Verified Reviews)",
    url: "https://facebook.com",
    updates: [
      {
        id: "fb-1",
        date: "2 Hours Ago",
        badge: "Special Fare Alert",
        title: "Group Airfares Locked: Mumbai / Delhi / Kochi to Dubai, Riyadh & Jeddah!",
        excerpt: "Avail up to ₹4,500 off on bulk family & corporate flight tickets. Zero convenience fee when booking via Flyzo WhatsApp Desk.",
        reactions: "418 Reactions • 94 Comments"
      },
      {
        id: "fb-2",
        date: "Yesterday",
        badge: "Client Testimonial",
        title: "“Flyzo handled my Degree MEA + UAE Embassy Attestation & Work Visa in 6 days!” — Mohammed Tariq",
        excerpt: "Thank you for trusting Flyzo Travels! Our doorstep document pickup and live tracking make attestation 100% stress-free.",
        reactions: "612 Reactions • 128 Shares"
      }
    ]
  },
  linkedin: {
    name: "Flyzo Travels & Overseas Recruitment Consultancy",
    tagline: "ISO 9001:2015 Certified Global Mobility, Corporate Travel & GCC Manpower Solutions",
    followers: "29,400+ Followers",
    url: "https://linkedin.com",
    highlights: [
      {
        id: "li-1",
        tag: "Hiring Drive",
        title: "Client Interview in Mumbai & Kochi: 150+ Openings for Leading Saudi & UAE EPC Contractors",
        summary: "Walk-in interviews next week for Civil, MEP, QA/QC Engineers, Safety Officers & Technicians. Immediate Wakala & Visa processing."
      },
      {
        id: "li-2",
        tag: "Corporate B2B",
        title: "Partnering with 60+ Enterprises for End-to-End Corporate Ticketing, Visas & Certificate Legalization",
        summary: "Dedicated account managers, GST-compliant invoicing, and 24/7 emergency flight rescheduling desk for corporate partners."
      }
    ]
  }
};

export const DEFAULT_SITE_CONTENT = {
  contactInfo: CONTACT_INFO,
  hero: HERO_CONTENT,
  dailyDeals: DAILY_DISPATCH_DEALS,
  popularRoutes: POPULAR_ROUTES,
  touristPackages: TOURIST_PACKAGES,
  umrahPackages: UMRAH_PACKAGES,
  visaServices: VISA_SERVICES,
  attestationSteps: ATTESTATION_STEPS,
  attestationCategories: ATTESTATION_CATEGORIES,
  jobListings: JOB_LISTINGS,
  socialHub: SOCIAL_HUB,
};
