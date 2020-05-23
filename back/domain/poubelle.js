'user strict';
const imp = require('../import.js');
const JSONable = imp.jsonable();

class Poubelle extends JSONable{
  #id_poubelle; /*private : #*/
  longitude;
  latitude;
  url_photo;
  date_ajout;
  id_type_poubelle;

  constructor
  (
    id_poubelle = 'undefined',
    longitude   = 'undefined',
    latitude    = 'undefined',
    url_photo   = 'undefined',
    date_ajout  = 'undefined',
    id_type_poubelle        = 'undefined'
  ){
    super();
    this.#id_poubelle = id_poubelle;
    this.longitude    = longitude;
    this.latitude     = latitude;
    this.url_photo    = url_photo;
    this.date_ajout   = date_ajout
    this.id_type_poubelle         = id_type_poubelle;

  }

  static fromJSON(trash){
    /*Attention : trash n'est pas un objet poubelle mais un JSON*/
    return new Poubelle(
                      trash.id_poubelle,
                      trash.longitude,
                      trash.latitude,
                      trash.url_photo,
                      trash.date_ajout,
                      trash.id_type_poubelle
          );
  }

  static tablename(){ return 'poubelle';}
  identifiant() { 
    return this.id_type_poubelle+'_'+this.#id_poubelle;
  }
  content() {
    return {
      longitude : this.longitude,
      latitude : this.latitude,
      url_photo : this.url_photo,
      date_ajout : this.date_ajout,
      type : this.id_type_poubelle,
    }
  }

  id(id_poubelle=undefined){
    /*Getter et setter */
    if(id_poubelle !== undefined)
      this.#id_poubelle = id_poubelle;
    return this.#id_poubelle;
  }


}

module.exports = Poubelle;
