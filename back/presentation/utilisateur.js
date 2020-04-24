'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();
const cst = imp.cst();
const property = imp.prop();
const sendConfirmMail = imp.sendConfirmMail();
const uuid = imp.uuid();

const router = new Router();


module.exports = router;

router.get('/',async (req,res) => {
  let rows = await domain.sendAllUsers();
  res
    .status(200)
    .json(rows);
});

router.post('/', async (req, res) => {
  const {mail, password} = req.body;
  const token = uuid.v4();
  sendConfirmMail.sendMail(mail, token).then(async () => {
    await domain.insertUser([mail, password, token]).then((newRow) => {
      res.status(201).json(newRow);
    }).catch((error) => {
      console.error(error);
      res.status(500);
    });
  }).catch((error) => {
    console.error(error);
    res.status(500);
  });
});

router.get('/confirmMail/:token', async (req, res) => {
  const {token} = req.params;
  res.render('confirmMail', {
    token: JSON.stringify(token),
    api_user : JSON.stringify(cst.URL + property.url_utilisateur),
  });
});

router.get('/token/:token', async (req, res) => {
  const {token} = req.params;
  await domain.findUserByToken(token).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    console.error(err);
    res.status(500);
  });
});

router.get('/noExpiredToken/:token', async (req, res) => {
  const {token} = req.params;
  await domain.checkExpiredToken(token).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    console.error(err);
    res.status(500);
  });
});


router.post('/validMail/:token', async (req, res) => {
  const {token} = req.params;
  await domain.becomeActif(token).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    console.error(err);
    res.status(500);
  });
});