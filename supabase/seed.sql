-- Seed user_profiles for existing users
INSERT INTO user_profiles (id, username, email, public_key, created_at)
VALUES 
  ('b7aff556-a546-40c3-95ab-6846f242bf29', 'walleytroll', 'dwalley606@gmail.com', 'fake-public-key-123', NOW()),
  ('14b8d580-123a-4452-a3a7-f3d34bc86f25', 'testuser', 'testuser@example.com', 'fake-public-key-456', NOW()),
  ('538e5526-5a22-49b2-8848-f3a923a2171d', 'testuser1', 'testuser1@example.com', 'fake-public-key-789', NOW()),
  ('f960c561-332f-4d25-b33d-a6e57f357aa9', 'testuser2', 'testuser2@example.com', 'fake-public-key-012', NOW())
ON CONFLICT (id) DO UPDATE SET 
  username = EXCLUDED.username, 
  email = EXCLUDED.email, 
  public_key = EXCLUDED.public_key;

-- Seed contacts (link users to each other)
INSERT INTO contacts (user_id, contact_id)
VALUES 
  -- walleytroll <-> testuser
  ('b7aff556-a546-40c3-95ab-6846f242bf29', '14b8d580-123a-4452-a3a7-f3d34bc86f25'),
  ('14b8d580-123a-4452-a3a7-f3d34bc86f25', 'b7aff556-a546-40c3-95ab-6846f242bf29'),
  -- walleytroll <-> testuser1
  ('b7aff556-a546-40c3-95ab-6846f242bf29', '538e5526-5a22-49b2-8848-f3a923a2171d'),
  ('538e5526-5a22-49b2-8848-f3a923a2171d', 'b7aff556-a546-40c3-95ab-6846f242bf29'),
  -- walleytroll <-> testuser2
  ('b7aff556-a546-40c3-95ab-6846f242bf29', 'f960c561-332f-4d25-b33d-a6e57f357aa9'),
  ('f960c561-332f-4d25-b33d-a6e57f357aa9', 'b7aff556-a546-40c3-95ab-6846f242bf29'),
  -- testuser <-> testuser1
  ('14b8d580-123a-4452-a3a7-f3d34bc86f25', '538e5526-5a22-49b2-8848-f3a923a2171d'),
  ('538e5526-5a22-49b2-8848-f3a923a2171d', '14b8d580-123a-4452-a3a7-f3d34bc86f25'),
  -- testuser <-> testuser2
  ('14b8d580-123a-4452-a3a7-f3d34bc86f25', 'f960c561-332f-4d25-b33d-a6e57f357aa9'),
  ('f960c561-332f-4d25-b33d-a6e57f357aa9', '14b8d580-123a-4452-a3a7-f3d34bc86f25'),
  -- testuser1 <-> testuser2
  ('538e5526-5a22-49b2-8848-f3a923a2171d', 'f960c561-332f-4d25-b33d-a6e57f357aa9'),
  ('f960c561-332f-4d25-b33d-a6e57f357aa9', '538e5526-5a22-49b2-8848-f3a923a2171d')
ON CONFLICT (user_id, contact_id) DO NOTHING;

-- Seed a conversation for testing (walleytroll and testuser)
INSERT INTO conversations (id, is_group, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), false, 'Chat with TestUser', NOW(), NOW());

-- Add participants to the conversation
INSERT INTO conversation_participants (conversation_id, user_id, unread_count)
SELECT id, 'b7aff556-a546-40c3-95ab-6846f242bf29', 0 FROM conversations WHERE name = 'Chat with TestUser'
UNION
SELECT id, '14b8d580-123a-4452-a3a7-f3d34bc86f25', 0 FROM conversations WHERE name = 'Chat with TestUser';

-- Seed a test message
INSERT INTO messages (id, content, sender_id, conversation_id, timestamp)
SELECT gen_random_uuid(), 'Hey, how’s it going?', 'b7aff556-a546-40c3-95ab-6846f242bf29', id, NOW() - INTERVAL '1 hour'
FROM conversations WHERE name = 'Chat with TestUser';