'user strict'
const imp = require('../import.js');
const con = imp.db();
const qry = imp.qry();
const Poubelle = imp.poubelle();
/*
DOMAIN :  terme metiers : comprehensible

*/
module.exports.sendAllPoubelles = async () => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_INFO,
      (rows)=>(Poubelle.loadList(rows))
    );
    return res;
}

module.exports.sendPoubellesById = async (id_poubelle) => {
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_INFO_BY_ID,
      (rows)=>(Poubelle.loadList(rows)),
      [id_poubelle]
    );
    return res;
}

module.exports.insererPoubelle = async (dataPoubelle, dataTypePoubelle) => {
  return {etat:
            (
              await transaction(qry.INSERT_POUBELLE,dataPoubelle)
              &&
              await transaction(qry.INSERT_TYPE_POUBELLE,dataTypePoubelle)
            )
          } ;
}


function transaction(requete,donnees_colonnes) {
  let retour = true;
  try {
    con.transaction(
      requete,
      donnees_colonnes
    );
  } catch( err ) {
    console.error(err);
    retour = false;
  }
  return retour;
}
