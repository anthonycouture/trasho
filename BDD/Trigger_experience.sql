--Il faut ajouter un champs niveau (default 0) dans la base de données !

CREATE FUNCTION func_maj_niveau() RETURNS TRIGGER AS $maj_niveau$
	BEGIN
		IF((OLD.experience + NEW.experience) >= 100) THEN
			UPDATE utilisateur
			SET niveau = OLD.niveau + 1
			WHERE mail = OLD.mail;
			
			UPDATE utilisateur
			SET experience = NEW.experience - 100
			WHERE mail = OLD.mail;
		END IF;
		return null;
	END;
$maj_niveau$ LANGUAGE plpgsql;


CREATE TRIGGER maj_niveau
AFTER UPDATE of experience ON utilisateur
FOR EACH ROW
EXECUTE FUNCTION func_maj_niveau();

--tests

UPDATE public.utilisateur
	SET experience = 110
	WHERE mail = 'lucas.laloux3011@gmail.com';
	
UPDATE public.utilisateur
	SET niveau = 0;