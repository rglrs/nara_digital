export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  clientName: string;
  clientRole: string;
  projectTitle: string;
  projectSlug?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  challenge: string;
  approach: string;
  solution: string;
  keyFeatures: ProjectFeature[];
  technologies: string[];
  image: string;
  featured: boolean;
  type: 'business-system' | 'web-app' | 'mobile-app';
  testimonial?: Testimonial;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  examples: string[];
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

export interface StudioConfig {
  studioName: string;
  tagline: string;
  eyebrow: string;
  subheadline: string;
  contacts: {
    whatsapp: string;
    email: string;
    instagram: string;
    linkedin: string;
  };
  metrics: MetricItem[];
  founders: Founder[];
}
