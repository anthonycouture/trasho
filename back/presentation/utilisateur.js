'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();

const router = new Router();


module.exports = router;

router.get('/', async (req, res) => {
  let rows = await domain.users();
  res
    .status(200)
    .json(rows);
});

router.get('/:mail/:password', async (req, res) => {
  const { mail, password } = req.params;
  let row = await domain.userByMail(mail);
  let ret = false;
  let taille = Object.keys(row['utilisateur']).length;
  if (taille > 0) {
    if (password === row['utilisateur'][mail].password) {
      ret = true;
      res
        .status(200)
        .json({
          "resp": ret,
          "user": row['utilisateur']
        });
    }
  }
  else {
    res
      .status(400)
      .json({})
  }
});

router.get('/users', async (req, res) => {
  let rows = await domain.users();
  res
    .status(200)
    .json(rows);
});

router.post('/update',async (req,res)=>{
  const {mail, admin} = req.body;
  let rows = await domain.updateUtilisateur(
    [mail, admin]
  );
  
  res
    .status(201)
    .json(rows);
});

router.post('/delete',async (req,res)=>{
  const {mail, admin} = req.body;
  let rows = await domain.deleteUserByMail(
    [mail]
  );
  
  res
    .status(201)
    .json(rows);
});

router.post('/updatePassword',async (req,res)=>{
  const {mail, oldPassword, newPassword} = req.body;
  let rows = await domain.updatePassword(
    [mail, oldPassword, newPassword]
  );
  
  res
    .status(201)
    .json(rows);
});