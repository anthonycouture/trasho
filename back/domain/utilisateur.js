'user strict';
const imp = require('../import.js');
const JSONable = imp.jsonable();

class Utilisateur extends JSONable{
  #mail;
  password;
  flag_admin;
  token;
  date_expire;
  experience;
  actif;

  constructor
  (
    mail = 'undefined',
    password = 'undefined',
    flag_admin = 'undefined',
    token = 'undefined',
    date_expire = 'undefined',
    experience = 'undefined',
    actif = 'undefined',
  ){
    super();
    this.#mail = mail,
    this.password = password;
    this.flag_admin = flag_admin;
    this.token = token;
    this.date_expire = date_expire;
    this.experience = experience;
    this.actif = actif;
  }

  static fromJSON(user){
    /*Attention : signa n'est pas un objet signalement mais un JSON*/
    return new Utilisateur(
      user.mail,
      user.password,
      user.flag_admin,
      user.token,
      user.date_expire,
      user.experience,
      user.actif
    );
  }

  static tablename(){ return 'utilisateur';}
  identifiant() { return this.#mail; }
  content() {
    return {
      mail : this.#mail,
      password : this.password,
      flag_admin : this.flag_admin,
      token : this.token,
      date_expire : this.date_expire,
      experience : this.experience,
      actif : this.actif
    }
  }

  id(mail=undefined){
    /*Getter et setter */
    if(mail !== undefined)
      this.#mail = mail;
    return this.#mail;
  }


}

module.exports = Utilisateur;
