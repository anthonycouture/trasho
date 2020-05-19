drop table signalement;
drop table utilisateur;
drop table type_signalement;
drop table poubelle_type_poubelle;
drop table poubelle;
drop table type_poubelle;

create table type_poubelle (
  id_type_poubelle serial primary key,
  type varchar not null
);

create table poubelle (
  id_poubelle serial primary key,
  longitude float not null,
  latitude float not null,
  url_photo varchar not null
);

create table poubelle_type_poubelle (
  id_poubelle integer references poubelle,
  id_type_poubelle integer references type_poubelle,
  CONSTRAINT pk_poubelle_type primary key (id_poubelle,id_type_poubelle)
);

create table type_signalement (
  id_type_signalement serial primary key,
  type varchar not null
);

create table utilisateur (
  mail varchar primary key,
  password varchar not null,
  flag_admin boolean not null,
  token varchar,
  date_expire date,
  experience integer not null,
  actif boolean not null
);

create table signalement(
  id_signalement serial primary key,
  mail varchar not null references utilisateur,
  id_poubelle integer not null references poubelle,
  id_type_signalement integer not null references type_signalement,
  date_signalement date not null,
  UNIQUE (id_poubelle, mail)
);
