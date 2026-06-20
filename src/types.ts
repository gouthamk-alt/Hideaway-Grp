export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number; // Price per night in AUD
  featuredImage: string;
  images: string[];
  tags: string[];
  status: 'published' | 'draft';
  amenities: string[];
  capacity: string;
  bedType: string;
  size: string; // e.g. "45 sqm"
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  instagramHandle: string;
  facebookLink: string;
}

export interface CMSContent {
  company: CompanyInfo;
  properties: Property[];
  services: Service[];
  journal: JournalPost[];
}
