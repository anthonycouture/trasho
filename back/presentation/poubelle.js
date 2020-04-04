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

router.get('/:id',async (req,res) => {
  const { id } = req.params;
  let rows = await domain.sendPoubellesById(id);
  res
    .status(200)
    .json(rows);
});

router.post('/add',(req,res)=>{
  const {longitude, latitude,url_photo,type} = req.body;
  res
    .status(201)
    .json(domaine.insererPoubelle(
      [longitude,latitude, url_photo],
      [latitude,longitude,type]
    ));
});
