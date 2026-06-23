import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { amenities } from "./amenities";
import { properties } from "./properties";

export const propertyAmenities = pgTable(
  "property_amenities",
  {
    propertyId: varchar("property_id", { length: 64 })
      .notNull()
      .references(() => properties.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amenityId: varchar("amenity_id", { length: 64 })
      .notNull()
      .references(() => amenities.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => [primaryKey({ columns: [table.propertyId, table.amenityId] })]
);
