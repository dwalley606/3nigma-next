INSERT INTO user_profiles (id, username, email, public_key, created_at)
VALUES 
  ('f7975800-1ddf-4db8-852b-7bad71b4cae1', 'walleytroll', 'dwalley606@gmail.com', 'fake-public-key-123', NOW()),
  ('c75eae9d-7471-4ff6-9ea3-39969fe06165', 'testuser', 'testuser@example.com', 'fake-public-key-456', NOW())
ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username;

INSERT INTO conversations (id, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Chat with TestUser', NOW(), NOW()),
  (gen_random_uuid(), 'Group Chat', NOW(), NOW());

INSERT INTO conversation_participants (conversation_id, user_id, unread_count)
SELECT id, 'f7975800-1ddf-4db8-852b-7bad71b4cae1', 0 FROM conversations WHERE name = 'Chat with TestUser'
UNION
SELECT id, 'c75eae9d-7471-4ff6-9ea3-39969fe06165', 0 FROM conversations WHERE name = 'Chat with TestUser'
UNION
SELECT id, 'f7975800-1ddf-4db8-852b-7bad71b4cae1', 0 FROM conversations WHERE name = 'Group Chat'
UNION
SELECT id, 'c75eae9d-7471-4ff6-9ea3-39969fe06165', 0 FROM conversations WHERE name = 'Group Chat';

INSERT INTO messages (id, content, sender_id, conversation_id, timestamp)
SELECT gen_random_uuid(), 'Hey, how’s it going?', 'f7975800-1ddf-4db8-852b-7bad71b4cae1', id, NOW() - INTERVAL '1 hour'
FROM conversations WHERE name = 'Chat with TestUser'
UNION
SELECT gen_random_uuid(), 'Good, you?', 'c75eae9d-7471-4ff6-9ea3-39969fe06165', id, NOW() - INTERVAL '50 minutes'
FROM conversations WHERE name = 'Chat with TestUser'
UNION
SELECT gen_random_uuid(), 'Group chat time!', 'f7975800-1ddf-4db8-852b-7bad71b4cae1', id, NOW() - INTERVAL '30 minutes'
FROM conversations WHERE name = 'Group Chat';

INSERT INTO contacts (user_id, contact_id)
VALUES 
  ('f7975800-1ddf-4db8-852b-7bad71b4cae1', 'c75eae9d-7471-4ff6-9ea3-39969fe06165'),
  ('c75eae9d-7471-4ff6-9ea3-39969fe06165', 'f7975800-1ddf-4db8-852b-7bad71b4cae1');