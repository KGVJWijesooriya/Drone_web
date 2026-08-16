export const SITE_CONFIG = {
  name: "DRONE AMARE",
  tagline: "Crafted With Love. Delivered From The Sky.",
  description:
    "Specialized aerial service provider offering cinema-grade drone coverage, LED flying screens, wedding spectacles, flower dropping, and RC butterfly shows.",
  contact: {
    email: "inquiries@droneamare.com",
    phone: "+1 (800) 480-AMARE",
    location: "Studio 04, Skyline District, CA",
    hours: "Mon – Sat: 08:00 – 20:00 PST",
  },
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const HERO_DATA = {
  badge: "AERIAL ARTISTRY FOR LIFE'S FINEST MOMENTS",
  titleLine1: "LOVE TAKES FLIGHT",
  titleLine2: "WITH",
  titleLine3: "DRONE AMARE",
  description:
    "We create breathtaking aerial experiences for luxury weddings, celebrations, and grand occasions, capturing every moment, every detail, and every emotion from a whole new perspective.",
  primaryCta: {
    label: "Explore Our Services",
    href: "#services",
  },
  secondaryCta: {
    label: "Book Your Moment",
    href: "#contact",
  },
  metrics: [
    { value: "500+", label: "CELEBRATIONS ELEVATED" },
    { value: "220+", label: "LOVE STORIES FILMED" },
    { value: "7", label: "AERIAL EXPERIENCES" },
    { value: "100%", label: "SAFETY RECORD" },
  ],
};

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: string;
  imageUrl?: string;
  videoUrl?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "drone-coverage",
    number: "01",
    title: "Professional Drone Coverage",
    tagline: "Every Frame, a Masterpiece From Above",
    description:
      "High-definition 8K aerial filming and high-res photography for cinematic broadcasts, architectural showcases, music festivals, and sports events.",
    highlights: ["8K RAW Cinematography", "Certified Master Pilots", "FPV High-Speed Dynamic Chase", "Live Stream Broadcast Feed"],
    icon: "drone",
    imageUrl: "/Foldable_drone_in_flight_202608161200.jpeg",
  },
  {
    id: "led-screen",
    number: "02",
    title: "LED Flying Screen",
    tagline: "Your Message, Glowing in the Night Sky",
    description:
      "Ultra-lightweight high-luminance flying LED matrix screens displaying logos, countdowns, wedding initials, and synchronized brand graphics in mid-air.",
    highlights: ["High-Nits Daylight & Night Visibility", "Custom Dynamic Motion Graphics", "Autonomous Geo-Lock Hover", "Multi-Pattern Flight Synchronization"],
    icon: "screen",
    imageUrl: "/Drone_hovering_with_LED_banner_202608161230.jpeg",
  },
  {
    id: "weddings",
    number: "03",
    title: "Weddings & Grand Entrances",
    tagline: "Where Love Meets the Sky",
    description:
      "Capturing breathtaking bridal entries, outdoor receptions, and grand vows from sweeping aerial angles with whisper-quiet, unobtrusive drone fleets.",
    highlights: ["Whisper-Quiet Propeller Technology", "Golden Hour Cinematic Shots", "Same-Day Teaser Edits", "Ring & Vow Overhead Perspectives"],
    icon: "rings",
    imageUrl: "/Bride_walking_down_wedding_aisle_202608161237.jpeg",
  },
  {
    id: "events",
    number: "04",
    title: "Events & Concert Productions",
    tagline: "Capturing the Energy of Your Biggest Night",
    description:
      "Dynamic coverage for music festivals, product launches, corporate conventions, and athletic championships with synchronized multi-pilot arrays.",
    highlights: ["Crowd-Safe Redundant Systems", "Real-Time Director Video Feeds", "Multi-Angle Aerial Coverage", "Comprehensive 360° Stage Sweeps"],
    icon: "stage",
    imageUrl: "/Crowd_gathered_at_outdoor_concert_202608161240.jpeg",
  },
  {
    id: "commercial-ads",
    number: "05",
    title: "Commercial Ads & Films",
    tagline: "Cinematic Precision for Iconic Brands",
    description:
      "Tailored aerial cinematography for automotive commercials, real estate campaigns, fashion shoots, and feature film productions.",
    highlights: ["Arri / RED Aerial Rigging", "Precision Repeatable Path Motion", "VFX Camera Tracking Data", "Studio & Agency Collaboration"],
    icon: "film",
    imageUrl: "/Luxury_car_driving_along_road_202608161243.jpeg",
  },
  {
    id: "flower-dropping",
    number: "06",
    title: "Flower & Petal Dropping",
    tagline: "A Rain of Petals, A Moment Forever",
    description:
      "Precision-timed fresh rose petal and floral showers released from the sky over wedding couples, celebration rituals, and grand galas.",
    highlights: ["Eco-Friendly Organic Petals", "Precision Wind-Calculated Release", "Even Distributed Cascade Flow", "Synchronized Entrance Timing"],
    icon: "flower",
    imageUrl: "/Drone_releasing_rose_petals_202608161248.jpeg",
  },
  {
    id: "rc-butterflies",
    number: "07",
    title: "RC Butterflies Fleet",
    tagline: "Flutter, Glow & Enchant Your Guests",
    description:
      "Delicate, glowing remote-controlled robotic butterflies fluttering gently over audiences and ceremony stages for a dreamlike fairy-tale experience.",
    highlights: ["Illuminated LED Wings", "Gentle Crowd-Friendly Flutter", "Indoor & Outdoor Safe", "Choreographed Flight Paths"],
    icon: "butterfly",
    imageUrl: "/Robotic_butterflies_fluttering_i…_202608161252.jpeg",
  },
];

