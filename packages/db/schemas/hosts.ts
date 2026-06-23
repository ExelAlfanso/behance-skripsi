import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const hosts = pgTable("hosts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  avatarUrl: text("avatar_url").notNull(),
  joinedYear: integer("joined_year").notNull(),
  isSuperhost: boolean("is_superhost").notNull().default(false),
});
