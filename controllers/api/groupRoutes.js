const Users = require('../../models/User');
const { Groups } = require('../../models/index');
const router = require('express').Router();

router.post('/create', async (req, res) => {
  try {
    const findUser = await Users.findOne({
      raw: true,
      where : {
        username: req.session.user_id
      }
    })
    console.log(findUser.address)
    if(findUser.address === null && req.body.isPaid) {
      res.status(400).json({message: "Must be a metamask user for this!"})
      return

    }
    const newGroup = await Groups.create({
      group_name: req.body.groupName,
      is_paid: req.body.isPaid,
      cost: req.body.cost,
      ownedBy: req.session.user_id
    });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;