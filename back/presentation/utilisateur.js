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
    else {
      console.log("here 1 !");
      res
        .status(400)
        .json()
    }
  }
  else {
    console.log("here !");
    res
      .status(400)
      .json()
  }
});

/**
 * Récupération de tous les utilisateurs
 */
router.get('/users', async (req, res) => {
  let rows = await domain.users();
  res
    .status(200)
    .json(rows);
});

/**
 * Mise à jour de l'utilisateur correspondant au mail
 */
router.post('/update', async (req, res) => {
  const { mail, admin } = req.body;
  let rows = await domain.updateUtilisateur(
    [mail, admin]
  );

  res
    .status(201)
    .json(rows);
});

/**
 * Suppression du compte utilisateur correspondant au mail
 */
router.post('/delete', async (req, res) => {
  const { mail, admin } = req.body;
  let rows = await domain.deleteUserByMail(
    [mail]
  );

  res
    .status(201)
    .json(rows);
});

/**
 * Mise à jour du mot de passe de l'utilisateur correspondant au mail
 */
router.post('/updatePassword', async (req, res) => {
  const { mail, oldPassword, newPassword } = req.body;

  let rows = await domain.updatePassword(
    [mail, oldPassword, newPassword]
  );

  if (rows == false) {
    res
      .status(400)
      .json();
  }
  else {
    res
      .status(201)
      .json(rows);
  }
});