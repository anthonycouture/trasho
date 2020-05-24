--Il faut ajouter un champs niveau (default 0) dans la base de données !

CREATE FUNCTION func_maj_niveau() RETURNS TRIGGER AS $maj_niveau$
	BEGIN
		IF((OLD.experience + NEW.experience >= 100)) THEN
			NEW.niveau = OLD.niveau + 1;
			NEW.experience = OLD.experience + NEW.experience - 100;
		ELSE
			NEW.experience = OLD.experience + OLD.experience;
		END IF;
		return NEW;
	END;
$maj_niveau$ LANGUAGE plpgsql;


CREATE TRIGGER maj_niveau
BEFORE UPDATE of experience ON utilisateur
FOR EACH ROW
EXECUTE FUNCTION func_maj_niveau();

--tests

UPDATE public.utilisateur
	SET experience = 110
	WHERE mail = 'lucas.laloux3011@gmail.com';
	
UPDATE public.utilisateur
	SET niveau = 0;