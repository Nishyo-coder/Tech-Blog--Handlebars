const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models')

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      
      res.redirect('/posts')
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/posts')
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
try {
  const usersData = await User.findAll({});
  const users = usersData.map((user) => user.get({ plain: true }));
  res.json(users);
  
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router