export const PORTFOLIO_SHOWCASE = [
  {
    category: "WEDDING SPECTACLE",
    title: "The Garden of Vows & Sunset Petal Cascade",
    location: "Napa Valley, California",
    services: ["Drone Coverage", "Flower Dropping"],
    year: "2026",
    highlight: "15kg Fresh Rose Petals Released over 300 Guests",
  },
  {
    category: "COMMERCIAL CAMPAIGN",
    title: "Hyperion EV Global Launch",
    location: "Mojave Desert, NV",
    services: ["Commercial Ads", "FPV Chase"],
    year: "2026",
    highlight: "130 km/h High-Speed FPV Chase Footage in 8K RAW",
  },
  {
    category: "EVENT SPECTACLE",
    title: "Solstice Night Music Festival",
    location: "Miami Beach, Florida",
    services: ["LED Flying Screen", "Event Coverage"],
    year: "2025",
    highlight: "Dual Flying LED Matrix Broadcasting Headliner Visuals",
  },
  {
    category: "LUXURY CELEBRATION",
    title: "Ivory Palace Gala — Butterfly Twilight",
    location: "Beverly Hills, CA",
    services: ["RC Butterflies", "Drone Coverage"],
    year: "2025",
    highlight: "Fleet of 40 Luminous RC Butterflies Swarming at Twilight",
  },
];

export const WHY_US_PILLARS = [
  {
    number: "01",
    title: "Expert-Certified Master Pilots",
    description:
      "Every mission is commanded by licensed commercial pilots with thousands of verified flight hours, adhering to rigorous airspace protocols.",
  },
  {
    number: "02",
    title: "Industry-Leading Aerial Fleet",
    description:
      "We operate specialized carbon-chassis drones equipped with 8K cinema gimbals, calibrated payload droppers, and custom flying LED screens.",
  },
  {
    number: "03",
    title: "Your Vision, Our Aerial Canvas",
    description:
      "We do not just fly; we collaborate with wedding planners, directors, and event coordinators to craft unforgettable visual narratives.",
  },
  {
    number: "04",
    title: "Zero-Compromise Safety Standards",
    description:
      "Dual-battery failsafes, optical obstacle avoidance, parachute emergency modules, and full comprehensive event liability insurance.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Dream & Inquire",
    description: "Choose your desired services and submit your event date, location, and creative vision through our booking portal.",
  },
  {
    step: "02",
    title: "Plan Your Sky Moment",
    description: "Our flight coordinator reviews airspace authorizations, conducts site mapping, and designs the custom flight schedule.",
  },
  {
    step: "03",
    title: "We Take Flight",
    description: "On event day, our pilot crew arrives early, sets up safety perimeters, and executes every aerial sequence to the second.",
  },
  {
    step: "04",
    title: "Relive Every Moment",
    description: "Receive color-graded 8K highlight reels, full uncompressed footage, or live show recordings within our expedited timeline.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The flower drop at our sunset wedding reception was the most magical moment of our lives. The guests were stunned, and the drone footage looks like a high-budget romance movie.",
    author: "Elena & Marcus Vance",
    role: "Private Wedding Clients",
    event: "Montecito Estate Wedding",
    rating: 5,
  },
  {
    quote:
      "We hired Drone Amare for our 3-day electronic music festival. Their flying LED screens displaying our headliner's logo hovering 100 feet above the crowd stole the entire night.",
    author: "Julian Reynolds",
    role: "Production Director",
    event: "Horizon Wave Festival",
    rating: 5,
  },
  {
    quote:
      "Their FPV and cinema drone crew delivered automotive shots that our agency thought were only possible with heavy helicopters. Impeccable precision and zero hassle.",
    author: "Sophia Chen",
    role: "Executive Producer",
    event: "Apex Motors Global Commercial",
    rating: 5,
  },
];

