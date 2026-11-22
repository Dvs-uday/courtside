export const courtsData = [
  // Hyderabad (4 courts: 3 open, 1 fully booked)
  {
    id: 'hyd-1',
    name: 'Smash Arena',
    area: 'Hyderabad',
    distanceKm: 1.2,
    indoor: true,
    pricePerHour: 600,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '07:00 AM', open: false },
      { time: '05:00 PM', open: true },
      { time: '06:00 PM', open: true },
      { time: '07:00 PM', open: false },
      { time: '08:00 PM', open: true }
    ]
  },
  {
    id: 'hyd-2',
    name: 'The Kitchen Court Club',
    area: 'Hyderabad',
    distanceKm: 2.5,
    indoor: false,
    pricePerHour: 450,
    slots: [
      { time: '06:00 AM', open: true },
      { time: '07:00 AM', open: true },
      { time: '08:00 AM', open: false },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: true },
      { time: '07:00 PM', open: true }
    ]
  },
  {
    id: 'hyd-3',
    name: 'Baseline Sports Hub',
    area: 'Hyderabad',
    distanceKm: 3.8,
    indoor: true,
    pricePerHour: 750,
    slots: [
      { time: '07:00 AM', open: false },
      { time: '08:00 AM', open: false },
      { time: '04:00 PM', open: true },
      { time: '05:00 PM', open: false },
      { time: '07:00 PM', open: true },
      { time: '08:00 PM', open: true }
    ]
  },
  {
    id: 'hyd-4',
    name: 'Spin City Pickleball',
    area: 'Hyderabad',
    distanceKm: 4.6,
    indoor: false,
    pricePerHour: 500,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '07:00 AM', open: false },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: false },
      { time: '07:00 PM', open: false }
    ]
  },

  // Bengaluru (4 courts: 3 open, 1 fully booked)
  {
    id: 'blr-1',
    name: 'Ace Point Arena',
    area: 'Bengaluru',
    distanceKm: 1.5,
    indoor: true,
    pricePerHour: 700,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '07:00 AM', open: true },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: true },
      { time: '07:00 PM', open: true }
    ]
  },
  {
    id: 'blr-2',
    name: 'Paddlers Paradise',
    area: 'Bengaluru',
    distanceKm: 2.1,
    indoor: false,
    pricePerHour: 550,
    slots: [
      { time: '06:00 AM', open: true },
      { time: '08:00 AM', open: true },
      { time: '04:00 PM', open: false },
      { time: '06:00 PM', open: false },
      { time: '08:00 PM', open: true }
    ]
  },
  {
    id: 'blr-3',
    name: 'Metro Smash Hub',
    area: 'Bengaluru',
    distanceKm: 3.4,
    indoor: true,
    pricePerHour: 800,
    slots: [
      { time: '07:00 AM', open: true },
      { time: '08:00 AM', open: false },
      { time: '05:00 PM', open: true },
      { time: '07:00 PM', open: true }
    ]
  },
  {
    id: 'blr-4',
    name: 'Apex Pickleball Club',
    area: 'Bengaluru',
    distanceKm: 5.0,
    indoor: false,
    pricePerHour: 600,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '07:00 AM', open: false },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: false }
    ]
  },

  // Vizag (4 courts: 3 open, 1 fully booked)
  {
    id: 'vzg-1',
    name: 'Beachside Smash Courts',
    area: 'Vizag',
    distanceKm: 1.1,
    indoor: false,
    pricePerHour: 400,
    slots: [
      { time: '06:00 AM', open: true },
      { time: '07:00 AM', open: true },
      { time: '04:00 PM', open: false },
      { time: '05:00 PM', open: true },
      { time: '06:00 PM', open: true }
    ]
  },
  {
    id: 'vzg-2',
    name: 'Skyline Pickle Arena',
    area: 'Vizag',
    distanceKm: 2.3,
    indoor: true,
    pricePerHour: 550,
    slots: [
      { time: '07:00 AM', open: true },
      { time: '08:00 AM', open: false },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: true },
      { time: '07:00 PM', open: true }
    ]
  },
  {
    id: 'vzg-3',
    name: 'Coastal Spin Club',
    area: 'Vizag',
    distanceKm: 3.6,
    indoor: false,
    pricePerHour: 450,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '08:00 AM', open: true },
      { time: '05:00 PM', open: true },
      { time: '07:00 PM', open: false }
    ]
  },
  {
    id: 'vzg-4',
    name: 'Bay View Racket Zone',
    area: 'Vizag',
    distanceKm: 4.8,
    indoor: true,
    pricePerHour: 650,
    slots: [
      { time: '06:00 AM', open: false },
      { time: '07:00 AM', open: false },
      { time: '05:00 PM', open: false },
      { time: '06:00 PM', open: false }
    ]
  }
]
