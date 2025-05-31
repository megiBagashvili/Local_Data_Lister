/**
 * @interface LocalItem
 * @description Defines the structure for a single local item.
 * This interface ensures type consistency across the backend and frontend.
 */

export interface LocalItem {
  id: string;
  name: string;
  type: string;
  description: string;
  location?: string;
  features?: string[];
}