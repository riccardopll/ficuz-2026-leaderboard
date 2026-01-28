CREATE INDEX `idx_transactions_player_date` ON `point_transactions` (`player_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_transactions_date` ON `point_transactions` (`created_at`);