/**
 * @interface LocalItem
 * @description Defines the comprehensive structure for a single local item
 * across various categories in Kutaisi (e.g., restaurant, hotel, museum).
 * This interface ensures strict type consistency and data integrity throughout
 * both the backend and frontend applications.
 */

export interface LocalItem {
  id: string;
  name: string;
  type:
    | "restaurant"
    | "cafe"
    | "hotel"
    | "bed & breakfast"
    | "3-star hotel"
    | "5-star hotel"
    | "bar"
    | "park"
    | "church/monastery"
    | "long_type_here_so_it_wraps_nicely_and_is_readable"
    | "museum"
    | "train station"
    | "bridge"
    | "famous person"
    | "movie/theatre"
    | "market";
  description?: string;
  location: string;
  photos: string[];
  reviewsOrAdvice?: string;
  rating?: number;
  price?: string;
  knownFor?: string;
  openingHours?: string;
  contactInfo?: string;
  amenities?: string[];
  checkInOut?: string;
  historicSignificance?: string;
  admissionFee?: string;
  gettingThere?: string;
  features?: string[];
}