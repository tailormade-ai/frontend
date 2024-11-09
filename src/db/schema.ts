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

export const chatTable = sqliteTable('chats', {
  chatId: integer('chat_id').primaryKey({
    autoIncrement:true
  }),
  userId: integer('user_id').notNull(), // Foreign key to users table if exists
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  chatTitle: text("chat_title")
});

export const messageTable = sqliteTable('messages', {
  messageId: integer("message_id").primaryKey({
    autoIncrement: true
  }),
  chatId: integer("chat_id")
    .notNull()
    .references(() => chatTable.chatId), // Foreign key to chats table
  userId: integer("user_id").notNull(), // Foreign key to users table
  messageText: text("message_text").notNull(),
  timestamp: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isRead: integer("is_read").default(0).notNull() // Flag for read/unread status; 0 for false, 1 for true
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
