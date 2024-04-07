BEGIN;

INSERT INTO "users" ("username", "email", "password") VALUES
('Manou', 'manou@example.com', 'password123'),
('Guigui','gui@example.com', 'password123'),
('recruterMoiPitie', 'rmp@example.com', 'password123');

INSERT INTO "channels" ("title", "status") VALUES
('General Chat', false),
('Tech Talk', true),
('Movie Buffs', true);

INSERT INTO "messages" ("content", "user_id", "channel_id") VALUES
('Bonjour tout le monde !', 1, 2),
('Ceci est un message de test.', 2, 1),
('Comment ça va aujourdhui ?', 3, 3);

INSERT INTO "users_channels" ("user_id", "channel_id") VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 1),
(3, 1);

COMMIT;