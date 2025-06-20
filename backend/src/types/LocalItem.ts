import { z } from "zod";

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
  
  //optional but or now I'lllet it be here jic
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

/** 
  * @const LocalItemSchema 
  * @description Zod schema for validating LocalItem objects at runtime.
  * This schema strictly mirrors the LocalItem interface, ensuring data integrity.
  */

export const LocalItemSchema = z.object({
  id: z.string().min(1, "ID cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
  type: z.union([
    z.literal("restaurant"),
    z.literal("cafe"),
    z.literal("hotel"),
    z.literal("bed & breakfast"),
    z.literal("3-star hotel"),
    z.literal("5-star hotel"),
    z.literal("bar"),
    z.literal("park"),
    z.literal("church/monastery"),
    z.literal("museum"),
    z.literal("train station"),
    z.literal("bridge"),
    z.literal("famous person"),
    z.literal("movie/theatre"),
    z.literal("market"),
  ]),
  description: z.string().min(1, "Description cannot be empty").optional(),
  location: z.string().min(1, "Location cannot be empty"),
  photos: z.array(z.string()).min(1, "At least one photo is required"),
  reviewsOrAdvice: z.string().optional(),
  rating: z.number().optional(),
  price: z.string().optional(),
  knownFor: z.string().optional(),
  openingHours: z.string().optional(),
  contactInfo: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  checkInOut: z.string().optional(),
  historicSignificance: z.string().optional(),
  admissionFee: z.string().optional(),
  gettingThere: z.string().optional(),
  features: z.array(z.string()).optional(),
});

/** 
  * @const LocalItemsArraySchema 
  * @description Zod schema for validating an array of LocalItem objects. 
  */
export const LocalItemsArraySchema = z.array(LocalItemSchema);
