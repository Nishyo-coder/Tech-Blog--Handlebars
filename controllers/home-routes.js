const router = require('express').Router();
const { Posts, Comments, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      include: [
        {
          model: Posts,
          attributes: ['title', 'description'],
        },
      ],
    });

    const Posts = dbPostData.map((Posts) =>
      Posts.get({ plain: true })
    );
    // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('homepage', {
      Posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// // Login route
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect to the homepage
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   // Otherwise, render the 'login' template
//   res.render('login');
// });

module.exports = router;
