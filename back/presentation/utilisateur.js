'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();

const router = new Router();


module.exports = router;

router.get('/',async (req,res) => {
  let rows = {state : "TODO", where:"user"};
  res
    .status(200)
    .json(rows);
});

router.get('/connexion/:mail',async (req,res) => {
  const { mail } = req.params;
  let rows = await domain.userByMail(mail);
  res
    .status(200)
    .json(rows);
});
