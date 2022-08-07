const { Groups } = require('../models/index');

const groupData = [
    {
        ownedBy: 'cloudComputing',
        group_name: "Epic Gamers",
        is_paid: false,
        cost: 0,
    },
    {
        ownedBy: 'cloudComputing',
        group_name: "Coding Bros",
        is_paid: false,
        cost: 0,
    }

]

const seedGroups = () => Groups.bulkCreate(groupData);

module.exports = seedGroups