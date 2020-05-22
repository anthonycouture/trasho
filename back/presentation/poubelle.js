'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();
const security = imp.security();

const router = new Router();


module.exports = router;

router.get('/',async (req,res) => {
    let rows = await domain.sendAllPoubelles();
    res
      .status(200)
      .json(rows);

});

router.get('/admin/infos',async (req,res) => {
  let rows = await domain.sendAllPoubellesInfo();
  res
    .status(200)
    .json(rows);
        return true;
});


router.get('/:id',async (req,res) => {
  const { id } = req.params;
  let rows = await domain.sendPoubellesById(id);
  res
    .status(200)
    .json(rows);
});

router.get('/infos/:id',async (req,res) => {
  const { id } = req.params;
  let rows = await domain.sendPoubellesInfoById(id);
  res
    .status(200)
    .json(rows);
});

router.get('/type/:id',async (req,res) => {
  const { id } = req.params;
  let rows = await domain.getTypePoubellesByIdPoubelle(id);
  rows = rows.poubelle;
  let types = [];
  for(let key in rows){
    types.push(key.split("_")[0]);
  }
  res
    .status(200)
    .json(types);
});

router.get('/url/:id', async (req,res) => {
  const { id } = req.params;
  let rows = await domain.getUrlPoubelleByIdPoubelle(id);
  res
    .status(200)
    .json(rows.poubelle._undefined.url_photo);
})

router.post('/',async (req,res)=>{

  /*
  body = {longitude:XX,
  latitude:XX,
  url_photo:XX,
  type:XX}
  */
  const {longitude, latitude,url_photo} = req.body;
  let rows = await domain.insererPoubelle(
    [longitude,latitude, url_photo]
  );

  res
    .status(201)
    .json(rows);
});


/* Get trash by type */
router.post('/byType/name', async (req, res) => {
  const {type} = req.body;
  const list = type.map(function(aType){
    return "'" + aType + "'";
  }).join(',');
  await domain.getTrashFromTypes('(' + list + ')').then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    console.error(err);
    return "failed";
  });
});

router.post('/:id/:type', async (req,res) => {
  const {id, type} = req.params;
  await domain.addTypeForTrash([id, type]).then((response) => {
    res.status(201).json(response)
  }).catch((err) => {
    console.error(err);
    return "failed";
  })
});

router.post('/delete-poubelle', async(req, res) => {
  const {id} = req.body;
  await domain.deletePoubelle([id]);
  res.status(200).json();
});
