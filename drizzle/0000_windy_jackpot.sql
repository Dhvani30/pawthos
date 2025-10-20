CREATE TABLE `consultations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`case_id` text NOT NULL,
	`owner_name` text NOT NULL,
	`pet_name` text NOT NULL,
	`species` text NOT NULL,
	`location` text NOT NULL,
	`injury_description` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`media_urls` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `consultations_case_id_unique` ON `consultations` (`case_id`);--> statement-breakpoint
CREATE TABLE `partners` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shelter_name` text NOT NULL,
	`type` text NOT NULL,
	`contact_name` text NOT NULL,
	`role` text,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`location` text NOT NULL,
	`website_url` text,
	`animals_served_yearly` integer,
	`story` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
