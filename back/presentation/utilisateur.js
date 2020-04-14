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
  console.log('pass : ' + password);
  //console.log('password2 : ' + row);
  console.log('aaa : ' + row['utilisateur']['undefined'].password);
  if(password === row['utilisateur']['undefined'].password) {
    ret = true;
  }
  //console.log(row);
  res
    .status(200)
    .json({ "resp": ret });
});
