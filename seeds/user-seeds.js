const { Users } = require('../models/index');

const userData = [
  {
    username: 'realstuff102',
    password: 'pass1234'
  },
  {
    username: 'beanman03',
    password: '12password'
  },
  {
    username: 'takoyaki12',
    password: 'wordofpass12'
  },
  {
    username: 'tonkatsuOG',
    password: 'spicynoodl'
  },
  {
    username: 'Monkey D. Luffy',
    password: 'onepiece'
  },
  {
    username: 'hokage01',
    password: 'uzumaki12'
  },
  {
    username: 'borutosucks',
    password: 'itreallydoes'
  },
  {
    username: 'skyisland',
    password: 'believeit'
  },
  {
    username: 'seattleIsAwesome',
    password: 'JShackers'
  },
  {
    username: 'cloudComputing',
    password: 'forgetQuantum'
  },
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;