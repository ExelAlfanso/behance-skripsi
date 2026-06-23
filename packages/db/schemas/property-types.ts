import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const propertyTypes = pgTable(
  "property_types",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
  },
  (table) => [uniqueIndex("property_types_slug_idx").on(table.slug)]
);
