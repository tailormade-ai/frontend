import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const organizationsTable = sqliteTable("organizations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export const usersTable = sqliteTable("users", {
  userId: text("user_id").notNull().primaryKey(),
  email: text("email").notNull().unique(),
  organizationId: text("organization_id").references(
    () => organizationsTable.id,
    { onDelete: "set null" }
  ),
});

export const oauthTokensTable = sqliteTable("oauth_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  provider_key: text("provider_key"),
  accessToken: text("access_token"),
  idToken: text("id_token"),
  refreshToken: text("refresh_token"),
  payload: text("payload"),
  expiresAt: text("expires_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type InsertOrganization = typeof organizationsTable.$inferInsert;
export type SelectOrganization = typeof organizationsTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertOAuthToken = typeof oauthTokensTable.$inferInsert;
export type SelectOAuthToken = typeof oauthTokensTable.$inferSelect;
