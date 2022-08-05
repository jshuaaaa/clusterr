const Users = require('../../models/User');
const { Groups } = require('../../models/index');
const router = require('express').Router();

router.post('/create', async (req, res) => {
  try {
    const newGroup = await Groups.create({
      group_name: req.body.group_name,
      is_paid: req.body.paid
    });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: 'Group name must be unique' });
  }
});

module.exports = router;