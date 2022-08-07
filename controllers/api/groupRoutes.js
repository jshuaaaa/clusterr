const Users = require('../../models/User');
const { Groups } = require('../../models/index');
const router = require('express').Router();

router.post('/create', async (req, res) => {
  try {
    console.log(req.session.address)
    if(!req.session.address && req.body.isPaid || req.body.cost > 0) {
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
  }
});




module.exports = router;