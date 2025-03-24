SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '08901e32-b582-4ee6-9af0-f464f63039b5', '{"action":"user_confirmation_requested","actor_id":"ce042a87-ab2a-407f-a4e9-94f573301401","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-03-10 04:57:03.096277+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb6d75df-7d16-4d50-a806-4949047f3b9e', '{"action":"user_signedup","actor_id":"ce042a87-ab2a-407f-a4e9-94f573301401","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-03-10 04:58:20.190026+00', ''),
	('00000000-0000-0000-0000-000000000000', '70d57ebb-055e-4f6b-9362-73e097007d75', '{"action":"login","actor_id":"ce042a87-ab2a-407f-a4e9-94f573301401","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 04:59:48.177282+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cfefdf0f-1819-4b26-987d-9a64802b3033', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"dwalley606@gmail.com","user_id":"ce042a87-ab2a-407f-a4e9-94f573301401","user_phone":""}}', '2025-03-10 05:02:23.767315+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f21659b1-6f10-4a43-ad14-99d776f14e07', '{"action":"user_signedup","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 05:05:34.408303+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e331f203-c3a5-4531-9743-2edee77fe6f1', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 05:05:34.412917+00', ''),
	('00000000-0000-0000-0000-000000000000', '6931f03a-e33c-4356-bc65-a259fd46d930', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 05:06:43.303295+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5c20d97-9f99-42f3-a56d-dda32819348e', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 05:11:02.516268+00', ''),
	('00000000-0000-0000-0000-000000000000', '361db886-4ba1-4d68-aa0d-ec44cb5bd6b9', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 05:26:03.823628+00', ''),
	('00000000-0000-0000-0000-000000000000', '3be36fac-eec2-47cd-92bf-9c1328665d9f', '{"action":"logout","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-03-10 05:42:54.130203+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2adae0e-d6c4-4932-acec-891ba9f0affd', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 05:42:59.233991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab2612bd-51d0-4805-bb65-1087fb13838e', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 12:26:50.398599+00', ''),
	('00000000-0000-0000-0000-000000000000', '926a4c68-5ed6-42c5-99d2-7fb860b28a82', '{"action":"logout","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-03-10 12:33:30.305785+00', ''),
	('00000000-0000-0000-0000-000000000000', '7fd43a74-4c27-4a5b-881e-0ee210b55e44', '{"action":"user_signedup","actor_id":"3adf350a-60ab-4a49-a5b9-5a1e4d31e156","actor_username":"test1@mail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 12:33:51.673169+00', ''),
	('00000000-0000-0000-0000-000000000000', 'faed4daf-d349-4433-ab45-cebe8c500fb7', '{"action":"login","actor_id":"3adf350a-60ab-4a49-a5b9-5a1e4d31e156","actor_username":"test1@mail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 12:33:51.678549+00', ''),
	('00000000-0000-0000-0000-000000000000', '8828d8b6-043f-4524-91c3-379068d16f07', '{"action":"user_signedup","actor_id":"9e731323-9247-4537-8c5d-dc7c760e2db6","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 12:35:06.954954+00', ''),
	('00000000-0000-0000-0000-000000000000', '0412f357-b1c8-419b-b57a-56b10e62eefc', '{"action":"login","actor_id":"9e731323-9247-4537-8c5d-dc7c760e2db6","actor_username":"test1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 12:35:06.958604+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f717ac4c-cb41-4ada-8fd5-a597999ffc7c', '{"action":"user_signedup","actor_id":"5f8b26c3-13ff-47a7-8a3f-597dd17afc42","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 12:46:51.646213+00', ''),
	('00000000-0000-0000-0000-000000000000', '9278da84-2270-456f-bda4-510ceb0e6c0e', '{"action":"login","actor_id":"5f8b26c3-13ff-47a7-8a3f-597dd17afc42","actor_username":"test2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 12:46:51.654867+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c6e8c29-c85d-426c-9cd0-dd99e362deeb', '{"action":"user_signedup","actor_id":"9751770c-d2ec-4513-8971-0a7b69b257f8","actor_username":"dudewtfbbq@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 13:16:51.95477+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dde1db29-3698-4aca-98d7-199a1a6a9b09', '{"action":"login","actor_id":"9751770c-d2ec-4513-8971-0a7b69b257f8","actor_username":"dudewtfbbq@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 13:16:51.960399+00', ''),
	('00000000-0000-0000-0000-000000000000', '565fdefd-d962-4605-af6f-e4d3d01ed014', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 13:28:42.535726+00', ''),
	('00000000-0000-0000-0000-000000000000', '9645f4b3-98d4-43e5-88de-33dae8ce4a05', '{"action":"logout","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-03-10 13:34:32.069304+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec41eea7-5874-46cc-944f-2d4b7cb09342', '{"action":"user_signedup","actor_id":"0848723d-e7c2-4d56-a539-a975121921aa","actor_username":"test7@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-10 13:45:40.562298+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c06bcb4-9bac-47ac-a3f3-dafe00346928', '{"action":"login","actor_id":"0848723d-e7c2-4d56-a539-a975121921aa","actor_username":"test7@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 13:45:40.567595+00', ''),
	('00000000-0000-0000-0000-000000000000', '771a574e-e4c6-440e-975e-033c77c47ee2', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 14:04:00.6632+00', ''),
	('00000000-0000-0000-0000-000000000000', '038921e1-43d9-477c-8964-6d40691aa90e', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 16:03:11.401517+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af837073-a366-4fa5-8d42-6200f4da81c0', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 16:04:37.909142+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a91d5cc5-1bdb-4bb4-a1e4-2e4c017e84bd', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-10 16:22:17.326104+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f5a6a47-b803-4545-a709-1bb95df0aa12', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 02:39:05.835679+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d5accd4-b3b2-419f-a0d2-181f777d4edf', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 02:39:05.839806+00', ''),
	('00000000-0000-0000-0000-000000000000', '390ecee7-9b11-456e-9d72-50483d43281b', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-11 02:39:07.971334+00', ''),
	('00000000-0000-0000-0000-000000000000', '9828f654-b83c-41e0-b04b-63dc306b517e', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-11 03:00:51.134629+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3f5fc8a-ab95-4939-9d3a-8c4acb92cec2', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-11 03:30:06.759356+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e0ab532-d375-4bba-b224-27152d5c92c7', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 04:28:20.228746+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f005b920-f2b6-4369-bae7-b77566680776', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 04:28:20.231197+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0fa0069-ae68-4f5a-95a6-d08a9cb44072', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 05:27:15.610836+00', ''),
	('00000000-0000-0000-0000-000000000000', '351d6a0a-e1e9-4372-aeba-63e1d3692df7', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 05:27:15.617457+00', ''),
	('00000000-0000-0000-0000-000000000000', '6003f8ff-ed40-4b24-bed9-a06200afab5c', '{"action":"logout","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-03-11 05:38:02.467543+00', ''),
	('00000000-0000-0000-0000-000000000000', '26baf27a-7b08-42a0-8016-d17fb4c33827', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-11 05:38:26.293741+00', ''),
	('00000000-0000-0000-0000-000000000000', '59312d0c-d9c2-4773-bd8a-e6c8a29734c8', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 06:37:39.467593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8f5ac6d-fe1f-4b99-828d-903c7c2b5ed6', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 06:37:39.469572+00', ''),
	('00000000-0000-0000-0000-000000000000', '749e331d-257b-405d-9e79-b2ad25fe87dc', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 07:36:39.488056+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ddbc3afd-8ec9-44fb-b172-829c337e065b', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 07:36:39.489883+00', ''),
	('00000000-0000-0000-0000-000000000000', '325e6dc5-87c5-41a1-9e16-0640234b6894', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 08:35:17.251804+00', ''),
	('00000000-0000-0000-0000-000000000000', '35fbcd24-89d6-46e2-9a9e-c45d4a6091b7', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 08:35:17.253323+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee7dbb42-2ff2-43a1-bd83-2a870744ecb1', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 09:34:15.209376+00', ''),
	('00000000-0000-0000-0000-000000000000', '00b28e4e-7987-42a8-8182-e2eea188f280', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 09:34:15.213248+00', ''),
	('00000000-0000-0000-0000-000000000000', '430e0c2e-5fe6-421a-8af9-c61de2f4d720', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 10:33:39.18896+00', ''),
	('00000000-0000-0000-0000-000000000000', '745b68cd-5970-434d-afad-433c7ab342b3', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 10:33:39.189841+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f19a9f9-651a-490e-99e5-f52c0255da03', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 11:32:39.047559+00', ''),
	('00000000-0000-0000-0000-000000000000', '35a5ddf6-9a1e-4abf-8245-2bf5dc61f04b', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 11:32:39.050326+00', ''),
	('00000000-0000-0000-0000-000000000000', '047df390-80f4-4576-b404-b28e9ef940f1', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 12:31:16.956028+00', ''),
	('00000000-0000-0000-0000-000000000000', '50e2c0a3-d009-4b69-96c0-b5a028dc772f', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 12:31:16.959903+00', ''),
	('00000000-0000-0000-0000-000000000000', '429b8f7e-6f83-47d6-bdad-a8d315c927d3', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 13:30:16.878456+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ef174eb-8357-4d81-826a-dda0d119637a', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-11 13:30:16.880957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e43544da-d46f-41d7-a4c6-02a3f83f6f0b', '{"action":"token_refreshed","actor_id":"0848723d-e7c2-4d56-a539-a975121921aa","actor_username":"test7@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 17:22:45.77444+00', ''),
	('00000000-0000-0000-0000-000000000000', '5dcd08a4-67bc-4a72-a7bb-a7fce8c753ce', '{"action":"token_revoked","actor_id":"0848723d-e7c2-4d56-a539-a975121921aa","actor_username":"test7@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 17:22:45.797806+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ab8fc77-60b1-4ee2-9c57-84ef4736c916', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-12 17:23:10.333546+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e2f0e6d-ce40-482d-89c4-bb629d7832fc', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 20:14:10.774344+00', ''),
	('00000000-0000-0000-0000-000000000000', '483b0b6f-cb17-46c1-a76b-c3fe0e82e790', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 20:14:10.777063+00', ''),
	('00000000-0000-0000-0000-000000000000', '84b4fa2d-988c-40ee-85ae-9d213ca3f9a5', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 22:33:35.475608+00', ''),
	('00000000-0000-0000-0000-000000000000', '38d381fd-df1c-4d87-b3f5-26c8023d5177', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-12 22:33:35.476463+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9d6f94c-2fcf-435c-b4c9-79851ee05ea8', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-12 22:33:51.972415+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3b93893-9dee-4fee-a2e8-6eaa2a43c99c', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-14 23:41:37.574773+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2545ebe-30c8-4818-b4b1-9f4fbaf53178', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-14 23:44:39.538476+00', ''),
	('00000000-0000-0000-0000-000000000000', '604cb6e5-c2ad-4c56-95cf-957d820e65bb', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 00:45:49.966355+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdb02b44-2bfd-49b8-ac5e-61b46afc4f79', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 00:45:49.96846+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8a94d43-41cf-447f-839b-90587f4f5a35', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 00:46:22.112499+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fbc442c-f201-4202-a56c-f85b12c98684', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 00:46:28.781958+00', ''),
	('00000000-0000-0000-0000-000000000000', '79882247-92eb-4282-b99b-494ef809e666', '{"action":"user_signedup","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-15 01:07:41.274538+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a2a1572-3c5f-4641-aa91-d65bde46e503', '{"action":"login","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-15 01:07:41.283758+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a2632a85-35f7-4ba3-8dde-c1e657f9e29f', '{"action":"token_refreshed","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 21:53:57.839352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f37d99f2-e6b5-4a01-98c8-0bf9c3dba693', '{"action":"token_revoked","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-15 21:53:57.857157+00', ''),
	('00000000-0000-0000-0000-000000000000', '06b28517-eccc-4e83-8ac0-3ae8e6eaa26a', '{"action":"user_repeated_signup","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-03-16 02:31:31.891351+00', ''),
	('00000000-0000-0000-0000-000000000000', '74aed2ec-7205-4d14-a7c1-d52879882360', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 02:33:22.73675+00', ''),
	('00000000-0000-0000-0000-000000000000', '7eae144f-50fe-4323-a779-fdb85431bfc5', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 03:40:24.826248+00', ''),
	('00000000-0000-0000-0000-000000000000', '0dc5d637-50f3-49f3-9f77-e8d8807e645e', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 03:40:24.830043+00', ''),
	('00000000-0000-0000-0000-000000000000', '180cb3bd-6151-4fe7-9fc7-c62ef4f7177c', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 03:45:57.220929+00', ''),
	('00000000-0000-0000-0000-000000000000', '253fe0e7-a811-43da-b2df-61a78eb6a61a', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 04:03:34.136692+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce5c320b-4d2c-4467-b5c0-4a8fab6ef6dc', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 04:10:32.339813+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd43a1b88-ce53-4a2b-9b93-2e2fc3254d22', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 06:21:52.865985+00', ''),
	('00000000-0000-0000-0000-000000000000', '1538af99-fa63-4531-89db-3e2d74806993', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 06:21:52.868143+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1c5abae-6faf-4bc0-b08e-83068e3f42cb', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 06:21:53.561109+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e8d186a-87a7-40ee-acde-197b232a4677', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 06:21:57.574477+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c17370c8-6af4-487e-af49-7e0954adf54f', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 07:20:30.835399+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f32d3eea-2649-4e40-8903-8c745c048c55', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 07:20:30.844376+00', ''),
	('00000000-0000-0000-0000-000000000000', '043e1322-01dc-4cfe-a8c5-3243f45f2169', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 08:19:00.774775+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ca25fe4-b7b5-4356-8c38-14c3e74f9106', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 08:19:00.776809+00', ''),
	('00000000-0000-0000-0000-000000000000', '4282d9c9-d653-4014-8c9e-7934c6bc2850', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 09:17:54.702013+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ce76310-dace-409f-b43f-558cdca130ac', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 09:17:54.704356+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d47950c-3c17-42c6-93e8-f6b650881232', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 10:16:30.581152+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fed6cb63-8810-424f-b1ce-e8e656d4e2eb', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 10:16:30.584456+00', ''),
	('00000000-0000-0000-0000-000000000000', '91f86ccb-e944-40bd-80f8-98db20f2821d', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 11:15:54.540088+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdb58e7b-e564-4a48-ab94-e8d01acfde66', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 11:15:54.540957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c25fd90b-df83-473d-b8fc-d68f8dfd3b21', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 12:14:32.448587+00', ''),
	('00000000-0000-0000-0000-000000000000', '88403f0a-c09f-420c-ae07-db251a4bffca', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 12:14:32.449469+00', ''),
	('00000000-0000-0000-0000-000000000000', '9142e9a5-93e9-4f5b-aa0b-c47e42e3b21b', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 13:13:54.35146+00', ''),
	('00000000-0000-0000-0000-000000000000', '5641718f-dbe3-4451-9747-f020e92f4c4b', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 13:13:54.352985+00', ''),
	('00000000-0000-0000-0000-000000000000', '11114b7e-add9-4b15-a47f-2f7f19a6fb41', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 14:12:54.33678+00', ''),
	('00000000-0000-0000-0000-000000000000', '19d0dd5b-9fd8-4e3d-bc08-56b417f469b3', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 14:12:54.337679+00', ''),
	('00000000-0000-0000-0000-000000000000', '0fa2e7fd-d078-4bef-963f-0033f9e57cc6', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 15:11:54.288013+00', ''),
	('00000000-0000-0000-0000-000000000000', '558de861-fad7-49c0-856b-6d7ba32d347f', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 15:11:54.291771+00', ''),
	('00000000-0000-0000-0000-000000000000', '7059030d-4c19-407a-834a-f1ee17e6c341', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 16:10:54.176522+00', ''),
	('00000000-0000-0000-0000-000000000000', '84377b5f-9f59-4d15-8a01-e96beaa3eceb', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 16:10:54.178622+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f413cc9d-94e6-4479-8859-e6b7ff84a0a2', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 17:09:54.12115+00', ''),
	('00000000-0000-0000-0000-000000000000', '61dba1bb-fd42-48d7-97ba-98cd0245e283', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 17:09:54.123764+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e937e3d3-076e-419c-aaec-e3719bbc78f5', '{"action":"token_refreshed","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 17:29:14.979576+00', ''),
	('00000000-0000-0000-0000-000000000000', '46c598bd-4a30-47bf-bf95-79b53e3a29fd', '{"action":"token_revoked","actor_id":"4f359867-230a-4303-968c-f2414f4ae463","actor_username":"test2@example.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 17:29:14.982841+00', ''),
	('00000000-0000-0000-0000-000000000000', '6181d918-8fc3-423e-8e94-1b60e4dfa1b3', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 17:29:24.659256+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f375383-dff4-4fb9-b2ac-3a4d13b54d77', '{"action":"login","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-16 17:52:02.770059+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b7327ea-bf25-46e1-84cd-d5b4fbabd5d6', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 18:08:54.003904+00', ''),
	('00000000-0000-0000-0000-000000000000', '914a851d-ec7d-4598-857b-b33b1657cfbc', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-16 18:08:54.006042+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa247cd3-9bff-4c2e-bddd-cac1e826c9fa', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-22 13:17:50.818723+00', ''),
	('00000000-0000-0000-0000-000000000000', '049f1833-c543-4693-a4c8-4100351b7b58', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-22 13:17:50.834713+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8af955f-65c4-47f8-b371-18533159af82', '{"action":"token_refreshed","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-22 14:36:33.944526+00', ''),
	('00000000-0000-0000-0000-000000000000', '2750e4f3-75cb-43ce-875c-3c1eb9b9915c', '{"action":"token_revoked","actor_id":"ad6de953-5cb4-472a-9601-15ccf93662bd","actor_username":"dwalley606@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-03-22 14:36:33.948472+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ad6de953-5cb4-472a-9601-15ccf93662bd', 'authenticated', 'authenticated', 'dwalley606@gmail.com', '$2a$10$Scm7/KEKTmGpkqumVEz/7.iPD79pjqcY2vENFtIYBBRfo7I/SZZ8i', '2025-03-10 05:05:34.408954+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-16 17:52:02.772849+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ad6de953-5cb4-472a-9601-15ccf93662bd", "email": "dwalley606@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 05:05:34.399953+00', '2025-03-22 14:36:33.958405+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3adf350a-60ab-4a49-a5b9-5a1e4d31e156', 'authenticated', 'authenticated', 'test1@mail.com', '$2a$10$pSFZdsl5SUGtLs4uTv.ngOiRRXY9y7uJlG2LX0ynRIJ/WReAkVQUC', '2025-03-10 12:33:51.673566+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-10 12:33:51.679041+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "3adf350a-60ab-4a49-a5b9-5a1e4d31e156", "email": "test1@mail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 12:33:51.652711+00', '2025-03-10 12:33:51.68223+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5f8b26c3-13ff-47a7-8a3f-597dd17afc42', 'authenticated', 'authenticated', 'test2@gmail.com', '$2a$10$I5UO3BzvKf7WqqFyGv4cp.KZSPHYPA8Dag5IW95di.2wigalIOQkq', '2025-03-10 12:46:51.647392+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-10 12:46:51.655412+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5f8b26c3-13ff-47a7-8a3f-597dd17afc42", "email": "test2@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 12:46:51.636568+00', '2025-03-10 12:46:51.658485+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0848723d-e7c2-4d56-a539-a975121921aa', 'authenticated', 'authenticated', 'test7@gmail.com', '$2a$10$vnewzd9asUaxOVbz22cgVOkygvjlEzLzqGrqAjd2.1MyiEKehI5Ha', '2025-03-10 13:45:40.562928+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-10 13:45:40.568068+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "0848723d-e7c2-4d56-a539-a975121921aa", "email": "test7@gmail.com", "username": "test7", "phone_number": "", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 13:45:40.555269+00', '2025-03-12 17:22:45.826426+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '9e731323-9247-4537-8c5d-dc7c760e2db6', 'authenticated', 'authenticated', 'test1@gmail.com', '$2a$10$o50lgohD0ljNYoRq0ntGz.pjZLSb71h.U54nBLbSJZ7StKhLy1xeC', '2025-03-10 12:35:06.955558+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-10 12:35:06.959075+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9e731323-9247-4537-8c5d-dc7c760e2db6", "email": "test1@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 12:35:06.943718+00', '2025-03-10 12:35:06.962786+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '4f359867-230a-4303-968c-f2414f4ae463', 'authenticated', 'authenticated', 'test2@example.com', '$2a$10$gI7H5Yprg11OyiyHCNEiQu4MM1N6ytv9o2WniB56tpFKpag59/ZHa', '2025-03-15 01:07:41.276558+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-15 01:07:41.284248+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4f359867-230a-4303-968c-f2414f4ae463", "email": "test2@example.com", "username": "testuser2", "phone_number": "", "email_verified": true, "phone_verified": false}', NULL, '2025-03-15 01:07:41.25256+00', '2025-03-16 17:29:14.987408+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '9751770c-d2ec-4513-8971-0a7b69b257f8', 'authenticated', 'authenticated', 'dudewtfbbq@gmail.com', '$2a$10$UAWs.0Megoo903VqHRoGlOyIpVxcyKiCYHHatencyUt1eEH2Ai1CW', '2025-03-10 13:16:51.956576+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-10 13:16:51.960914+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9751770c-d2ec-4513-8971-0a7b69b257f8", "email": "dudewtfbbq@gmail.com", "username": "doosh606", "phone_number": "", "email_verified": true, "phone_verified": false}', NULL, '2025-03-10 13:16:51.945157+00', '2025-03-10 13:16:51.96375+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('ad6de953-5cb4-472a-9601-15ccf93662bd', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '{"sub": "ad6de953-5cb4-472a-9601-15ccf93662bd", "email": "dwalley606@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 05:05:34.405762+00', '2025-03-10 05:05:34.405813+00', '2025-03-10 05:05:34.405813+00', '605b4cb0-f4da-4f1b-a811-32814cf725ca'),
	('3adf350a-60ab-4a49-a5b9-5a1e4d31e156', '3adf350a-60ab-4a49-a5b9-5a1e4d31e156', '{"sub": "3adf350a-60ab-4a49-a5b9-5a1e4d31e156", "email": "test1@mail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 12:33:51.667802+00', '2025-03-10 12:33:51.667847+00', '2025-03-10 12:33:51.667847+00', 'b3391517-10b9-4698-80ea-630cd1181277'),
	('9e731323-9247-4537-8c5d-dc7c760e2db6', '9e731323-9247-4537-8c5d-dc7c760e2db6', '{"sub": "9e731323-9247-4537-8c5d-dc7c760e2db6", "email": "test1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 12:35:06.95132+00', '2025-03-10 12:35:06.951367+00', '2025-03-10 12:35:06.951367+00', '29b2fe8a-0f4e-4b90-a20f-da76c28537e4'),
	('5f8b26c3-13ff-47a7-8a3f-597dd17afc42', '5f8b26c3-13ff-47a7-8a3f-597dd17afc42', '{"sub": "5f8b26c3-13ff-47a7-8a3f-597dd17afc42", "email": "test2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 12:46:51.642005+00', '2025-03-10 12:46:51.642049+00', '2025-03-10 12:46:51.642049+00', '04066fda-7472-4180-9479-e16626edaeee'),
	('9751770c-d2ec-4513-8971-0a7b69b257f8', '9751770c-d2ec-4513-8971-0a7b69b257f8', '{"sub": "9751770c-d2ec-4513-8971-0a7b69b257f8", "email": "dudewtfbbq@gmail.com", "username": "doosh606", "phone_number": "", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 13:16:51.952149+00', '2025-03-10 13:16:51.952202+00', '2025-03-10 13:16:51.952202+00', '78dc7f83-2eb2-45b8-80ba-57434f9d8c39'),
	('0848723d-e7c2-4d56-a539-a975121921aa', '0848723d-e7c2-4d56-a539-a975121921aa', '{"sub": "0848723d-e7c2-4d56-a539-a975121921aa", "email": "test7@gmail.com", "username": "test7", "phone_number": "", "email_verified": false, "phone_verified": false}', 'email', '2025-03-10 13:45:40.559294+00', '2025-03-10 13:45:40.559338+00', '2025-03-10 13:45:40.559338+00', '16663c18-72b6-4ac1-9a4f-f80a725065ce'),
	('4f359867-230a-4303-968c-f2414f4ae463', '4f359867-230a-4303-968c-f2414f4ae463', '{"sub": "4f359867-230a-4303-968c-f2414f4ae463", "email": "test2@example.com", "username": "testuser2", "phone_number": "", "email_verified": false, "phone_verified": false}', 'email', '2025-03-15 01:07:41.269852+00', '2025-03-15 01:07:41.269912+00', '2025-03-15 01:07:41.269912+00', '6750c895-4a28-46f0-a2df-97a5123ec74a');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('3be9997d-e9eb-455d-8b29-e5151e57dde5', '3adf350a-60ab-4a49-a5b9-5a1e4d31e156', '2025-03-10 12:33:51.679127+00', '2025-03-10 12:33:51.679127+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('18c3e471-489f-4eb1-afda-54209c8e5735', '9e731323-9247-4537-8c5d-dc7c760e2db6', '2025-03-10 12:35:06.959156+00', '2025-03-10 12:35:06.959156+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('7a45bf53-db5e-4424-9403-e28113b9ddc4', '5f8b26c3-13ff-47a7-8a3f-597dd17afc42', '2025-03-10 12:46:51.655489+00', '2025-03-10 12:46:51.655489+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('74899dad-65a5-4cd2-a82a-bde2102f8c02', '9751770c-d2ec-4513-8971-0a7b69b257f8', '2025-03-10 13:16:51.960982+00', '2025-03-10 13:16:51.960982+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('fccbe435-91b5-4865-bca9-147d2fa0a2cf', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-12 17:23:10.338041+00', '2025-03-12 22:33:35.482109+00', NULL, 'aal1', NULL, '2025-03-12 22:33:35.48204', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '199.15.184.179', NULL),
	('fb8ca4cf-0c2d-425b-8766-2c3fdae57414', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-14 23:41:37.589888+00', '2025-03-14 23:41:37.589888+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('13b0ecd7-cdac-4860-bdd6-66d10a3992ec', '4f359867-230a-4303-968c-f2414f4ae463', '2025-03-15 01:07:41.284318+00', '2025-03-16 17:29:14.989222+00', NULL, 'aal1', NULL, '2025-03-16 17:29:14.989143', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('7d59ade7-2081-46f1-b5f8-0f15c341823d', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 17:29:24.660753+00', '2025-03-16 17:29:24.660753+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('14b99207-ced1-4030-9c86-02614a3c7773', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-14 23:44:39.542269+00', '2025-03-15 00:46:28.783099+00', NULL, 'aal1', NULL, '2025-03-15 00:46:28.783021', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36', '73.172.90.33', NULL),
	('cae69dcf-6a6a-4264-9b7e-5074fef4184b', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-11 05:38:26.295064+00', '2025-03-11 13:30:16.887558+00', NULL, 'aal1', NULL, '2025-03-11 13:30:16.887489', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('951b548d-fa35-4a05-a78d-f628dfb73475', '0848723d-e7c2-4d56-a539-a975121921aa', '2025-03-10 13:45:40.56814+00', '2025-03-12 17:22:45.833133+00', NULL, 'aal1', NULL, '2025-03-12 17:22:45.833042', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '199.15.184.179', NULL),
	('a81afc2b-2f24-4f45-92c1-f50104e7beba', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 02:33:22.738429+00', '2025-03-16 03:40:24.841453+00', NULL, 'aal1', NULL, '2025-03-16 03:40:24.84135', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('7947663e-cf53-46df-81aa-32a27de79706', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 03:45:57.222548+00', '2025-03-16 03:45:57.222548+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('c73498d1-a4c5-4237-a5e1-d34f1616948c', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 04:03:34.13901+00', '2025-03-16 04:03:34.13901+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('8238ad71-e9b3-4005-818c-b92fa72bf7ee', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 17:52:02.772933+00', '2025-03-16 17:52:02.772933+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('a0e8fbe0-d3c2-4003-9e76-b4f88ddfa8a5', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 04:10:32.341613+00', '2025-03-16 06:21:53.562312+00', NULL, 'aal1', NULL, '2025-03-16 06:21:53.562234', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('9495d715-8896-415b-802e-24f648d479f8', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-16 06:21:57.575211+00', '2025-03-16 18:08:54.013516+00', NULL, 'aal1', NULL, '2025-03-16 18:08:54.013448', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL),
	('cafbd780-124b-462b-8112-03bad7410194', 'ad6de953-5cb4-472a-9601-15ccf93662bd', '2025-03-12 22:33:51.973155+00', '2025-03-22 14:36:33.960154+00', NULL, 'aal1', NULL, '2025-03-22 14:36:33.960081', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', '73.172.90.33', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('3be9997d-e9eb-455d-8b29-e5151e57dde5', '2025-03-10 12:33:51.682688+00', '2025-03-10 12:33:51.682688+00', 'password', 'e96e51c9-390f-4b84-b9ba-7d04fa1146c4'),
	('18c3e471-489f-4eb1-afda-54209c8e5735', '2025-03-10 12:35:06.963231+00', '2025-03-10 12:35:06.963231+00', 'password', 'd569b8ef-1e98-46e3-b94d-8a66bf891ba3'),
	('7a45bf53-db5e-4424-9403-e28113b9ddc4', '2025-03-10 12:46:51.658911+00', '2025-03-10 12:46:51.658911+00', 'password', '0d7355a4-72c9-4c1b-962c-943c48c647a8'),
	('74899dad-65a5-4cd2-a82a-bde2102f8c02', '2025-03-10 13:16:51.964175+00', '2025-03-10 13:16:51.964175+00', 'password', '15cf3d36-1699-4c15-af06-91c22026512a'),
	('951b548d-fa35-4a05-a78d-f628dfb73475', '2025-03-10 13:45:40.571632+00', '2025-03-10 13:45:40.571632+00', 'password', '6f50e9c7-6768-4fac-8f80-96223ef66e52'),
	('cae69dcf-6a6a-4264-9b7e-5074fef4184b', '2025-03-11 05:38:26.299812+00', '2025-03-11 05:38:26.299812+00', 'password', '2ced8f99-4224-4d6e-be4a-80e3f2e7bfc3'),
	('fccbe435-91b5-4865-bca9-147d2fa0a2cf', '2025-03-12 17:23:10.343824+00', '2025-03-12 17:23:10.343824+00', 'password', '7dfa788c-af0c-4779-b394-c9930b0014b7'),
	('cafbd780-124b-462b-8112-03bad7410194', '2025-03-12 22:33:51.98085+00', '2025-03-12 22:33:51.98085+00', 'password', '9f4e4936-a9a9-4ca5-bb56-801f2011ec3f'),
	('fb8ca4cf-0c2d-425b-8766-2c3fdae57414', '2025-03-14 23:41:37.616032+00', '2025-03-14 23:41:37.616032+00', 'password', '14b9b0c4-c2f4-4469-bffb-6c957759aff9'),
	('14b99207-ced1-4030-9c86-02614a3c7773', '2025-03-14 23:44:39.55925+00', '2025-03-14 23:44:39.55925+00', 'password', 'c368cdc2-f5dd-401d-83c5-05c70b81e677'),
	('13b0ecd7-cdac-4860-bdd6-66d10a3992ec', '2025-03-15 01:07:41.29063+00', '2025-03-15 01:07:41.29063+00', 'password', 'be71e90e-a70d-46ba-96cc-c1723f593d64'),
	('a81afc2b-2f24-4f45-92c1-f50104e7beba', '2025-03-16 02:33:22.752428+00', '2025-03-16 02:33:22.752428+00', 'password', '69b5eb37-2875-4250-9111-f250fddb70fc'),
	('7947663e-cf53-46df-81aa-32a27de79706', '2025-03-16 03:45:57.241255+00', '2025-03-16 03:45:57.241255+00', 'password', '6d9c55b1-205b-4316-b594-424378a42d66'),
	('c73498d1-a4c5-4237-a5e1-d34f1616948c', '2025-03-16 04:03:34.145812+00', '2025-03-16 04:03:34.145812+00', 'password', '9db4351a-0036-4af6-9093-ef1edd8ee3e7'),
	('a0e8fbe0-d3c2-4003-9e76-b4f88ddfa8a5', '2025-03-16 04:10:32.348321+00', '2025-03-16 04:10:32.348321+00', 'password', '41c87b7e-9317-4785-8020-f5acf345ee62'),
	('9495d715-8896-415b-802e-24f648d479f8', '2025-03-16 06:21:57.578598+00', '2025-03-16 06:21:57.578598+00', 'password', '7e0e85b1-050e-4fb0-8258-c8c3ab3510fd'),
	('7d59ade7-2081-46f1-b5f8-0f15c341823d', '2025-03-16 17:29:24.667659+00', '2025-03-16 17:29:24.667659+00', 'password', '683a31bf-fb1c-4d01-a71c-5818f29cd65f'),
	('8238ad71-e9b3-4005-818c-b92fa72bf7ee', '2025-03-16 17:52:02.783855+00', '2025-03-16 17:52:02.783855+00', 'password', '7d3cbdb2-0308-4a6d-8926-15567276e712');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 9, 'pCTupkxYlyHk2IA5EpEZCA', '3adf350a-60ab-4a49-a5b9-5a1e4d31e156', false, '2025-03-10 12:33:51.680328+00', '2025-03-10 12:33:51.680328+00', NULL, '3be9997d-e9eb-455d-8b29-e5151e57dde5'),
	('00000000-0000-0000-0000-000000000000', 10, 'uou-BNXw2MZKf4qewzyLBw', '9e731323-9247-4537-8c5d-dc7c760e2db6', false, '2025-03-10 12:35:06.960852+00', '2025-03-10 12:35:06.960852+00', NULL, '18c3e471-489f-4eb1-afda-54209c8e5735'),
	('00000000-0000-0000-0000-000000000000', 11, '_MovgCZ1cOFDUJJrXnSCMw', '5f8b26c3-13ff-47a7-8a3f-597dd17afc42', false, '2025-03-10 12:46:51.656464+00', '2025-03-10 12:46:51.656464+00', NULL, '7a45bf53-db5e-4424-9403-e28113b9ddc4'),
	('00000000-0000-0000-0000-000000000000', 12, 'OOd3hDErbPpioRosleEXzQ', '9751770c-d2ec-4513-8971-0a7b69b257f8', false, '2025-03-10 13:16:51.961996+00', '2025-03-10 13:16:51.961996+00', NULL, '74899dad-65a5-4cd2-a82a-bde2102f8c02'),
	('00000000-0000-0000-0000-000000000000', 25, 'I4dqt7gTmHQsw4qlfqmJpw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 05:38:26.298201+00', '2025-03-11 06:37:39.470049+00', NULL, 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 26, '279TUw4-d0E0ZbmjCmFUAQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 06:37:39.4711+00', '2025-03-11 07:36:39.490427+00', 'I4dqt7gTmHQsw4qlfqmJpw', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 27, 'zF8JhXEbdt1FwuQA5tNwyQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 07:36:39.49153+00', '2025-03-11 08:35:17.253828+00', '279TUw4-d0E0ZbmjCmFUAQ', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 28, 't0sB_4-VL4fJ-Ng-ZBBh8Q', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 08:35:17.255304+00', '2025-03-11 09:34:15.213741+00', 'zF8JhXEbdt1FwuQA5tNwyQ', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 29, 'E7awbq_LpScDBZib2Rt7dg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 09:34:15.215578+00', '2025-03-11 10:33:39.190358+00', 't0sB_4-VL4fJ-Ng-ZBBh8Q', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 30, 'OryQGpD9atbZVDFitrIc4g', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 10:33:39.192083+00', '2025-03-11 11:32:39.050864+00', 'E7awbq_LpScDBZib2Rt7dg', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 31, 'ITt9K3CC3ZZ9xOR9UwDbTw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 11:32:39.05323+00', '2025-03-11 12:31:16.960423+00', 'OryQGpD9atbZVDFitrIc4g', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 32, 'OfAqf7QT5sN3sOxAJoJ2cA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-11 12:31:16.962624+00', '2025-03-11 13:30:16.881478+00', 'ITt9K3CC3ZZ9xOR9UwDbTw', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 33, 'd8O2oVaWBHVFbKaiffLdzQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-11 13:30:16.884816+00', '2025-03-11 13:30:16.884816+00', 'OfAqf7QT5sN3sOxAJoJ2cA', 'cae69dcf-6a6a-4264-9b7e-5074fef4184b'),
	('00000000-0000-0000-0000-000000000000', 14, '6Ger_fbfLerUaeTSStTTRQ', '0848723d-e7c2-4d56-a539-a975121921aa', true, '2025-03-10 13:45:40.56911+00', '2025-03-12 17:22:45.798984+00', NULL, '951b548d-fa35-4a05-a78d-f628dfb73475'),
	('00000000-0000-0000-0000-000000000000', 34, 'vpijBg5kQx8_VzzPlXlwQA', '0848723d-e7c2-4d56-a539-a975121921aa', false, '2025-03-12 17:22:45.820082+00', '2025-03-12 17:22:45.820082+00', '6Ger_fbfLerUaeTSStTTRQ', '951b548d-fa35-4a05-a78d-f628dfb73475'),
	('00000000-0000-0000-0000-000000000000', 35, 'xCjvPecKNYQ5fRmfiK2xVw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-12 17:23:10.342625+00', '2025-03-12 20:14:10.777575+00', NULL, 'fccbe435-91b5-4865-bca9-147d2fa0a2cf'),
	('00000000-0000-0000-0000-000000000000', 36, 'dlrZno_JMMfx1fdqrs_xsg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-12 20:14:10.778637+00', '2025-03-12 22:33:35.476952+00', 'xCjvPecKNYQ5fRmfiK2xVw', 'fccbe435-91b5-4865-bca9-147d2fa0a2cf'),
	('00000000-0000-0000-0000-000000000000', 37, 'QKHYLKu7EdJMDFrkwVTzlw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-12 22:33:35.479365+00', '2025-03-12 22:33:35.479365+00', 'dlrZno_JMMfx1fdqrs_xsg', 'fccbe435-91b5-4865-bca9-147d2fa0a2cf'),
	('00000000-0000-0000-0000-000000000000', 39, 'VFsr5i9hKkqGBaRcfoM6uw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-14 23:41:37.60018+00', '2025-03-14 23:41:37.60018+00', NULL, 'fb8ca4cf-0c2d-425b-8766-2c3fdae57414'),
	('00000000-0000-0000-0000-000000000000', 40, '929Y4EuFkCw9GtvXzoQIsg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-14 23:44:39.547628+00', '2025-03-15 00:45:49.969764+00', NULL, '14b99207-ced1-4030-9c86-02614a3c7773'),
	('00000000-0000-0000-0000-000000000000', 41, 'M85JHq5-IIwtqbems-8KPA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-15 00:45:49.974681+00', '2025-03-15 00:45:49.974681+00', '929Y4EuFkCw9GtvXzoQIsg', '14b99207-ced1-4030-9c86-02614a3c7773'),
	('00000000-0000-0000-0000-000000000000', 42, 'Hxdzu8_P6Z3B_gVCDfXcSA', '4f359867-230a-4303-968c-f2414f4ae463', true, '2025-03-15 01:07:41.285897+00', '2025-03-15 21:53:57.85775+00', NULL, '13b0ecd7-cdac-4860-bdd6-66d10a3992ec'),
	('00000000-0000-0000-0000-000000000000', 44, '9W2GCUqmE_sh3zEOeRYKJA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 02:33:22.746017+00', '2025-03-16 03:40:24.830569+00', NULL, 'a81afc2b-2f24-4f45-92c1-f50104e7beba'),
	('00000000-0000-0000-0000-000000000000', 45, 'EGXY8SUBPGu2UDO_xb5ObA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 03:40:24.8345+00', '2025-03-16 03:40:24.8345+00', '9W2GCUqmE_sh3zEOeRYKJA', 'a81afc2b-2f24-4f45-92c1-f50104e7beba'),
	('00000000-0000-0000-0000-000000000000', 46, '-_lFyz2q4NTtU0oxFQBljQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 03:45:57.230833+00', '2025-03-16 03:45:57.230833+00', NULL, '7947663e-cf53-46df-81aa-32a27de79706'),
	('00000000-0000-0000-0000-000000000000', 47, '9J_GYZrGLcKuWjXmdsw-yg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 04:03:34.141469+00', '2025-03-16 04:03:34.141469+00', NULL, 'c73498d1-a4c5-4237-a5e1-d34f1616948c'),
	('00000000-0000-0000-0000-000000000000', 48, '9cb-hW4vmbzbZg45-5Ig7Q', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 04:10:32.343848+00', '2025-03-16 06:21:52.868609+00', NULL, 'a0e8fbe0-d3c2-4003-9e76-b4f88ddfa8a5'),
	('00000000-0000-0000-0000-000000000000', 49, 'K7RRJKJ-VzfsJkQtI1bMhQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 06:21:52.873813+00', '2025-03-16 06:21:52.873813+00', '9cb-hW4vmbzbZg45-5Ig7Q', 'a0e8fbe0-d3c2-4003-9e76-b4f88ddfa8a5'),
	('00000000-0000-0000-0000-000000000000', 50, '12vG4F4eb9E5ovrB2gch3Q', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 06:21:57.576687+00', '2025-03-16 07:20:30.845283+00', NULL, '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 51, 'cHnAYiuNCG2i2IaGDZDEHQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 07:20:30.850192+00', '2025-03-16 08:19:00.77729+00', '12vG4F4eb9E5ovrB2gch3Q', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 52, '21HG8MFd1bq5Z-sy0D9YIA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 08:19:00.779333+00', '2025-03-16 09:17:54.705511+00', 'cHnAYiuNCG2i2IaGDZDEHQ', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 53, 'Rea4TF_p_qI2pWCehcvoCA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 09:17:54.706845+00', '2025-03-16 10:16:30.584958+00', '21HG8MFd1bq5Z-sy0D9YIA', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 54, 'hzGmxoZCT3A-KPR66uH_NQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 10:16:30.586174+00', '2025-03-16 11:15:54.541425+00', 'Rea4TF_p_qI2pWCehcvoCA', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 55, 'I5m7fDbvqlNdhV8HMYi7dw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 11:15:54.542727+00', '2025-03-16 12:14:32.44998+00', 'hzGmxoZCT3A-KPR66uH_NQ', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 56, 'xdVgFtVr4YFv6-V-CYLiow', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 12:14:32.451416+00', '2025-03-16 13:13:54.353445+00', 'I5m7fDbvqlNdhV8HMYi7dw', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 57, 'FEDXF0jMT04KNrqBGllCQw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 13:13:54.355869+00', '2025-03-16 14:12:54.338188+00', 'xdVgFtVr4YFv6-V-CYLiow', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 58, '-bZRCoMqsndrSe4x5SjMjg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 14:12:54.339505+00', '2025-03-16 15:11:54.292253+00', 'FEDXF0jMT04KNrqBGllCQw', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 59, '_XPit9yXGQ-sZWxBpIKC8g', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 15:11:54.29479+00', '2025-03-16 16:10:54.17911+00', '-bZRCoMqsndrSe4x5SjMjg', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 60, 'QHH5kunxkLc1lv6JFkcPKQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 16:10:54.181508+00', '2025-03-16 17:09:54.124216+00', '_XPit9yXGQ-sZWxBpIKC8g', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 43, '4P5aHX08BNLS4rdugQNlyg', '4f359867-230a-4303-968c-f2414f4ae463', true, '2025-03-15 21:53:57.867085+00', '2025-03-16 17:29:14.983311+00', 'Hxdzu8_P6Z3B_gVCDfXcSA', '13b0ecd7-cdac-4860-bdd6-66d10a3992ec'),
	('00000000-0000-0000-0000-000000000000', 62, 'Jf8rgTi_TrWSF6rA_IpN4g', '4f359867-230a-4303-968c-f2414f4ae463', false, '2025-03-16 17:29:14.986392+00', '2025-03-16 17:29:14.986392+00', '4P5aHX08BNLS4rdugQNlyg', '13b0ecd7-cdac-4860-bdd6-66d10a3992ec'),
	('00000000-0000-0000-0000-000000000000', 63, '43wvN-fEZHjtReSrM8vIGQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 17:29:24.666456+00', '2025-03-16 17:29:24.666456+00', NULL, '7d59ade7-2081-46f1-b5f8-0f15c341823d'),
	('00000000-0000-0000-0000-000000000000', 64, 'fs1vffhfOKf-vYI9jUM4rw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 17:52:02.777991+00', '2025-03-16 17:52:02.777991+00', NULL, '8238ad71-e9b3-4005-818c-b92fa72bf7ee'),
	('00000000-0000-0000-0000-000000000000', 61, '5qEG0hfXEsHMr0vyit7Htw', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-16 17:09:54.128569+00', '2025-03-16 18:08:54.006546+00', 'QHH5kunxkLc1lv6JFkcPKQ', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 65, 'l0bz49aZ3ihoJCc835S9NQ', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-16 18:08:54.009084+00', '2025-03-16 18:08:54.009084+00', '5qEG0hfXEsHMr0vyit7Htw', '9495d715-8896-415b-802e-24f648d479f8'),
	('00000000-0000-0000-0000-000000000000', 38, 'tVh0ibAEQoSFO1Jk88tYTg', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-12 22:33:51.979582+00', '2025-03-22 13:17:50.836605+00', NULL, 'cafbd780-124b-462b-8112-03bad7410194'),
	('00000000-0000-0000-0000-000000000000', 66, 'an3PQ4Wswnibm6jJ6UUBBA', 'ad6de953-5cb4-472a-9601-15ccf93662bd', true, '2025-03-22 13:17:50.848974+00', '2025-03-22 14:36:33.948959+00', 'tVh0ibAEQoSFO1Jk88tYTg', 'cafbd780-124b-462b-8112-03bad7410194'),
	('00000000-0000-0000-0000-000000000000', 67, 'ppaL3b8VTc7-S1BpROaSww', 'ad6de953-5cb4-472a-9601-15ccf93662bd', false, '2025-03-22 14:36:33.957291+00', '2025-03-22 14:36:33.957291+00', 'an3PQ4Wswnibm6jJ6UUBBA', 'cafbd780-124b-462b-8112-03bad7410194');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: contact_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."contact_requests" ("id", "from_user_id", "to_user_id", "status", "created_at") VALUES
	('94ea93ed-ba27-4540-a526-09747522f2e3', '18455da0-8653-4066-8ddc-f76251ec69ee', '9751770c-d2ec-4513-8971-0a7b69b257f8', 'pending', '2025-03-11 03:58:08.859482+00');


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."contacts" ("user_id", "contact_id") VALUES
	('18455da0-8653-4066-8ddc-f76251ec69ee', '9751770c-d2ec-4513-8971-0a7b69b257f8');


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."conversations" ("id", "is_group", "name", "last_message_id", "created_at", "updated_at") VALUES
	('a9f5f271-6a9b-403b-ae33-f4ae4467d4cc', false, 'Alice-Bob Chat', NULL, '2025-03-11 03:52:34.102901+00', '2025-03-11 03:52:34.102901+00');


--
-- Data for Name: conversation_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."conversation_participants" ("conversation_id", "user_id", "unread_count") VALUES
	('a9f5f271-6a9b-403b-ae33-f4ae4467d4cc', '18455da0-8653-4066-8ddc-f76251ec69ee', 0);


--
-- Data for Name: encryption_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."encryption_keys" ("id", "user_id", "public_key", "private_key") VALUES
	('852f85fa-9c7c-4e40-945f-81360c035a27', '18455da0-8653-4066-8ddc-f76251ec69ee', '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvfQQkKPBpVwnLtozCU1B
fANDD7OfxwVUFN8VWiofJEXLRYeG7Xq8nnVeSfWerBgHTXEiH8NWkfuRNh9ji/hY
DeB1nKrXJS20N0d8OLycPC8K4EjDueRediBdYYh4+CbzY8SiGN26uftT+er4vDna
HyHVk1ShYwux8eNU9kIsfVfhLmFk5iTAqq+H2Jmbs1ZUcodFQ8qE6ZqJIGvXS8s8
kh2KPPXpyGOlmzuSlS1edpLLG8iHP1J+nrpWKix+/Ohb/o8ohVgirE4pvU1hys78
yLyvPC50214+k16/XRHy+T7AFFJMZ8mX4CrCD9N+ga3qig0vph7p9iXfNniH7+7p
ywIDAQAB
-----END PUBLIC KEY-----
', '-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC99BCQo8GlXCcu
2jMJTUF8A0MPs5/HBVQU3xVaKh8kRctFh4bteryedV5J9Z6sGAdNcSIfw1aR+5E2
H2OL+FgN4HWcqtclLbQ3R3w4vJw8LwrgSMO55F52IF1hiHj4JvNjxKIY3bq5+1P5
6vi8OdofIdWTVKFjC7Hx41T2Qix9V+EuYWTmJMCqr4fYmZuzVlRyh0VDyoTpmokg
a9dLyzySHYo89enIY6WbO5KVLV52kssbyIc/Un6eulYqLH786Fv+jyiFWCKsTim9
TWHKzvzIvK88LnTbXj6TXr9dEfL5PsAUUkxnyZfgKsIP036BreqKDS+mHun2Jd82
eIfv7unLAgMBAAECggEABvIwUuGyGJZklmmDOUFadir2XlIesxvmRbccpEXrCpwE
wV+h1vhIgnDfSEwTh85/Id1Ttp6hgUgWOMjwDnO/4I4HLvnuUR05PFZAXCDFg8vi
lW4Dvj30GFS5pXHknopqFwlfNhKRm/BtUzO88cEZ0U6e7TrIhgMs+B/sgO7Niq3G
V5bC+9U4X9xIDGVarTmItANc9Q8r6/qSAxATWD7nfAu8Hd3OeIw6pMsBh8+K96Ph
NMfVep3NZwz+k5I3CKkTDheguWE63wDUjqofkWhkeB123x8+Aqqap0GhVaxzLe1Y
KIrZbkW220afY5grpZla7tS7ViVVO9swhMigrRICSQKBgQDoJawg2M+Xli19nJVq
UhnNoBtd6vxfdWcl7m1JL/+PwVzDpiWnjuDOudQV2J7cyWNROqlOokluoVqbaaGr
VsX/PAYj9hS1M5deqTmaZRivpuZksOgjVQjn8/Reyu3xSnqWYs+Hg4qcElSGgiym
Cmc6MaurJW/m7xvSe18SxFYeyQKBgQDReIpDFKDScEB18ii36g2xVQ7q/LXmTkeT
8g1AychkctUpVe1U7yQsmmec6OFRUd5cYRdJ3tyD9hFO6GjK5x/GjLsHw3N4jmCi
bttnvAdkhoY6q/M/9lMPmcbt3VAxf7Vb28/KfJzd5RKtMHFa67ZeSSQhVMLycyba
C+UednWp8wKBgBbcjuT1NQxil7xFDVnZF/1uBQPsvknQUAYmQtDwTySjEDWcSR0F
LxJsrnwwRwTLOGKpej7qMH0amsevUWKEOx91k8060LM/j2qdE7Umu5WgxBOqcFH6
b9QX7DrhlSksAoKI3JMl2yKfk39jlm4LnDrY5WUHXMvLRFwoFibM+wYxAoGABzhj
c6p7XKWX4zjkpGpB7JHlAL6TOowKNZRLVqdd6/B1XoZituHDWnI8DhGM6rOquX5z
Qg2XhkjuEc07B3tuAfcJ31uiWE54EEFH+MxnaNSmPdF9gf/onwoK7FoLkJk5VCBA
ilc/RPrHaQbZcWvcjmVxBGEakyba+Psd+63ToncCgYEAydQ5hAAnCTL81J8rMo7i
waFb6epm6wX5Azu8FXQ7F6NEcll4DNm+E5C31/nynu8Sfb6y2FDQB042ZUfHsYWz
zJmgryJJKzg8DY5kUaUpIP6teYNwlrk+D015m+A6MNbxgAPONyyheI+AWQZvVAkL
deoN3Fv8OdeEH43udgXfkM0=
-----END PRIVATE KEY-----
'),
	('c0f127ca-2409-4926-9bca-d545917df832', '81e6dfbb-f0e6-4889-9783-a212c7c19f03', '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr9UJVK9qLJDKOiKwZ62I
rVw4f4dSjSbgzFBimch4VlZ7qKMmTsBdCmnDfUkGeFgizQ5ZruU1yn2hJkNt+skM
gIfSoX1mX/qA+iSE2H6tUPstVUi/5WnHo6s6k3HOkTVqYisAT5IMvMmg3bkC5Jvo
gO0FgjSyNb0p281of5EuJnth3SM7FWmV9G2kzQI4Y/qeKjsfH8YsB8g0WEi7/IpH
SpCrorQqD9/2t7KfqZgOCEKsPguM0162zb9/I0q6zm4OuhssfjptM/5vyXjaRsPV
oKPrHqaneAlNx9Y67tSZlEM0N2GH0UvR3hM89QhBdAn58bPEYRD+j2TJRqEc7rKv
qwIDAQAB
-----END PUBLIC KEY-----
', '-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCv1QlUr2oskMo6
IrBnrYitXDh/h1KNJuDMUGKZyHhWVnuooyZOwF0KacN9SQZ4WCLNDlmu5TXKfaEm
Q236yQyAh9KhfWZf+oD6JITYfq1Q+y1VSL/lacejqzqTcc6RNWpiKwBPkgy8yaDd
uQLkm+iA7QWCNLI1vSnbzWh/kS4me2HdIzsVaZX0baTNAjhj+p4qOx8fxiwHyDRY
SLv8ikdKkKuitCoP3/a3sp+pmA4IQqw+C4zTXrbNv38jSrrObg66Gyx+Om0z/m/J
eNpGw9Wgo+sepqd4CU3H1jru1JmUQzQ3YYfRS9HeEzz1CEF0Cfnxs8RhEP6PZMlG
oRzusq+rAgMBAAECggEAVPm/iypFRSlqWkM2fryaf7HAaj2Dc0z1OjilFk4QfiVI
mNzUIB4OOQCZJfy7QEDT/MaxJ/mFEAm77kqLJbaxMJKzhDEe30aou3sXqqs55pel
NoC0oNII1fvkEKrhGkM22R+QBGSAfGJzOIR3tfT1Hg2ualk+QQNc7ems1W3b4GNV
Rjl9D+nrZ5jSGmx5qvUQ93SsbAkPHpsdwy6h3nY9gtR+7jYD9OPE+x1auuEH19i1
rcSi52qbDVMX1mV5eWwCpfQElbTurKAk+A7Wsy3UG1TibxxBw8OP8kuIRerzSnCG
bsFlfL/0GC1zDDM6V0qPi9sEdeLrZ5RpyAQWtilXPQKBgQDsgDUXzA90hs6SjiBI
621smTrkn/IWOTc5hKJoyYvu+p/3wA6ggkKNkJFQzE2lOapwSkTDlHVetv/ceZkN
dfJAZ7Cmyswk52IEVEo219wuzUIqUsCm/T0jVo5+mRL+2KYSV1jB984FS6SrHLFe
/+/wprNqAKuPfHe+ywQJuDqojwKBgQC+VE3IS8wYKUauWWvqMo2jh1AHu+6Fw20q
k7p1aZ+vNHqpFtVJ5wtZU+v93I2TNLcjZaneaPELC4ATWzZcLw9OlTj1bjr9jL6t
d7rTvES3xRRc6g69Y42STXY5EFw5pvW7a5qivsEVwYWAqweLVGf2j9uJqD6YE9xo
Z5f+Q639JQKBgQC/VMmfQvuN7jHY5xq/Y5fXL/AxXiTgTdGbuu4ZkFShNimMqdgr
iraFCNxHXcHDVe/JgIw5HjYGNk6w878a4Lzn1ftYNOELShZGIlsYG3KKeox46RHr
Bx0bJb+KNBTmECfq1rd71RrbteK2fDQTA0P+kR69N2WUY8IMnPnbUyxBiQKBgQC6
NVScH7wf71IdhZMU4Dy+vsXHq0/jQp1tSHbmJF58VYWkJJir4wWxcW+zQLKqUKrU
UMRuupEJU0kMpvJ6IfiB03CUfjHsmmR65ma8fLdma8ROWxfsppd9iZeeoKj6JqTH
prD1hFb36AurJKkO4ZeNHJWXCimjM9sxshh8RM7WmQKBgD0uxnXPG9LDCX5+FHes
Gg4ers8J1Fv1g/iGE0Vq6iRMt1PrKuWRl5tOcpS+rzctGyVCbWj9Fe7/7hDagjau
0GeqsfeIC0JSXVfLWx4FeBK1mBkxbmed4IXH9HpxMVMUlOPcAbQ1zo5/jV+8HAdg
LeYf+URFlKqY+0UABYR0HhML
-----END PRIVATE KEY-----
'),
	('4d914bf1-50bb-481a-bf68-a9984f0dad22', '9751770c-d2ec-4513-8971-0a7b69b257f8', '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'),
	('206a7d09-afe5-4cd1-aaac-f603a9904bb8', '0848723d-e7c2-4d56-a539-a975121921aa', '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'),
	('099abb1d-bbac-4a6f-a0eb-11117168667a', '4f359867-230a-4303-968c-f2414f4ae463', 'mock-public-key-testuser2', 'mock-private-key-testuser2');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: group_admins; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "username", "email", "phone_number", "public_key", "last_seen", "profile_pic_url", "created_at") VALUES
	('4f359867-230a-4303-968c-f2414f4ae463', 'testuser2', 'test2@example.com', NULL, 'mock-public-key-testuser2', '2025-03-15 01:07:41.643893+00', NULL, '2025-03-15 01:07:41.643893+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 67, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
