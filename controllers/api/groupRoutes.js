const Users = require('../../models/User');
const { Groups } = require('../../models/index');
const router = require('express').Router();

router.post('/create', async (req, res) => {
  try {
    console.log(req.session.address)
    const newGroup = await Groups.create({
      group_name: req.body.groupName,
      is_paid: req.body.isPaid,
      cost: req.body.cost,
      ownedBy: req.session.user_id
    });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: 'Group name must be unique' });
  }
});

module.exports = router;