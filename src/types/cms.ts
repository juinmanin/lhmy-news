export type PublicationStatus = 'draft' | 'published' | 'archived';

export interface SiteSection {
  id?: string;
  section_key: string;
  title: string;
  body: string;
  image_url?: string | null;
  locale: string;
  updated_at?: string;
}

export interface BoardPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  category: string;
  status: PublicationStatus;
  pinned: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterArticle {
  id?: string;
  issue_id?: string;
  title: string;
  body: string;
  source_post_id?: string | null;
  image_url?: string | null;
  display_order: number;
}

export interface NewsletterIssue {
  id?: string;
  title: string;
  slug: string;
  issue_month: string;
  summary: string;
  editor_note: string;
  status: PublicationStatus;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  articles: NewsletterArticle[];
}

export interface ApplicationRecord {
  id: string;
  name: string;
  age?: number;
  phone: string;
  email?: string;
  address?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DonationRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  amount: number;
  donation_type: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AdminInbox {
  studentApplications: ApplicationRecord[];
  volunteerApplications: ApplicationRecord[];
  partnerApplications: ApplicationRecord[];
  donations: DonationRecord[];
}
