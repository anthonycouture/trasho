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

router.get('/url/:id', async (req,res) => {
  const { id } = req.params;
  let rows = await domain.getUrlPoubelleByIdPoubelle(id);
  res
    .status(200)
    .json(rows.poubelle._undefined.url_photo);
});

router.get('/recente/:date',async (req,res) => {
  const { date } = req.params;
  let rows = await domain.poubellesAjoutAvantDate(date);
  res
    .status(200)
    .json(rows);
});

router.get('/poubellesDates/:date1/:date2',async (req,res) => {
  //console.log("req.query.date1");
  //const date1 = req.query.date1;
  //const date2 = req.query.date2;

  const { date1, date2} = req.params;
  console.log(date1);
  console.log(date2);
  let rows = await domain.poubellesAjoutEntreDates(date1, date2);
  res
    .status(200)
    .json(rows);
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
