const { Groups } = require('../models/index');

const groupData = [
    {
        ownedBy: 'cloudComputing',
        group_name: "EpicGamers",
        is_paid: false,
        cost: 0,
    },
    {
        ownedBy: 'cloudComputing',
        group_name: "CodingBros",
        is_paid: false,
        cost: 0,
    }

]

const seedGroups = () => Groups.bulkCreate(groupData);

module.exports = seedGroups