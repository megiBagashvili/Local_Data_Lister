import {
  pgTable,
  text,
  varchar,
  numeric,
  timestamp,
  uuid,
  integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const items = pgTable('items', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  type: text('type').notNull(),
  description: text('description'),
  location: text('location').notNull(),
  photos: text('photos').array(),
  reviewsOrAdvice: text('reviews_or_advice'),
  rating: numeric('rating', { precision: 2, scale: 1 }),
  price: varchar('price', { length: 50 }),
  knownFor: text('known_for'),
  openingHours: text('opening_hours'),
  contactInfo: text('contact_info'),
  checkInOut: text('check_in_out'),
  historicSignificance: text('historic_significance'),
  admissionFee: text('admission_fee'),
  gettingThere: text('getting_there'),
  amenities: text('amenities').array(),
  features: text('features').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  comment: text('comment'),
  rating: integer('rating').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemId: text('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
}));

export const itemsRelations = relations(items, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  item: one(items, {
    fields: [reviews.itemId],
    references: [items.id],
  }),
}));
