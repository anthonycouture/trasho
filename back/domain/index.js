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
  console.log(qry.GET_ALL_POUBELLES_INFO_BY_ID);
  let res =await  con.select(
      qry.GET_ALL_POUBELLES_INFO_BY_ID,
      (rows)=>(Poubelle.loadList(rows)),
      [id_poubelle]
    );
    console.log(res);
    return res;
}

module.exports.insererPoubelle = (dataPoubelle, dataTypePoubelle) => {
  return {etat:
            (
              transaction(qry.INSERT_POUBELLE,dataPoubelle)
              &&
              transaction(qry.INSERT_TYPE_POUBELLE,dataTypePoubelle)
            )
          } ;
}


function transaction(requete,donnees_colonnes) {
  let retour = true;
  try {
    con.trans(
      requete,
      donnees_colonnes
    );
  } catch( err ) {
    console.error(err);
    retour = false;
  }
  return retour;
}
