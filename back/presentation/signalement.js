'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();

const router = new Router();


module.exports = router;

router.get('/',async (req,res) => {
  let rows = {state : "TODO", where:"report"};
  res
    .status(200)
    .json(rows);
});


/* Add report f */
router.post('/newTrash', async (req, res) => {
  const {mail, id_poubelle} = req.body;
  await domain.addReportNewTrash([mail, id_poubelle]).then((rows) => {
    res.status(201).send(true);
  });  
})

router.post('/addSignalementDelete',async(req, res) => {
  const {idPoubelle, mail } = req.body;
  await domain.insertSignalementDelete([mail, idPoubelle])
  res.status(200).json();
});
