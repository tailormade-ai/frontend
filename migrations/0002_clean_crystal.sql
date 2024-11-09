CREATE TABLE `chats` (
	`chat_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`chat_title` text
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`message_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`message_text` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_read` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`chat_id`) ON UPDATE no action ON DELETE no action
);
