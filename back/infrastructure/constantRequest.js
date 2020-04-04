'use strict';

const GET_ALL_POUBELLES_INFO = ' SELECT * FROM poubelle  '+
'JOIN poubelle_type_poubelle ptp ON ptp.id_poubelle = poubelle.id_poubelle '+
'JOIN type_poubelle ON ptp.id_type_poubelle = type_poubelle.id_type_poubelle ';

const GET_ALL_POUBELLES_INFO_BY_ID = GET_ALL_POUBELLES_INFO+' WHERE poubelle.id_poubelle = $1';



module.exports = {
  GET_ALL_POUBELLES_INFO,
  GET_ALL_POUBELLES_INFO_BY_ID,
  INSERT_POUBELLE : ' INSERT INTO poubelle(longitude, latitude, url_photo) VALUES ($1, $2, $3)',
  INSERT_TYPE_POUBELLE : ' INSERT INTO poubelle_type_poubelle(id_poubelle, id_type_poubelle) '+
  'VALUES ('+
  '(select id_poubelle from poubelle p where p.latitude=$1 and p.longitude=$2), '+
  '(select id_type_poubelle from type_poubelle t where t.type=$3)'+
  ');',
  DELETE_POUBELLE_BY_ID : 'DELETE FROM poubelle WHERE id_poubelle = $1',

};
