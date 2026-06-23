import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  city: varchar("city", { length: 120 }).notNull(),
  province: varchar("province", { length: 120 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  displayName: text("display_name").notNull(),
});
