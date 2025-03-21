-- Seed data for users table
INSERT INTO public.users (id, username, email, phone_number, public_key, last_seen, profile_pic_url, created_at) VALUES
(gen_random_uuid(), 'alice', 'alice@example.com', '555-0101', 'alice_public_key_123', NOW() - INTERVAL '1 day', 'https://example.com/profiles/alice.jpg', NOW() - INTERVAL '5 days'),
(gen_random_uuid(), 'bob', 'bob@example.com', '555-0102', 'bob_public_key_456', NOW() - INTERVAL '2 hours', 'https://example.com/profiles/bob.jpg', NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'charlie', 'charlie@example.com', '555-0103', 'charlie_public_key_789', NOW() - INTERVAL '30 minutes', 'https://example.com/profiles/charlie.jpg', NOW() - INTERVAL '3 days');

-- Seed data for conversations table
INSERT INTO public.conversations (id, name, created_at) VALUES
(gen_random_uuid(), 'General Chat', NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Alice and Bob', NOW() - INTERVAL '1 day');

-- Seed data for conversation_participants table
INSERT INTO public.conversation_participants (conversation_id, user_id) VALUES
((SELECT id FROM public.conversations WHERE name = 'General Chat'), (SELECT id FROM public.users WHERE username = 'alice')),
((SELECT id FROM public.conversations WHERE name = 'General Chat'), (SELECT id FROM public.users WHERE username = 'bob')),
((SELECT id FROM public.conversations WHERE name = 'General Chat'), (SELECT id FROM public.users WHERE username = 'charlie')),
((SELECT id FROM public.conversations WHERE name = 'Alice and Bob'), (SELECT id FROM public.users WHERE username = 'alice')),
((SELECT id FROM public.conversations WHERE name = 'Alice and Bob'), (SELECT id FROM public.users WHERE username = 'bob'));

-- Seed data for groups table
INSERT INTO public.groups (id, conversation_id, name, created_at) VALUES
(gen_random_uuid(), (SELECT id FROM public.conversations WHERE name = 'General Chat'), 'Team Chat', NOW() - INTERVAL '2 days');

-- Seed data for group_admins table
INSERT INTO public.group_admins (group_id, user_id) VALUES
((SELECT id FROM public.groups WHERE name = 'Team Chat'), (SELECT id FROM public.users WHERE username = 'alice'));

-- Seed data for contacts table (added contact_id)
INSERT INTO public.contacts (user_id, contact_id) VALUES
((SELECT id FROM public.users WHERE username = 'alice'), (SELECT id FROM public.users WHERE username = 'bob')),
((SELECT id FROM public.users WHERE username = 'alice'), (SELECT id FROM public.users WHERE username = 'charlie'));

-- Seed data for contact_requests table
INSERT INTO public.contact_requests (id, from_user_id, to_user_id, status, created_at) VALUES
(gen_random_uuid(), (SELECT id FROM public.users WHERE username = 'alice'), (SELECT id FROM public.users WHERE username = 'charlie'), 'pending', NOW() - INTERVAL '1 day'),
(gen_random_uuid(), (SELECT id FROM public.users WHERE username = 'bob'), (SELECT id FROM public.users WHERE username = 'charlie'), 'accepted', NOW() - INTERVAL '2 days');

-- Seed data for encryption_keys table (added private_key)
INSERT INTO public.encryption_keys (id, user_id, public_key, private_key) VALUES
(gen_random_uuid(), (SELECT id FROM public.users WHERE username = 'alice'), 'alice_enc_key_123', 'alice_private_key_123'),
(gen_random_uuid(), (SELECT id FROM public.users WHERE username = 'bob'), 'bob_enc_key_456', 'bob_private_key_456'),
(gen_random_uuid(), (SELECT id FROM public.users WHERE username = 'charlie'), 'charlie_enc_key_789', 'charlie_private_key_789');