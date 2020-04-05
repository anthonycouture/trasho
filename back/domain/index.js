'user strict'
const imp = require('../import.js');
const con = imp.db();
const qry = imp.qry();
const Poubelle = imp.poubelle();
/*
DOMAIN :  terme metiers : comprehensible

*/
module.exports.sendAllPoubellesInfo = async () => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_INFO,
      (rows)=>(Poubelle.loadList(rows))
    );
    return res;
}

module.exports.sendAllPoubelles = async () => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES,
      (rows)=>(Poubelle.loadList(rows))
    );
    return res;
}

module.exports.sendPoubellesInfoById = async (id_poubelle) => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_INFO_BY_ID,
      (rows)=>(Poubelle.loadList(rows)),
      [id_poubelle]
    );
    return res;
}

module.exports.sendPoubellesById = async (id_poubelle) => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_BY_ID,
      (rows)=>(Poubelle.loadList(rows)),
      [id_poubelle]
    );
    return res;
}

module.exports.insererPoubelle = async (dataPoubelle, dataTypePoubelle) => {
  let res = await transaction(qry.INSERT_POUBELLE,dataPoubelle)
            .then((resp) => {
              let ret = resp.rows[0].id_poubelle;
              dataTypePoubelle = [ret].concat(dataTypePoubelle);
              transaction(qry.INSERT_TYPE_POUBELLE,dataTypePoubelle);
              return ret;
            }).catch((err) => {console.error(err); res = "failled"})
  return {id_poubelle : res };
}


function transaction(requete,donnees_colonnes) {
  let retour = true;
  try {
    retour = con.transaction(
      requete,
      donnees_colonnes
    );
  } catch( err ) {
    console.error(err);
    retour = false;
  }
  return retour;
}
