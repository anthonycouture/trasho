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

router.get('/:mail/:password',async (req,res) => {
  const { mail, password } = req.params;
  let row = await domain.userByMail(mail);
  let ret = false;
  let taille = Object.keys(row['utilisateur'] ).length;
  if(taille > 0) {
    if(password === row['utilisateur']['undefined'].password) {
      ret = true;
      res
        .status(200)
        .json({ "resp": ret });
    }
  }
  else {
    res
      .status(400)
      .json({})
  }


});
