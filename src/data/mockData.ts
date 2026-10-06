import { SpaService, Therapist, OrganicOil, SpaAddOn, User, Booking } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_home_spa_sanctuary_1791265957174.jpg';
export const MASSAGE_IMAGE = '/src/assets/images/spa_massage_balinese_1791265969510.jpg';
export const FACIAL_IMAGE = '/src/assets/images/spa_botanical_facial_1791265984201.jpg';
export const OILS_IMAGE = '/src/assets/images/spa_aromatherapy_oils_1791265999693.jpg';
export const COUPLES_IMAGE = '/src/assets/images/spa_couples_sanctuary_1791266011451.jpg';

export const ORGANIC_OILS: OrganicOil[] = [
  {
    id: 'oil-lavender-sandalwood',
    name: 'Serene Sanctuary',
    botanicalNotes: 'French Fine Lavender & East Indian Sandalwood',
    benefits: 'Deep nervous system reset, insomnia relief & tension release',
    aromaProfile: 'Earthy, velvety floral with warm smoky undertones',
    colorHex: '#8E7D9A'
  },
  {
    id: 'oil-eucalyptus-mint',
    name: 'Alpine Clarity',
    botanicalNotes: 'Wild Tasmanian Eucalyptus & Crisp Peppermint Leaf',
    benefits: 'Muscle oxygenation, airway relief & lymphatic renewal',
    aromaProfile: 'Invigorating, crisp herbal coolness with camphor notes',
    colorHex: '#52796F'
  },
  {
    id: 'oil-rose-jojoba',
    name: 'Botanical Velvet',
    botanicalNotes: 'Bulgarian Rose Otto, Neroli & Cold-Pressed Golden Jojoba',
    benefits: 'Skin barrier replenishment, cellular rejuvenation & gentle warmth',
    aromaProfile: 'Lush blooming nectar, delicate honey and citrus blossoms',
    colorHex: '#C58882'
  },
  {
    id: 'oil-unscented-seed',
    name: 'Pure Hypoallergenic',
    botanicalNotes: 'Organic Safflower, Evening Primrose & Vitamin E',
    benefits: 'Zero fragrance allergen formulation, ultra-nourishing sensitive skin',
    aromaProfile: 'Clean, neutral and odorless pure botanicals',
    colorHex: '#B7B7A4'
  }
];

export const SPA_ADDONS: SpaAddOn[] = [
  {
    id: 'addon-hot-stones',
    name: 'Heated Himalayan Basalt Stones',
    price: 599,
    durationMinutes: 15,
    description: 'Smooth volcanic stones warmed to 52°C to melt chronic muscular rigidity.'
  },
  {
    id: 'addon-collagen-eye',
    name: 'Crystal Collagen Eye Contour Mask',
    price: 399,
    durationMinutes: 10,
    description: 'Chilled marine peptide patches that reduce puffiness and hydrate delicate eye skin.'
  },
  {
    id: 'addon-foot-scrub',
    name: 'Dead Sea Salt & Peppermint Foot Polish',
    price: 499,
    durationMinutes: 15,
    description: 'Exfoliating foot polish with warm towel compress and acupressure revival.'
  },
  {
    id: 'addon-diffuser-setup',
    name: 'Ambiance Diffuser & Soundscape Set',
    price: 249,
    durationMinutes: 0,
    description: 'Therapist brings ultrasonic nebulizer with ceremonial oils and portable acoustic speaker.'
  }
];

