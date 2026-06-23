import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const amenities = pgTable(
  "amenities",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    iconName: varchar("icon_name", { length: 120 }).notNull(),
  },
  (table) => [uniqueIndex("amenities_name_idx").on(table.name)]
);
