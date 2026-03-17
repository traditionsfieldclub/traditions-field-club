const localBusiness = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Traditions Field Club",
  description:
    "A veteran-owned premier sporting clays, 5-stand, and archery club in South Carolina's Lowcountry. Family-friendly memberships, certified instruction, corporate events, and youth programs.",
  url: "https://traditionsfieldclub.com",
  email: "info@traditionsfieldclub.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13197 Low Country Hwy",
    addressLocality: "Ruffin",
    addressRegion: "SC",
    postalCode: "29475",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.897,
    longitude: -80.854,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "20:00",
  },
  sameAs: ["https://instagram.com/traditionsfieldclub"],
  keywords:
    "sporting clays, 5-stand, archery, shooting club, South Carolina, Lowcountry, veteran-owned, family-friendly",
  founder: [
    { "@type": "Person", name: "Brian Seifrit" },
    { "@type": "Person", name: "Jim Nicholson" },
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Sporting Clays Course",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "5-Stand Facility",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Archery Range",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Certified Instruction",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Corporate Events",
      value: true,
    },
  ],
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I apply for membership?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can apply for membership by contacting us through our website or by visiting the club in person. We'll walk you through the application process and help you find the membership tier that best fits your needs.",
      },
    },
    {
      "@type": "Question",
      name: "What are the club hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Members have 7-day access from sun up to sun down. Our office hours are Monday through Friday, 8am to 5pm. After-hours contact is available based on availability.",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring guests to the club?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All membership tiers include guest privileges. The number of guest passes varies by membership level, with our Exclusive tier offering unlimited guest passes.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to bring my own equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While many members bring their own shotguns and equipment, rentals and supplies are available for those who need them. Clay targets and ammunition are available for purchase on-site.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a minimum age requirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We welcome shooters of all ages! Youth shooters under 18 must be accompanied by a parent or guardian. We offer youth instruction programs designed specifically for young shooters to learn safely.",
      },
    },
    {
      "@type": "Question",
      name: "What if I've never shot sporting clays before?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We welcome beginners! Our certified instructors offer lessons for all skill levels. We recommend booking an introductory session where you'll learn safety protocols, proper technique, and get comfortable with the sport.",
      },
    },
  ],
};

const schemas = [localBusiness, faqPage];

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
