const router = require('express').Router();
const { Users } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      password: req.body.password,
      metamask: req.body.metamask,
      address: req.body.account
    });
    res.status(201).json(newUser);
    res.render('home')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    if(req.body.metamask === true) {
    req.session.save(() => {
      req.session.user_id = req.body.username;
      req.session.logged_in = true;
      req.session.address = req.body.account;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } else {
    req.session.save(() => {
      req.session.user_id = req.body.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  }

  } catch (err) {
    res.status(400).json({ message: 'oh noo'});
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


module.exports = router;
