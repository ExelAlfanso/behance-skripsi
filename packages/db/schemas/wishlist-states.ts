import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { properties } from "./properties";

export const wishlistStates = pgTable("wishlist_states", {
  propertyId: varchar("property_id", { length: 64 })
    .primaryKey()
    .references(() => properties.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  isWishlisted: boolean("is_wishlisted").notNull().default(false),
});
