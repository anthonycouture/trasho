'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();

const router = new Router();


module.exports = router;

router.get('/',async (req,res) => {
  let rows = await domain.sendAllPoubelles();
  res
    .status(200)
    .json(rows);
});

router.get('/infos',async (req,res) => {
  let rows = await domain.sendAllPoubellesInfo();
  res
    .status(200)
    .json(rows);
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

router.post('/create',async (req,res)=>{
  /*
  body = {longitude:XX,
  latitude:XX,
  url_photo:XX,
  type:XX}
  */
  const {longitude, latitude,url_photo,type} = req.body;
  let rows = await domain.insererPoubelle(
    [longitude,latitude, url_photo],
    [type]
  );
  
  res
    .status(201)
    .json(rows);
});
