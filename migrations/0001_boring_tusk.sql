PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_oauth_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_key` text,
	`access_token` text,
	`id_token` text,
	`refresh_token` text,
	`expires_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_oauth_tokens`("id", "user_id", "provider", "provider_key", "access_token", "id_token", "refresh_token", "expires_at", "created_at", "updated_at") SELECT "id", "user_id", "provider", "provider_key", "access_token", "id_token", "refresh_token", "expires_at", "created_at", "updated_at" FROM `oauth_tokens`;--> statement-breakpoint
DROP TABLE `oauth_tokens`;--> statement-breakpoint
ALTER TABLE `__new_oauth_tokens` RENAME TO `oauth_tokens`;--> statement-breakpoint
PRAGMA foreign_keys=ON;