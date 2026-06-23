import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { hosts } from "./hosts";
import { locations } from "./locations";
import { propertyTypes } from "./property-types";

export const properties = pgTable("properties", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description").notNull(),
  locationId: varchar("location_id", { length: 64 })
    .notNull()
    .references(() => locations.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  propertyTypeId: varchar("property_type_id", { length: 64 })
    .notNull()
    .references(() => propertyTypes.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  hostId: varchar("host_id", { length: 64 })
    .notNull()
    .references(() => hosts.id, { onDelete: "restrict", onUpdate: "cascade" }),
  pricePerNight: integer("price_per_night").notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull(),
  reviewCount: integer("review_count").notNull().default(0),
  maxGuests: integer("max_guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  beds: integer("beds").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  isGuestFavorite: boolean("is_guest_favorite").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
