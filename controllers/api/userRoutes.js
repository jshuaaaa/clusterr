const router = require('express').Router();
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
const groupPaymentAddress = "0xf8c7053A329669cDf621Ae93Af32F57CbF4b702c"
const groupPayment = new web3.eth.Contract([
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
], groupPaymentAddress)

const { Users, Friends, Groups } = require('../../models');
const { UserGroups } = require("../../models")


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


router.post('/add-group', async (req, res) => {
  try {

    const newUser = await UserGroups.create({
      user: req.session.user_id,
      group_name: req.body.groupName || req.body.group
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add-group-user', async (req, res) => {
  try {
    const findGroup = await Groups.findOne({
      where: {
        group_name: req.body.group,
        ownedBy: req.body.owner
      }
    })

    const findOwner = await Users.findOne({
      where: {
        username: req.body.owner
      }
    })
    const result = []
    
    result.push(findOwner)
    result.push(findGroup)
    res.status(201).json(result);

  } catch (err) {
    res.status(500).json(err);
  }
});



// friend routes
router.post('/friends', async (req, res) => {
  try {
    const alreadyFriends = await Friends.findOne({
      where: {
        user: req.session.user_id,
        friend: req.body.friend
      }
    })

    if (alreadyFriends) {
      res.status(400).json({ message: 'Already friends!' });
      return;
    }
    
    const request = await Friends.create({
      user: req.session.user_id,
      friend: req.body.friend
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: 'Request must include a valid user and friend' });
  }
});

router.delete('/friends', async (req, res) => {
  try {
    const remove = await Friends.destroy({
      where: {
        user: req.session.user_id,
        friend: req.body.friend
      }
    });

    if (!remove) {
      res.status(400).json({ message: 'Friendship either does not exist, or request did not include valid user or friend.' });
      return;
    }

    res.status(200).json({ message: `${req.session.username} has removed ${req.body.friend} from friends list.` });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
