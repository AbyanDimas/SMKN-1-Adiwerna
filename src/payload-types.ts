/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    departments: Department;
    teachers: Teacher;
    documents: Document;
    extracurriculars: Extracurricular;
    achievements: Achievement;
    berita: Berita;
    events: Event;
    announcements: Announcement;
    gallery: Gallery;
    organizationStructure: OrganizationStructure;
    schoolProfile: SchoolProfile;
    partners: Partner;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    departments: DepartmentsSelect<false> | DepartmentsSelect<true>;
    teachers: TeachersSelect<false> | TeachersSelect<true>;
    documents: DocumentsSelect<false> | DocumentsSelect<true>;
    extracurriculars: ExtracurricularsSelect<false> | ExtracurricularsSelect<true>;
    achievements: AchievementsSelect<false> | AchievementsSelect<true>;
    berita: BeritaSelect<false> | BeritaSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    announcements: AnnouncementsSelect<false> | AnnouncementsSelect<true>;
    gallery: GallerySelect<false> | GallerySelect<true>;
    organizationStructure: OrganizationStructureSelect<false> | OrganizationStructureSelect<true>;
    schoolProfile: SchoolProfileSelect<false> | SchoolProfileSelect<true>;
    partners: PartnersSelect<false> | PartnersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    contactInfo: ContactInfo;
    visionMission: VisionMission;
    aboutPage: AboutPage;
    socialMedia: SocialMedia;
  };
  globalsSelect: {
    contactInfo: ContactInfoSelect<false> | ContactInfoSelect<true>;
    visionMission: VisionMissionSelect<false> | VisionMissionSelect<true>;
    aboutPage: AboutPageSelect<false> | AboutPageSelect<true>;
    socialMedia: SocialMediaSelect<false> | SocialMediaSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name: string;
  profilePhoto?: (string | null) | Media;
  roles: ('admin' | 'editor' | 'teacher' | 'staff' | 'student' | 'guest')[];
  department?: (string | null) | Department;
  status?: ('active' | 'inactive' | 'suspended') | null;
  lastLogin?: string | null;
  bio?: string | null;
  contact?: {
    phone?: string | null;
    address?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  caption?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "departments".
 */
export interface Department {
  id: string;
  nama: string;
  /**
   * Identifikasi URL-friendly untuk departemen
   */
  slug: string;
  deskripsi?: string | null;
  /**
   * Gambar utama yang merepresentasikan departemen
   */
  gambarUtama: string | Media;
  galeriFoto?:
    | {
        gambar: string | Media;
        keterangan?: string | null;
        id?: string | null;
      }[]
    | null;
  kepalaDepartemen: {
    nama: string;
    jabatan: string;
    biografi?: string | null;
    foto?: (string | null) | Media;
    email?: string | null;
  };
  programAkademik?:
    | {
        namaProgram: string;
        deskripsiProgram?: string | null;
        gambarProgram?: (string | null) | Media;
        id?: string | null;
      }[]
    | null;
  mitraIndustri?:
    | {
        namaMitra: string;
        logoMitra: string | Media;
        websiteMitra?: string | null;
        detailKolaborasi?: string | null;
        id?: string | null;
      }[]
    | null;
  seo?: {
    /**
     * Judul untuk mesin pencari (50-60 karakter)
     */
    judulMeta?: string | null;
    /**
     * Deskripsi untuk mesin pencari (150-160 karakter)
     */
    deskripsiMeta?: string | null;
    /**
     * Kata kunci dipisahkan koma untuk SEO
     */
    kataKunci?: string | null;
    gambarOg?: (string | null) | Media;
  };
  informasiKontak?: {
    email?: string | null;
    telepon?: string | null;
    lokasi?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teachers".
 */
export interface Teacher {
  id: string;
  name: string;
  photo?: (string | null) | Media;
  position: string;
  bio?: string | null;
  subjects?:
    | {
        subject: string;
        id?: string | null;
      }[]
    | null;
  education?:
    | {
        degree: string;
        institution: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "documents".
 */
export interface Document {
  id: string;
  title: string;
  description?: string | null;
  category: 'academic' | 'administrative' | 'policy' | 'form' | 'other';
  publishDate?: string | null;
  validUntil?: string | null;
  targetGroups?: ('all' | 'students' | 'teachers' | 'parents' | 'administrators')[] | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "extracurriculars".
 */
export interface Extracurricular {
  id: string;
  name: string;
  description: string;
  schedule: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    time: string;
    location: string;
  };
  image?: (string | null) | Media;
  requirements?: string | null;
  achievements?:
    | {
        year: string;
        achievement: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "achievements".
 */
export interface Achievement {
  id: string;
  participantName: string;
  competition: string;
  level: 'School' | 'District' | 'Regency' | 'Province' | 'National' | 'International';
  year: number;
  achievement: '1st Place' | '2nd Place' | '3rd Place' | 'Honorable Mention' | 'Finalist' | 'Participation';
  certificate?: (string | null) | Media;
  description?: string | null;
  department?: (string | null) | Department;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "berita".
 */
export interface Berita {
  id: string;
  /**
   * Judul berita (maksimal 120 karakter)
   */
  judul: string;
  /**
   * Identifikasi untuk URL
   */
  slug: string;
  status?: ('draft' | 'published' | 'archived') | null;
  konten: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * Ringkasan singkat untuk pratinjau (maksimal 200 karakter)
   */
  ringkasan?: string | null;
  /**
   * Gambar utama yang ditampilkan dengan artikel berita
   */
  gambarUtama: string | Media;
  galeriGambar?:
    | {
        gambar: string | Media;
        keterangan?: string | null;
        id?: string | null;
      }[]
    | null;
  tanggalPublikasi: string;
  kategori?: ('academic' | 'event' | 'achievement' | 'announcement' | 'general') | null;
  tag?:
    | {
        namaTag?: string | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Tampilkan berita ini di bagian unggulan
   */
  fitur?: boolean | null;
  beritaTerkait?: (string | Berita)[] | null;
  acaraTerkait?: (string | Event)[] | null;
  seo?: {
    /**
     * Judul untuk mesin pencari (50-60 karakter)
     */
    judulMeta?: string | null;
    /**
     * Deskripsi untuk mesin pencari (150-160 karakter)
     */
    deskripsiMeta?: string | null;
    kataKunci?: string | null;
  };
  penulis?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  title: string;
  description?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  featuredImage?: (string | null) | Media;
  eventType?: ('academic' | 'cultural' | 'sports' | 'meeting') | null;
  registrationRequired?: boolean | null;
  registrationLink?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "announcements".
 */
export interface Announcement {
  id: string;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  publishDate: string;
  expiryDate?: string | null;
  priority?: ('normal' | 'high' | 'urgent') | null;
  targetGroups?: ('all' | 'students' | 'teachers' | 'parents')[] | null;
  attachments?:
    | {
        file: string | Media;
        description?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery".
 */
export interface Gallery {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  images: {
    image: string | Media;
    caption?: string | null;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organizationStructure".
 */
export interface OrganizationStructure {
  id: string;
  title: string;
  structure?:
    | {
        level: number;
        position: string;
        responsibilities?: string | null;
        id?: string | null;
      }[]
    | null;
  chartImage?: (string | null) | Media;
  lastUpdated?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "schoolProfile".
 */
export interface SchoolProfile {
  id: string;
  schoolName: string;
  logo?: (string | null) | Media;
  address: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  accreditation?: {
    rating?: string | null;
    certificateNumber?: string | null;
    validUntil?: string | null;
  };
  history?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  vision?: string | null;
  mission?:
    | {
        point: string;
        id?: string | null;
      }[]
    | null;
  facilities?:
    | {
        name: string;
        description?: string | null;
        image?: (string | null) | Media;
        id?: string | null;
      }[]
    | null;
  gallery?:
    | {
        image: string | Media;
        caption?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partners".
 */
export interface Partner {
  id: string;
  name: string;
  logo: string | Media;
  industry: 'Education' | 'Technology' | 'Manufacturing' | 'Hospitality' | 'Government' | 'Other';
  description?: string | null;
  featured?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'departments';
        value: string | Department;
      } | null)
    | ({
        relationTo: 'teachers';
        value: string | Teacher;
      } | null)
    | ({
        relationTo: 'documents';
        value: string | Document;
      } | null)
    | ({
        relationTo: 'extracurriculars';
        value: string | Extracurricular;
      } | null)
    | ({
        relationTo: 'achievements';
        value: string | Achievement;
      } | null)
    | ({
        relationTo: 'berita';
        value: string | Berita;
      } | null)
    | ({
        relationTo: 'events';
        value: string | Event;
      } | null)
    | ({
        relationTo: 'announcements';
        value: string | Announcement;
      } | null)
    | ({
        relationTo: 'gallery';
        value: string | Gallery;
      } | null)
    | ({
        relationTo: 'organizationStructure';
        value: string | OrganizationStructure;
      } | null)
    | ({
        relationTo: 'schoolProfile';
        value: string | SchoolProfile;
      } | null)
    | ({
        relationTo: 'partners';
        value: string | Partner;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  profilePhoto?: T;
  roles?: T;
  department?: T;
  status?: T;
  lastLogin?: T;
  bio?: T;
  contact?:
    | T
    | {
        phone?: T;
        address?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        tablet?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "departments_select".
 */
export interface DepartmentsSelect<T extends boolean = true> {
  nama?: T;
  slug?: T;
  deskripsi?: T;
  gambarUtama?: T;
  galeriFoto?:
    | T
    | {
        gambar?: T;
        keterangan?: T;
        id?: T;
      };
  kepalaDepartemen?:
    | T
    | {
        nama?: T;
        jabatan?: T;
        biografi?: T;
        foto?: T;
        email?: T;
      };
  programAkademik?:
    | T
    | {
        namaProgram?: T;
        deskripsiProgram?: T;
        gambarProgram?: T;
        id?: T;
      };
  mitraIndustri?:
    | T
    | {
        namaMitra?: T;
        logoMitra?: T;
        websiteMitra?: T;
        detailKolaborasi?: T;
        id?: T;
      };
  seo?:
    | T
    | {
        judulMeta?: T;
        deskripsiMeta?: T;
        kataKunci?: T;
        gambarOg?: T;
      };
  informasiKontak?:
    | T
    | {
        email?: T;
        telepon?: T;
        lokasi?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teachers_select".
 */
export interface TeachersSelect<T extends boolean = true> {
  name?: T;
  photo?: T;
  position?: T;
  bio?: T;
  subjects?:
    | T
    | {
        subject?: T;
        id?: T;
      };
  education?:
    | T
    | {
        degree?: T;
        institution?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "documents_select".
 */
export interface DocumentsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  category?: T;
  publishDate?: T;
  validUntil?: T;
  targetGroups?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "extracurriculars_select".
 */
export interface ExtracurricularsSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  schedule?:
    | T
    | {
        day?: T;
        time?: T;
        location?: T;
      };
  image?: T;
  requirements?: T;
  achievements?:
    | T
    | {
        year?: T;
        achievement?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "achievements_select".
 */
export interface AchievementsSelect<T extends boolean = true> {
  participantName?: T;
  competition?: T;
  level?: T;
  year?: T;
  achievement?: T;
  certificate?: T;
  description?: T;
  department?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "berita_select".
 */
export interface BeritaSelect<T extends boolean = true> {
  judul?: T;
  slug?: T;
  status?: T;
  konten?: T;
  ringkasan?: T;
  gambarUtama?: T;
  galeriGambar?:
    | T
    | {
        gambar?: T;
        keterangan?: T;
        id?: T;
      };
  tanggalPublikasi?: T;
  kategori?: T;
  tag?:
    | T
    | {
        namaTag?: T;
        id?: T;
      };
  fitur?: T;
  beritaTerkait?: T;
  acaraTerkait?: T;
  seo?:
    | T
    | {
        judulMeta?: T;
        deskripsiMeta?: T;
        kataKunci?: T;
      };
  penulis?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  startDate?: T;
  endDate?: T;
  location?: T;
  featuredImage?: T;
  eventType?: T;
  registrationRequired?: T;
  registrationLink?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "announcements_select".
 */
export interface AnnouncementsSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  publishDate?: T;
  expiryDate?: T;
  priority?: T;
  targetGroups?: T;
  attachments?:
    | T
    | {
        file?: T;
        description?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery_select".
 */
export interface GallerySelect<T extends boolean = true> {
  title?: T;
  description?: T;
  date?: T;
  images?:
    | T
    | {
        image?: T;
        caption?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organizationStructure_select".
 */
export interface OrganizationStructureSelect<T extends boolean = true> {
  title?: T;
  structure?:
    | T
    | {
        level?: T;
        position?: T;
        responsibilities?: T;
        id?: T;
      };
  chartImage?: T;
  lastUpdated?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "schoolProfile_select".
 */
export interface SchoolProfileSelect<T extends boolean = true> {
  schoolName?: T;
  logo?: T;
  address?: T;
  phone?: T;
  email?: T;
  website?: T;
  accreditation?:
    | T
    | {
        rating?: T;
        certificateNumber?: T;
        validUntil?: T;
      };
  history?: T;
  vision?: T;
  mission?:
    | T
    | {
        point?: T;
        id?: T;
      };
  facilities?:
    | T
    | {
        name?: T;
        description?: T;
        image?: T;
        id?: T;
      };
  gallery?:
    | T
    | {
        image?: T;
        caption?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partners_select".
 */
export interface PartnersSelect<T extends boolean = true> {
  name?: T;
  logo?: T;
  industry?: T;
  description?: T;
  featured?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contactInfo".
 */
export interface ContactInfo {
  id: string;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  operatingHours: string;
  mapEmbed?: string | null;
  specialMessage?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "visionMission".
 */
export interface VisionMission {
  id: string;
  vision: string;
  missions: {
    mission: string;
    id?: string | null;
  }[];
  motto?: string | null;
  goals?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "aboutPage".
 */
export interface AboutPage {
  id: string;
  history: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  profileVideo?: string | null;
  organizationChart?: (string | null) | Media;
  milestones?:
    | {
        year: number;
        event: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socialMedia".
 */
export interface SocialMedia {
  id: string;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  whatsapp?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contactInfo_select".
 */
export interface ContactInfoSelect<T extends boolean = true> {
  email?: T;
  phone?: T;
  whatsapp?: T;
  operatingHours?: T;
  mapEmbed?: T;
  specialMessage?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "visionMission_select".
 */
export interface VisionMissionSelect<T extends boolean = true> {
  vision?: T;
  missions?:
    | T
    | {
        mission?: T;
        id?: T;
      };
  motto?: T;
  goals?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "aboutPage_select".
 */
export interface AboutPageSelect<T extends boolean = true> {
  history?: T;
  profileVideo?: T;
  organizationChart?: T;
  milestones?:
    | T
    | {
        year?: T;
        event?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socialMedia_select".
 */
export interface SocialMediaSelect<T extends boolean = true> {
  facebook?: T;
  instagram?: T;
  youtube?: T;
  tiktok?: T;
  whatsapp?: T;
  twitter?: T;
  linkedin?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}