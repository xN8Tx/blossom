toc.dat                                                                                             0000600 0004000 0002000 00000016744 14473374344 0014470 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       0    7                {         	   Messenger    15.2    15.2     8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         ;           1262    16935 	   Messenger    DATABASE     �   CREATE DATABASE "Messenger" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE "Messenger";
                postgres    false         �            1259    16950    chats    TABLE     e   CREATE TABLE public.chats (
    id bigint NOT NULL,
    title character varying,
    type boolean
);
    DROP TABLE public.chats;
       public         heap    postgres    false         �            1259    16983    chats_id_seq    SEQUENCE     �   ALTER TABLE public.chats ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216         �            1259    16957    members    TABLE     b   CREATE TABLE public.members (
    id bigint NOT NULL,
    "chatId" bigint,
    "userId" bigint
);
    DROP TABLE public.members;
       public         heap    postgres    false         �            1259    16982    members_id_seq    SEQUENCE     �   ALTER TABLE public.members ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217         �            1259    16936    messages    TABLE     �   CREATE TABLE public.messages (
    id bigint NOT NULL,
    "chatId" bigint,
    "userId" bigint,
    message character varying,
    date date,
    status boolean,
    "isEdit" boolean
);
    DROP TABLE public.messages;
       public         heap    postgres    false         �            1259    16984    messages_id_seq    SEQUENCE     �   ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214         �            1259    16943    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    "firstName" character varying,
    "secondName" character varying,
    username character varying,
    email character varying,
    password character varying,
    status boolean
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    16985    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215         0          0    16950    chats 
   TABLE DATA           0   COPY public.chats (id, title, type) FROM stdin;
    public          postgres    false    216       3632.dat 1          0    16957    members 
   TABLE DATA           9   COPY public.members (id, "chatId", "userId") FROM stdin;
    public          postgres    false    217       3633.dat .          0    16936    messages 
   TABLE DATA           [   COPY public.messages (id, "chatId", "userId", message, date, status, "isEdit") FROM stdin;
    public          postgres    false    214       3630.dat /          0    16943    users 
   TABLE DATA           a   COPY public.users (id, "firstName", "secondName", username, email, password, status) FROM stdin;
    public          postgres    false    215       3631.dat <           0    0    chats_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.chats_id_seq', 5, true);
          public          postgres    false    219         =           0    0    members_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.members_id_seq', 1, false);
          public          postgres    false    218         >           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 1, false);
          public          postgres    false    220         ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    221         �           2606    16956    chats chats_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.chats DROP CONSTRAINT chats_pkey;
       public            postgres    false    216         �           2606    16961    members members_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            postgres    false    217         �           2606    16942    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    214         �           2606    16949    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215         �           2606    16967    members chatId    FK CONSTRAINT     z   ALTER TABLE ONLY public.members
    ADD CONSTRAINT "chatId" FOREIGN KEY ("chatId") REFERENCES public.chats(id) NOT VALID;
 :   ALTER TABLE ONLY public.members DROP CONSTRAINT "chatId";
       public          postgres    false    216    3481    217         �           2606    16972    messages chatId    FK CONSTRAINT     {   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "chatId" FOREIGN KEY ("chatId") REFERENCES public.chats(id) NOT VALID;
 ;   ALTER TABLE ONLY public.messages DROP CONSTRAINT "chatId";
       public          postgres    false    216    3481    214         �           2606    16962    members userId    FK CONSTRAINT     z   ALTER TABLE ONLY public.members
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;
 :   ALTER TABLE ONLY public.members DROP CONSTRAINT "userId";
       public          postgres    false    3479    217    215         �           2606    16977    messages userId    FK CONSTRAINT     {   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.messages DROP CONSTRAINT "userId";
       public          postgres    false    214    3479    215                                    3632.dat                                                                                            0000600 0004000 0002000 00000000005 14473374344 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3633.dat                                                                                            0000600 0004000 0002000 00000000005 14473374344 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3630.dat                                                                                            0000600 0004000 0002000 00000000005 14473374344 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3631.dat                                                                                            0000600 0004000 0002000 00000000005 14473374344 0014256 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000015016 14473374344 0015404 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

DROP DATABASE "Messenger";
--
-- Name: Messenger; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Messenger" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';


ALTER DATABASE "Messenger" OWNER TO postgres;

\connect "Messenger"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id bigint NOT NULL,
    title character varying,
    type boolean
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.chats ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id bigint NOT NULL,
    "chatId" bigint,
    "userId" bigint
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.members ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    "chatId" bigint,
    "userId" bigint,
    message character varying,
    date date,
    status boolean,
    "isEdit" boolean
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    "firstName" character varying,
    "secondName" character varying,
    username character varying,
    email character varying,
    password character varying,
    status boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, title, type) FROM stdin;
\.
COPY public.chats (id, title, type) FROM '$$PATH$$/3632.dat';

--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, "chatId", "userId") FROM stdin;
\.
COPY public.members (id, "chatId", "userId") FROM '$$PATH$$/3633.dat';

--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, "chatId", "userId", message, date, status, "isEdit") FROM stdin;
\.
COPY public.messages (id, "chatId", "userId", message, date, status, "isEdit") FROM '$$PATH$$/3630.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "secondName", username, email, password, status) FROM stdin;
\.
COPY public.users (id, "firstName", "secondName", username, email, password, status) FROM '$$PATH$$/3631.dat';

--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 5, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: members chatId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT "chatId" FOREIGN KEY ("chatId") REFERENCES public.chats(id) NOT VALID;


--
-- Name: messages chatId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "chatId" FOREIGN KEY ("chatId") REFERENCES public.chats(id) NOT VALID;


--
-- Name: members userId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- Name: messages userId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  