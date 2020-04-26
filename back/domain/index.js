'user strict'
const imp = require('../import.js');
const con = imp.db();
const qry = imp.qry();
const Poubelle = imp.poubelle();
const Utilisateur = imp.utilisateur();
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

module.exports.getTypePoubellesByIdPoubelle = async (id_poubelle) => {
  let res =await  con.select(
    qry.GET_TYPE_POUBELLES_BY_ID_POUBELLE,
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
            }).catch((err) => {console.error(err); res = "failed"})
  return {id_poubelle : res };
}

module.exports.sendAllUsers = async () => {
  let res = await con.select(
      qry.GET_ALL_USERS,
      (rows)=>(Utilisateur.loadList(rows))
    );
    return res;
}

module.exports.insertUser = async (dataUser) =>{
  let res = await transaction(qry.INSERT_USER, dataUser).then((resp) => {
    let ret = resp.rows[0];
    return ret;
  }). catch((err) => {
    console.error(err);
    res = "failed";
  });
  return {user : res};
}

module.exports.findUserByToken = async (token) => {
  let res = await con.select(
    qry.GET_USER_BY_TOKEN,
    (rows)=>(Utilisateur.loadList(rows)),
    [token]
  );
  return res.utilisateur;
}

module.exports.checkExpiredToken = async (token) => {
  let res = await con.select(
    qry.GET_USER_BY_UNEXPRIRED_TOKEN,
    (rows)=>(Utilisateur.loadList(rows)),
    [token]
  );
  return res.utilisateur;
}

module.exports.becomeActif = async (token) => {
  let res = await transaction(qry.BECOME_ACTIF, [token]).then((resp) => {
    return resp.rows[0];
  }).catch((err) =>{
    console.error(err);
    res = "failed";
  });
  return res;
}

module.exports.generateNewToken = async(dataNewToken) => {
  let res = await transaction(qry.NEW_TOKEN, dataNewToken).then((resp) => {
    return resp.rows[0];
  }).catch((err) =>{
    console.error(err);
    res = "failed";
  });
  return res;
}

module.exports.userByMail = async (mail) => {
  let res = await  con.select(
      qry.GET_USER_BY_EMAIL,
      (rows)=>(Utilisateur.loadList(rows)),
      [mail]
    );
    return res;
}

module.exports.users = async () => {
  let res = await  con.select(
      qry.GET_ALL_USERS,
      (rows)=>(Utilisateur.loadList(rows))
    );
    return res;
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
