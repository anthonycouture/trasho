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

router.post('/addSignalementDelete',async(req, res) => {
  const {idPoubelle, mail } = req.body;
  await domain.insertSignalementDelete([mail, idPoubelle])
  res.status(200).json();
});