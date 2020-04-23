'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();
const cst = imp.cst();
const property = imp.prop();
const sendConfirmMail = imp.sendConfirmMail();

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
  sendConfirmMail.sendMail(mail, null).then(async () => {
    await domain.insertUser([mail, password]).then((newRow) => {
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

router.post('/validMail/:token', async (req, res) => {
  const {token} = req.params;
  console.log(token);
  res.status(200);
});