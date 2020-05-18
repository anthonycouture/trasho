'use strict';

const GET_ALL_POUBELLES_INFO = ' SELECT * FROM poubelle  '+
'JOIN poubelle_type_poubelle ptp ON ptp.id_poubelle = poubelle.id_poubelle '+
'JOIN type_poubelle ON ptp.id_type_poubelle = type_poubelle.id_type_poubelle ';

const GET_ALL_POUBELLES_INFO_BY_ID = GET_ALL_POUBELLES_INFO+' WHERE poubelle.id_poubelle = $1';

const GET_ALL_POUBELLES = ' SELECT * FROM poubelle  ';
const GET_ALL_POUBELLES_BY_ID = GET_ALL_POUBELLES+' WHERE id_poubelle = $1';

const GET_TYPE_POUBELLES_BY_ID_POUBELLE = 'select type from type_poubelle t NATURAL JOIN poubelle_type_poubelle p where p.id_poubelle= $1'

const GET_USER_BY_EMAIL = 'select * from utilisateur where mail = $1';

const GET_ALL_USERS = 'select * from utilisateur';

const UPDATE_USER = 'UPDATE utilisateur SET flag_admin = $2 where mail = $1'; 

const DELETE_USER_BY_MAIL = 'DELETE FROM utilisateur where mail = $1';

const UPDATE_PASSWORD = 'UPDATE utilisateur SET password = $2 where mail = $1';

const GET_URL_POUBELLE = 'select url_photo from poubelle where id_poubelle = $1';

module.exports = {
  GET_ALL_POUBELLES,
  GET_ALL_POUBELLES_BY_ID,

  GET_ALL_POUBELLES_INFO,
  GET_ALL_POUBELLES_INFO_BY_ID,

  GET_TYPE_POUBELLES_BY_ID_POUBELLE,
  GET_USER_BY_EMAIL,
  GET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER_BY_MAIL,
  UPDATE_PASSWORD,
  GET_ALL_POUBELLES_BY_TYPE: 'select p.* from poubelle p NATURAL JOIN poubelle_type_poubelle pt where pt.id_type_poubelle = (select id_type_poubelle from type_poubelle t where t.type=$1)',

  GET_URL_POUBELLE,

  INSERT_POUBELLE : ' INSERT INTO poubelle(longitude, latitude, url_photo) VALUES ($1, $2, $3) returning id_poubelle',
  INSERT_TYPE_POUBELLE : ' INSERT INTO poubelle_type_poubelle(id_poubelle, id_type_poubelle) '+
  'VALUES ($1,'+
  '(select id_type_poubelle from type_poubelle t where t.type=$2)'+
  ');',
  DELETE_POUBELLE_BY_ID : 'DELETE FROM poubelle WHERE id_poubelle = $1',

  GET_ALL_USERS : 'SELECT * FROM utilisateur',
  INSERT_USER : 'INSERT INTO utilisateur(mail, password, flag_admin, token, date_expire, experience, actif) '+
    'VALUES ($1, $2, false, $3, current_date + interval \'1 month\', 0, false) returning *',
  GET_USER_BY_TOKEN : 'SELECT * FROM utilisateur WHERE token = $1',
  GET_USER_BY_UNEXPRIRED_TOKEN : 'SELECT * FROM utilisateur WHERE token = $1 and now() < date_expire',
  NEW_TOKEN : 'UPDATE utilisateur SET token = $1, date_expire = current_date + interval \'1 month\' WHERE token = $2 returning *',
  BECOME_ACTIF : 'UPDATE utilisateur SET actif = true, token = null, date_expire = null WHERE token = $1 returning *',

  GET_ALL_TYPES : 'SELECT * FROM type_poubelle',
};
