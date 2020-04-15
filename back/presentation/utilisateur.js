'user strict';
const imp = require('../import.js');

const Router = imp.router();
const domain = imp.domain();

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
  let rows = await domain.insertUser([mail, password]);
  res.status(201).json(rows);
})