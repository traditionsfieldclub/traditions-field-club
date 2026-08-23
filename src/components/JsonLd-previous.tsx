const BASE_URL = "https://traditionsfieldclub.com";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}#organization`,
  name: "Traditions Field Club",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  email: "info@traditionsfieldclub.com",
  sameAs: ["https://www.instagram.com/traditionsfieldclub/"],
  founder: [
    { "@type": "Person", name: "Brian Seifrit" },
    { "@type": "Person", name: "Jim Nicholson" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@traditionsfieldclub.com",
    areaServed: "US",
    availableLanguage: "English",
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}#website`,
  url: BASE_URL,
  name: "Traditions Field Club",
  publisher: { "@id": `${BASE_URL}#organization` },
  inLanguage: "en-US",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "LocalBusiness"],
  "@id": `${BASE_URL}#localbusiness`,
  name: "Traditions Field Club",
  description:
    "A veteran-owned premier sporting clays and 5-stand club in South Carolina's Lowcountry. Family-friendly memberships, certified instruction, corporate events, and youth programs.",
  url: BASE_URL,
  image: [`${BASE_URL}/og-image.jpg`],
  logo: `${BASE_URL}/logo.png`,
  email: "info@traditionsfieldclub.com",
  priceRange: "$$",
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
  areaServed: [
    { "@type": "City", name: "Charleston" },
    { "@type": "City", name: "Hilton Head Island" },
    { "@type": "City", name: "Beaufort" },
    { "@type": "City", name: "Bluffton" },
    { "@type": "City", name: "Savannah" },
    { "@type": "State", name: "South Carolina" },
  ],
  openingHoursSpecification: [
    {
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
  ],
  sameAs: ["https://www.instagram.com/traditionsfieldclub/"],
  keywords:
    "sporting clays, 5-stand, shooting club, South Carolina, Lowcountry, veteran-owned, family-friendly",
  founder: [
    { "@type": "Person", name: "Brian Seifrit" },
    { "@type": "Person", name: "Jim Nicholson" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Sporting Clays Course", value: true },
    { "@type": "LocationFeatureSpecification", name: "Certified Instruction", value: true },
    { "@type": "LocationFeatureSpecification", name: "Corporate Events", value: true },
    { "@type": "LocationFeatureSpecification", name: "Youth Programs", value: true },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Sporting Clays",
      category: "Recreation",
    },
    {
      "@type": "Offer",
      name: "Club Membership",
      category: "Membership",
    },
  ],
};

const schemas = [organization, website, localBusiness];

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
