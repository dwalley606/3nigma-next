CREATE EXTENSION IF NOT EXISTS "pgsodium";
CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    "username" text NOT NULL UNIQUE,
    "email" text NOT NULL UNIQUE,
    "phone_number" text,
    "public_key" text NOT NULL,
    "last_seen" timestamptz DEFAULT now(),
    "profile_pic_url" text,
    "created_at" timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."contact_requests" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "from_user_id" uuid REFERENCES auth.users(id),
    "to_user_id" uuid REFERENCES auth.users(id),
    "status" text NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
    "created_at" timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."contacts" (
    "user_id" uuid REFERENCES auth.users(id),
    "contact_id" uuid REFERENCES auth.users(id),
    PRIMARY KEY ("user_id", "contact_id"),
    CONSTRAINT "contacts_check" CHECK (user_id <> contact_id)
);

CREATE TABLE IF NOT EXISTS "public"."conversations" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "is_group" boolean DEFAULT false,
    "name" text,
    "last_message_id" uuid,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."conversation_participants" (
    "conversation_id" uuid REFERENCES conversations(id) ON DELETE CASCADE,
    "user_id" uuid REFERENCES auth.users(id),
    "unread_count" integer DEFAULT 0,
    PRIMARY KEY ("conversation_id", "user_id")
);

CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "content" text NOT NULL,
    "sender_id" uuid REFERENCES auth.users(id),
    "conversation_id" uuid REFERENCES conversations(id) ON DELETE CASCADE,
    "timestamp" timestamptz DEFAULT now(),
    "is_group_message" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "public"."groups" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "conversation_id" uuid UNIQUE REFERENCES conversations(id) ON DELETE CASCADE,
    "name" text NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."group_admins" (
    "group_id" uuid REFERENCES groups(id) ON DELETE CASCADE,
    "user_id" uuid REFERENCES auth.users(id),
    PRIMARY KEY ("group_id", "user_id")
);

CREATE TABLE IF NOT EXISTS "public"."encryption_keys" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "user_id" uuid UNIQUE REFERENCES auth.users(id),
    "public_key" text NOT NULL,
    "private_key" text NOT NULL
);

CREATE INDEX "idx_contact_requests_to_user_id" ON "public"."contact_requests" ("to_user_id");
CREATE INDEX "idx_conv_participants_user_id" ON "public"."conversation_participants" ("user_id");
CREATE INDEX "idx_messages_conversation_id" ON "public"."messages" ("conversation_id");
CREATE INDEX "idx_messages_timestamp" ON "public"."messages" ("timestamp");

ALTER TABLE ONLY "public"."conversations"
ADD CONSTRAINT "fk_last_message" FOREIGN KEY ("last_message_id") REFERENCES "public"."messages"("id") ON DELETE SET NULL;

ALTER TABLE "public"."conversation_participants" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see their conversations" ON "public"."conversation_participants"
FOR SELECT TO "authenticated" USING (auth.uid() = user_id);

GRANT USAGE ON SCHEMA "public" TO "postgres", "anon", "authenticated", "service_role";
GRANT SELECT ON ALL TABLES IN SCHEMA "public" TO "anon";
GRANT ALL ON ALL TABLES IN SCHEMA "public" TO "authenticated", "service_role";
ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT SELECT ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated", "service_role";