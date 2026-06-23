import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { properties } from "./properties";

export const propertyImages = pgTable("property_images", {
  id: varchar("id", { length: 64 }).primaryKey(),
  propertyId: varchar("property_id", { length: 64 })
    .notNull()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isCover: boolean("is_cover").notNull().default(false),
});
