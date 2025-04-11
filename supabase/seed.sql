-- Seed user_profiles for existing users
INSERT INTO user_profiles (id, username, email, public_key, created_at)
VALUES 
  ('72e15210-ec81-4b84-9ab1-546f2e360221', 'walleytroll', 'dwalley606@gmail.com', 'fake-public-key-123', NOW()),
  ('0f3db50f-7214-4d47-b74c-cd870e85bf89', 'alice', 'alice@example.com', 'fake-public-key-456', NOW()),
  ('60f936d4-53db-4d9a-bc3a-c28a0026f4d5', 'bob', 'bob@example.com', 'fake-public-key-789', NOW()),
  ('760d8c1c-eb6e-42fa-8069-986e0efb97aa', 'charlie', 'charlie@example.com', 'fake-public-key-012', NOW())
ON CONFLICT (id) DO UPDATE SET 
  username = EXCLUDED.username, 
  email = EXCLUDED.email, 
  public_key = EXCLUDED.public_key;

-- Seed contacts (link users to each other)
INSERT INTO contacts (user_id, contact_id)
VALUES 
  -- walleytroll <-> alice
  ('72e15210-ec81-4b84-9ab1-546f2e360221', '0f3db50f-7214-4d47-b74c-cd870e85bf89'),
  ('0f3db50f-7214-4d47-b74c-cd870e85bf89', '72e15210-ec81-4b84-9ab1-546f2e360221'),
  -- walleytroll <-> bob
  ('72e15210-ec81-4b84-9ab1-546f2e360221', '60f936d4-53db-4d9a-bc3a-c28a0026f4d5'),
  ('60f936d4-53db-4d9a-bc3a-c28a0026f4d5', '72e15210-ec81-4b84-9ab1-546f2e360221'),
  -- walleytroll <-> charlie
  ('72e15210-ec81-4b84-9ab1-546f2e360221', '760d8c1c-eb6e-42fa-8069-986e0efb97aa'),
  ('760d8c1c-eb6e-42fa-8069-986e0efb97aa', '72e15210-ec81-4b84-9ab1-546f2e360221'),
  -- alice <-> bob
  ('0f3db50f-7214-4d47-b74c-cd870e85bf89', '60f936d4-53db-4d9a-bc3a-c28a0026f4d5'),
  ('60f936d4-53db-4d9a-bc3a-c28a0026f4d5', '0f3db50f-7214-4d47-b74c-cd870e85bf89'),
  -- alice <-> charlie
  ('0f3db50f-7214-4d47-b74c-cd870e85bf89', '760d8c1c-eb6e-42fa-8069-986e0efb97aa'),
  ('760d8c1c-eb6e-42fa-8069-986e0efb97aa', '0f3db50f-7214-4d47-b74c-cd870e85bf89'),
  -- bob <-> charlie
  ('60f936d4-53db-4d9a-bc3a-c28a0026f4d5', '760d8c1c-eb6e-42fa-8069-986e0efb97aa'),
  ('760d8c1c-eb6e-42fa-8069-986e0efb97aa', '60f936d4-53db-4d9a-bc3a-c28a0026f4d5')
ON CONFLICT (user_id, contact_id) DO NOTHING;

-- Seed a conversation for testing (walleytroll and alice)
INSERT INTO conversations (id, is_group, name, created_at, updated_at)
VALUES 
  (gen_random_uuid(), false, 'Chat with Alice', NOW(), NOW());

-- Add participants to the conversation
INSERT INTO conversation_participants (conversation_id, user_id, unread_count)
SELECT id, '72e15210-ec81-4b84-9ab1-546f2e360221'::uuid, 0 FROM conversations WHERE name = 'Chat with Alice'
UNION
SELECT id, '0f3db50f-7214-4d47-b74c-cd870e85bf89'::uuid, 0 FROM conversations WHERE name = 'Chat with Alice';

-- Seed a test message
INSERT INTO messages (id, content, sender_id, conversation_id, timestamp)
SELECT gen_random_uuid(), 'Hey, how’s it going?', '72e15210-ec81-4b84-9ab1-546f2e360221', id, NOW() - INTERVAL '1 hour'
FROM conversations WHERE name = 'Chat with Alice';