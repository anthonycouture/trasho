'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();
const security = imp.security();
const property = imp.prop();

const router = new Router();

const https = require('https');


module.exports = router;

router.get('/', async (req, res) => {
  let rows = await domain.sendAllPoubelles();
  res
    .status(200)
    .json(rows);

});

router.get('/' + property.url_base_admin + '/infos', async (req, res) => {
  let rows = await domain.sendAllPoubellesInfo();
  res
    .status(200)
    .json(rows);
  return true;
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await domain.sendPoubellesById(id);
  res
    .status(200)
    .json(rows);
});

router.get('/infos/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await domain.sendPoubellesInfoById(id);
  res
    .status(200)
    .json(rows);
});

router.get('/type/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await domain.getTypePoubellesByIdPoubelle(id);
  rows = rows.poubelle;
  let types = [];
  for (let key in rows) {
    types.push(key.split("_")[0]);
  }
  res
    .status(200)
    .json(types);
});

router.get('/url/:id', async (req, res) => {
  const { id } = req.params;
  let rows = await domain.getUrlPoubelleByIdPoubelle(id);
  res
    .status(200)
    .json(rows.poubelle._undefined.url_photo);
})

router.post('/', async (req, res) => {

  /*
  body = {longitude:XX,
  latitude:XX,
  url_photo:XX,
  type:XX}
  */
  const { longitude, latitude, url_photo } = req.body;
  let rows = await domain.insererPoubelle(
    [longitude, latitude, url_photo]
  );

  res
    .status(201)
    .json(rows);
});


/* Get trash by type */
router.post('/byType/name', async (req, res) => {
  const { type } = req.body;
  const list = type.map(function (aType) {
    return "'" + aType + "'";
  }).join(',');
  await domain.getTrashFromTypes('(' + list + ')').then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    console.error(err);
    return "failed";
  });
});

router.post('/add-type/:id/:type', async (req, res) => {
  const { id, type } = req.params;
  await domain.addTypeForTrash([id, type]).then((response) => {
    res.status(201).json(response)
  }).catch((err) => {
    console.error(err);
    return "failed";
  })
});

router.post('/itineraire/:id', async (req, res) => {
  const { id } = req.params;
  const { lat, lng } = req.body;
  let rows = await domain.sendPoubellesById(id);
  let latitude = Object.values(rows.poubelle)[0].latitude;
  let longitude = Object.values(rows.poubelle)[0].longitude;
  let url = 'https://api.mapbox.com/directions/v5/mapbox/walking/'+lng+','+lat+';'+longitude+','+latitude+'?geometries=geojson&access_token=sk.eyJ1IjoiYW50b2JveDI4IiwiYSI6ImNrODRldTRxbjBvazkza3F0bXY0aWNkZW0ifQ.z_spTi4iXubOdClQnjH2oA';
  https.get(url, (retour) => {
    retour.setEncoding("utf8");
    let body = "";
    retour.on("data", data => {
      body += data;
    });
    retour.on("end", () => {
      body = JSON.parse(body);
      res.status(200).json(body.routes[0].geometry.coordinates)
    });
  }).on("error", console.error)
  
})

router.post('/' + property.url_base_admin + '/delete-poubelle', async (req, res) => {
  const { id } = req.body;
  let result = await domain.deletePoubelle([id]);
  res.status(200).json(result.rowCount);
});
