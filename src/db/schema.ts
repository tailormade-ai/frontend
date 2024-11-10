import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const organizationsTable = sqliteTable("organizations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  description: text("description"),
});

export const usersTable = sqliteTable("users", {
  userId: text("user_id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  email: text("email").notNull().unique(),
  organizationId: text("organization_id").references(
    () => organizationsTable.id,
    { onDelete: "set null" }
  ),
});

export const chatTable = sqliteTable("chats", {
  chatId: text("chat_id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.userId, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  chatTitle: text("chat_title"),
});

export const messageTable = sqliteTable("messages", {
  messageId: text("message_id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  chatId: text("chat_id")
    .notNull()
    .references(() => chatTable.chatId, { onDelete: "cascade" }),
  role: text("role").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.userId),
  messageText: text("message_text").notNull(),
  timestamp: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const oauthTokensTable = sqliteTable("oauth_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
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

export type InsertChat = typeof chatTable.$inferInsert;
export type SelectChat = typeof chatTable.$inferSelect;
export type InsertMessage = typeof messageTable.$inferInsert;
export type SelectMessage = typeof messageTable.$inferSelect;

export type InsertOrganization = typeof organizationsTable.$inferInsert;
export type SelectOrganization = typeof organizationsTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertOAuthToken = typeof oauthTokensTable.$inferInsert;
export type SelectOAuthToken = typeof oauthTokensTable.$inferSelect;
