'user strict';
const imp = require('../import.js');
const JSONable = imp.jsonable();

class Poubelle extends JSONable{
  #id_poubelle; /*private : #*/
  longitude;
  latitude;
  url_photo;
  type;

  constructor
  (
    id_poubelle = 'undefined',
    longitude   = 'undefined',
    latitude    = 'undefined',
    url_photo   = 'undefined',
    type        = 'undefined'
  ){
    super();
    this.#id_poubelle = id_poubelle;
    this.longitude    = longitude;
    this.latitude     = latitude;
    this.url_photo    = url_photo;
    this.type         = type;

  }

  static fromJSON(trash){
    /*Attention : trash n'est pas un objet poubelle mais un JSON*/
    return new Poubelle(
                      trash.id_poubelle,
                      trash.longitude,
                      trash.latitude,
                      trash.url_photo,
                      trash.type
          );
  }

  static tablename(){ return 'poubelle';}
  identifiant() { return Poubelle.tablename()+'_'+this.type+'_'+this.#id_poubelle; }
  content() {
    return {
      longitude : this.longitude,
      latitude : this.latitude,
      url_photo : this.url_photo,
      type : this.type,
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
