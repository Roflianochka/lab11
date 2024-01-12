PGDMP     
    !                 |            AssetGuardian #   15.5 (Ubuntu 15.5-0ubuntu0.23.10.1) #   15.5 (Ubuntu 15.5-0ubuntu0.23.10.1)     1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    16721    AssetGuardian    DATABASE     {   CREATE DATABASE "AssetGuardian" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.UTF-8';
    DROP DATABASE "AssetGuardian";
                username    false            �            1259    16788    Users    TABLE     b  CREATE TABLE public."Users" (
    id integer NOT NULL,
    fullname character varying(255) NOT NULL,
    nickname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    bio text,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    username    false            �            1259    16787    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          username    false    227            5           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          username    false    226            �           2604    16791    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          username    false    227    226    227            .          0    16788    Users 
   TABLE DATA           i   COPY public."Users" (id, fullname, nickname, email, bio, password, "createdAt", "updatedAt") FROM stdin;
    public          username    false    227   2       6           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 3, true);
          public          username    false    226            �           2606    16799    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            username    false    227            �           2606    16797    Users Users_nickname_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_nickname_key" UNIQUE (nickname);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_nickname_key";
       public            username    false    227            �           2606    16795    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            username    false    227            .   �   x�}�1n�@E��S��X�쮃�U���&����.��	"
�9	 !p��7ʘʸ����!��X�[�j�T��^�Y�YzO+m'
'�	f.�QN1P�%Іvt�V	�g�N[:A�R���t�o:^�&Գa�V.E��D��X#Kh��>�)Gj����s���|�k?������u+��l�����|��&.�RvĴ�C+1{���d��J���γB���x�     