export const SPA_SERVICES: SpaService[] = [
  {
    id: 'serv-deep-balinese',
    title: 'Deep Tissue Balinese Ritual',
    subtitle: 'Signature acupressure, thumb-walking & hot towel compress',
    category: 'massage',
    description: 'An intensive, restorative treatment combining firm palm pressure, deep structural stretches, and warm organic oils. Specifically engineered to alleviate chronic postural tension, back stiffness, and athletic fatigue in your home sanctuary.',
    basePrice: 2499,
    durations: [
      { minutes: 60, price: 2499, recommendedFor: 'Focused back, neck & shoulder relief' },
      { minutes: 90, price: 3499, recommendedFor: 'Full-body restorative protocol (Most Popular)' },
      { minutes: 120, price: 4499, recommendedFor: 'Comprehensive master ritual with deep joint release' }
    ],
    rating: 4.96,
    reviewCount: 382,
    image: MASSAGE_IMAGE,
    benefits: [
      'Decompresses lumbar spine & tight shoulder blade fascia',
      'Stimulates deep venous circulation and lymphatic clearing',
      'Warm essential compress aids restorative rem sleep'
    ],
    equipmentBrought: [
      'Heated ergonomic massage bed with memory foam head cradle',
      'Clean organic Egyptian cotton sheets & plush fleece blankets',
      'Hot stone stone warmer & organic botanical oils'
    ],
    intensity: 'Deep Therapeutic'
  },
  {
    id: 'serv-swedish-aromatherapy',
    title: 'Swedish Botanical Aromatherapy',
    subtitle: 'Long rhythmic gliding strokes, pure florals & lymphatic drain',
    category: 'massage',
    description: 'A deeply soothing, stress-dissolving classic massage designed to melt mental fatigue. Uses gentle-to-medium rhythmic effleurage and friction techniques paired with custom warm organic botanical infusions.',
    basePrice: 2199,
    durations: [
      { minutes: 60, price: 2199, recommendedFor: 'Quick stress reset & sensory pause' },
      { minutes: 90, price: 2999, recommendedFor: 'Balanced total body relaxation' },
      { minutes: 120, price: 3899, recommendedFor: 'Deep transcendent sensory relaxation' }
    ],
    rating: 4.94,
    reviewCount: 419,
    image: OILS_IMAGE,
    benefits: [
      'Lowers cortisol and elevates serotonin naturally',
      'Increases muscle elasticity without aggressive soreness',
      'Nourishes dry skin with vitamin-rich cold-pressed lipids'
    ],
    equipmentBrought: [
      'Portable padded massage suite with electric heat pad',
      'Single-use sterile biodegradable headrest covers',
      'Therapeutic ultrasonic aromatic nebulizer'
    ],
    intensity: 'Gentle Relaxation'
  },
  {
    id: 'serv-botanical-facial',
    title: 'Organic Botanical Glow Facial',
    subtitle: 'Double cleanse, enzyme exfoliation, jade sculpting & peptides',
    category: 'facial',
    description: 'Transform your home into a private aesthetic clinic. Features double botanical cleansing, gentle papaya enzyme resurfacing, chilled jade roller sculpting, and intensive hyaluronic moisture infusion for an unmistakable dewy radiance.',
    basePrice: 2599,
    durations: [
      { minutes: 60, price: 2599, recommendedFor: 'Essential radiance & hydration booster' },
      { minutes: 90, price: 3599, recommendedFor: 'Full facial + neck & decollete lift with gua sha' }
    ],
    rating: 4.98,
    reviewCount: 268,
    image: FACIAL_IMAGE,
    benefits: [
      'Unclogs pores and sweeps dull micro-keratin cells',
      'Sculpts jawline and drains morning facial fluid retention',
      'Plumps fine lines with bio-active botanical antioxidants'
    ],
    equipmentBrought: [
      'Reclining aesthetic bed with neck contour pillow',
      'Sterile steamer & cold ozone mist applicator',
      'Medical-grade organic skincare formulation case'
    ],
    intensity: 'Gentle Relaxation'
  },
  {
    id: 'serv-couples-sanctuary',
    title: "Couple's Synchronized Sanctuary",
    subtitle: 'Two therapists, two luxury beds & shared peaceful pause',
    category: 'couples',
    description: 'Enjoy side-by-side restorative massage rituals in the intimacy of your living room or bedroom. Two master therapists arrive together with matching luxury setups, synchronized soundscapes, and calming organic teas.',
    basePrice: 4799,
    durations: [
      { minutes: 60, price: 4799, recommendedFor: 'Intimate renewal ritual' },
      { minutes: 90, price: 6499, recommendedFor: 'Signature shared experience with warm stones' },
      { minutes: 120, price: 7999, recommendedFor: 'The ultimate immersive private home retreat' }
    ],
    rating: 4.99,
    reviewCount: 194,
    image: COUPLES_IMAGE,
    benefits: [
      'Side-by-side treatments tailored individually for each partner',
      'Coordinated arrival, zero travel stress or parking hassles',
      'Includes celebratory herbal infusion tea ceremony'
    ],
    equipmentBrought: [
      'Two matching ergonomic heated massage beds',
      'Dual linen sets, warm towels & ambient candle elements',
      'Two licensed senior therapists working in synchronized flow'
    ],
    intensity: 'Targeted Firm'
  },
  {
    id: 'serv-warm-stone-recovery',
    title: 'Himalayan Warm Stone Therapy',
    subtitle: 'Heated mineral basalt stones, deep gliding & energy alignment',
    category: 'body-ritual',
    description: 'Heated ancient basalt river stones are smoothly guided along energy meridians and tight muscle groups. The continuous penetrating heat expands micro-capillaries, melting even the most stubborn tension without discomfort.',
    basePrice: 2799,
    durations: [
      { minutes: 75, price: 2999, recommendedFor: 'Core back, neck & hamstring thermal release' },
      { minutes: 90, price: 3699, recommendedFor: 'Full body volcanic stone immersion' },
      { minutes: 120, price: 4699, recommendedFor: 'Thermal stones combined with acupressure' }
    ],
    rating: 4.95,
    reviewCount: 177,
    image: HERO_IMAGE,
    benefits: [
      'Deep thermal penetration softens stubborn muscular knots',
      'Relieves tension headaches and chronic stress stiffness',
      'Promotes grounded calm through mineral heat therapy'
    ],
    equipmentBrought: [
      'Electric stone heating basin with temperature gauge',
      'Set of 24 polished black basalt and Himalayan pink stones',
      'Organic organic sesame and argan carrier oil blend'
    ],
    intensity: 'Targeted Firm'
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'th-elena',
    name: 'Elena Rostova',
    title: 'Master Bodywork Specialist & LMT',
    experienceYears: 11,
    rating: 4.98,
    reviewCount: 312,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    specialties: ['Deep Tissue', 'Balinese Acupressure', 'Hot Basalt Stones'],
    certifications: ['State Board LMT #48192', 'Wat Po Traditional Thai Academy', 'Prenatal Certified'],
    bio: 'Elena trained across Bali and Zurich. She specializes in targeted tension unraveling with gentle yet deeply effective biomechanical pressure.',
    nextAvailable: 'Today at 2:30 PM',
    verifiedLicense: 'LMT-NY-99214'
  },
  {
    id: 'th-marcus',
    name: 'Marcus Vance',
    title: 'Senior Sports Therapist & Neuromuscular LMT',
    experienceYears: 9,
    rating: 4.97,
    reviewCount: 248,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    specialties: ['Sports Recovery', 'Myofascial Release', 'Posture Alignment'],
    certifications: ['NASM Certified Specialist', 'State Board LMT #38120', 'Trigger Point Therapy'],
    bio: 'Marcus has worked with performance athletes and executives. He excels at diagnosing shoulder mobility issues and releasing lower-back compression.',
    nextAvailable: 'Today at 4:00 PM',
    verifiedLicense: 'LMT-NY-84729'
  },
  {
    id: 'th-sophia',
    name: 'Sophia Chen',
    title: 'Holistic Aesthetician & Aromatherapist',
    experienceYears: 8,
    rating: 4.99,
    reviewCount: 285,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    specialties: ['Botanical Facials', 'Lymphatic Drainage', 'Aromatherapy Swedish'],
    certifications: ['CIDESCO International Diploma', 'Certified Clinical Aromatherapist', 'State Aesthetician #5102'],
    bio: 'Sophia crafts personalized facial protocols using pure botanical elixirs, manual sculpting, and calming cranial pressures.',
    nextAvailable: 'Tomorrow at 10:00 AM',
    verifiedLicense: 'AES-NY-19044'
  },
  {
    id: 'th-julian',
    name: 'Julian Thorne',
    title: 'Master Relaxation & Soundscape Bodyworker',
    experienceYears: 12,
    rating: 4.96,
    reviewCount: 198,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    specialties: ['Swedish Harmony', 'Synchronized Couples', 'Himalayan Stones'],
    certifications: ['Esoteric Healing Institute', 'State Board LMT #77192', 'Sound Therapy Practitioner'],
    bio: 'Julian creates an immersive sensory retreat in any room. Known for smooth unbroken strokes and grounding presence.',
    nextAvailable: 'Today at 6:30 PM',
    verifiedLicense: 'LMT-NY-65103'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-velmora-01',
  name: 'Camilla Montgomery',
  email: 'velmoraspa159@gmail.com',
  phone: '+91 99127 06021',
  membershipTier: 'Gold Wellness',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'DLF Golf Course Road Penthouse (India)',
      street: 'Tower 4, The Magnolias, Golf Course Rd',
      suite: 'Penthouse Suite 14A',
      city: 'Gurgaon, Delhi NCR',
      state: 'Haryana',
      zip: '122002',
      gateCode: '#8821',
      parkingNotes: 'Service elevator on Tower 4. Concierge will announce.',
      roomSetup: 'living_room'
    },
    {
      id: 'addr-2',
      label: 'Villa Las Brisas, Marbella (Spain)',
      street: 'Calle Los Olivos 24, Nueva Andalucía',
      city: 'Marbella, Costa del Sol',
      state: 'Málaga / Spain',
      zip: '29660',
      parkingNotes: 'Gated villa driveway. Entrance through poolside terrace.',
      roomSetup: 'terrace_patio'
    },
    {
      id: 'addr-3',
      label: 'Eixample Apartment (Barcelona, Spain)',
      street: 'Passeig de Gràcia 88',
      suite: 'Principal 2ª',
      city: 'Barcelona',
      state: 'Catalonia / Spain',
      zip: '08008',
      gateCode: '4920B',
      roomSetup: 'master_bedroom'
    }
  ],
  preferences: {
    preferredPressure: 'firm',
    organicOilPreference: 'oil-lavender-sandalwood',
    ambientSound: 'tibetan_singing_bowls',
    lightingPreference: 'candlelight_dim',
    medicalNotes: 'Tension in upper trapezii from desk work. No nut oils.'
  },
  favoriteServiceIds: ['serv-deep-balinese', 'serv-botanical-facial'],
  favoriteTherapistIds: ['th-elena', 'th-sophia'],
  createdAt: '2025-08-14'
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-9041',
    bookingNumber: 'VEL-9041',
    userId: 'usr-velmora-01',
    customerName: 'Camilla Montgomery',
    customerEmail: 'velmoraspa159@gmail.com',
    customerPhone: '+91 99127 06021',
    service: SPA_SERVICES[0], // Deep Tissue Balinese
    selectedDuration: 90,
    selectedPressure: 'Firm',
    selectedOil: ORGANIC_OILS[0],
    selectedAddOns: [SPA_ADDONS[0]], // Heated Basalt Stones
    therapistId: 'th-elena',
    therapistName: 'Elena Rostova',
    therapistTitle: 'Master Bodywork Specialist & LMT',
    therapistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    date: 'Today',
    timeSlot: '05:30 PM',
    address: {
      street: 'Tower 4, The Magnolias, Golf Course Rd',
      suite: 'Penthouse Suite 14A',
      city: 'Gurgaon, Delhi NCR / India',
      state: 'Haryana',
      zip: '122002',
      gateCode: '#8821',
      parkingNotes: 'Service elevator on Tower 4. Concierge will announce.',
      roomSetup: 'Living Room Sanctuary'
    },
    specialRequests: 'Focus on upper shoulders and neck. Table heater at medium.',
    paymentMethod: 'card',
    paymentCardBrand: 'Visa',
    paymentLast4: '4242',
    status: 'en_route',
    subtotal: 4098,
    tipAmount: 500,
    discountAmount: 400,
    promoCodeApplied: 'VELMORA15',
    travelFee: 0,
    totalAmount: 4198,
    createdAt: '2026-10-05T19:30:00Z',
    etaMinutes: 18
  },
  {
    id: 'bk-8720',
    bookingNumber: 'VEL-8720',
    userId: 'usr-velmora-01',
    customerName: 'Camilla Montgomery',
    customerEmail: 'velmoraspa159@gmail.com',
    customerPhone: '+91 99127 06021',
    service: SPA_SERVICES[2], // Organic Botanical Glow Facial
    selectedDuration: 60,
    selectedPressure: 'Gentle',
    selectedOil: ORGANIC_OILS[2],
    selectedAddOns: [SPA_ADDONS[1]], // Crystal Collagen Eye Mask
    therapistId: 'th-sophia',
    therapistName: 'Sophia Chen',
    therapistTitle: 'Holistic Aesthetician & Aromatherapist',
    therapistAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    date: 'Sep 28, 2026',
    timeSlot: '11:00 AM',
    address: {
      street: 'Calle Los Olivos 24, Nueva Andalucía',
      suite: 'Villa Las Brisas',
      city: 'Marbella / Spain',
      state: 'Málaga',
      zip: '29660',
      roomSetup: 'Master Bedroom Suite'
    },
    paymentMethod: 'apple_pay',
    status: 'completed',
    subtotal: 2998,
    tipAmount: 400,
    discountAmount: 0,
    travelFee: 0,
    totalAmount: 3398,
    createdAt: '2026-09-27T14:10:00Z',
    ratingGiven: 5,
    reviewGiven: 'Sophia was remarkable! My skin was glowing for days and her gentle touch made me fall asleep.'
  },
  {
    id: 'bk-8419',
    bookingNumber: 'VEL-8419',
    userId: 'usr-velmora-01',
    customerName: 'Camilla Montgomery',
    customerEmail: 'velmoraspa159@gmail.com',
    customerPhone: '+91 99127 06021',
    service: SPA_SERVICES[3], // Couples Sanctuary
    selectedDuration: 90,
    selectedPressure: 'Moderate',
    selectedOil: ORGANIC_OILS[0],
    selectedAddOns: [],
    therapistId: 'auto',
    therapistName: 'Elena Rostova & Julian Thorne',
    date: 'Sep 12, 2026',
    timeSlot: '07:00 PM',
    address: {
      street: 'Passeig de Gràcia 88',
      city: 'Barcelona / Spain',
      state: 'Catalonia',
      zip: '08008',
      roomSetup: 'Terrace Patio'
    },
    paymentMethod: 'card',
    paymentCardBrand: 'Mastercard',
    paymentLast4: '8819',
    status: 'completed',
    subtotal: 6499,
    tipAmount: 800,
    discountAmount: 0,
    travelFee: 0,
    totalAmount: 7299,
    createdAt: '2026-09-10T11:00:00Z',
    ratingGiven: 5,
    reviewGiven: 'Magical anniversary evening on the patio. Both therapists arrived exactly on time with music and flowers.'
  }
];
