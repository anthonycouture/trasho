INSERT INTO public.poubelle(longitude, latitude, url_photo) VALUES (3.06959, 50.636763, 'a');
INSERT INTO public.poubelle(longitude, latitude, url_photo) VALUES (3.068441, 50.636752, 'a');
INSERT INTO public.poubelle(longitude, latitude, url_photo) VALUES (3.068494, 50.636198, 'a');

INSERT INTO public.type_poubelle(type) VALUES ('Recyclable');
INSERT INTO public.type_poubelle(type) VALUES ('Verre');
INSERT INTO public.type_poubelle(type) VALUES ('Tout déchet');

INSERT INTO public.poubelle_type_poubelle(id_poubelle, id_type_poubelle) 
VALUES ((select id_poubelle from poubelle p where p.latitude=50.636763 and p.longitude=3.06959), 
		(select id_type_poubelle from type_poubelle t where t.type='Recyclable'));
INSERT INTO public.poubelle_type_poubelle(id_poubelle, id_type_poubelle) 
VALUES ((select id_poubelle from poubelle p where p.latitude=50.636752 and p.longitude=3.068441), 
		(select id_type_poubelle from type_poubelle t where t.type='Verre'));
INSERT INTO public.poubelle_type_poubelle(id_poubelle, id_type_poubelle) 
VALUES ((select id_poubelle from poubelle p where p.latitude=50.636198 and p.longitude=3.068494), 
		(select id_type_poubelle from type_poubelle t where t.type='Tout déchet'));