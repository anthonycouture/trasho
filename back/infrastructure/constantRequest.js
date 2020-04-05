'use strict';

const GET_ALL_POUBELLES_INFO = ' SELECT * FROM poubelle  '+
'JOIN poubelle_type_poubelle ptp ON ptp.id_poubelle = poubelle.id_poubelle '+
'JOIN type_poubelle ON ptp.id_type_poubelle = type_poubelle.id_type_poubelle ';

const GET_ALL_POUBELLES_INFO_BY_ID = GET_ALL_POUBELLES_INFO+' WHERE poubelle.id_poubelle = $1';

const GET_ALL_POUBELLES = ' SELECT * FROM poubelle  ';
const GET_ALL_POUBELLES_BY_ID = GET_ALL_POUBELLES+' WHERE id_poubelle = $1';

module.exports = {
  GET_ALL_POUBELLES,
  GET_ALL_POUBELLES_BY_ID,

  GET_ALL_POUBELLES_INFO,
  GET_ALL_POUBELLES_INFO_BY_ID,

  INSERT_POUBELLE : ' INSERT INTO poubelle(longitude, latitude, url_photo) VALUES ($1, $2, $3) returning id_poubelle',
  INSERT_TYPE_POUBELLE : ' INSERT INTO poubelle_type_poubelle(id_poubelle, id_type_poubelle) '+
  'VALUES ($1,'+
  '(select id_type_poubelle from type_poubelle t where t.type=$2)'+
  ');',
  DELETE_POUBELLE_BY_ID : 'DELETE FROM poubelle WHERE id_poubelle = $1',

};
