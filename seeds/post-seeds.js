const { Posts } = require('../models/index');

const postData = [
  {
    posted_by: 'realstuff102',
    post_content: 'I really have some real stuff!'
  },
  {
    posted_by: 'beanman03',
    post_content: 'I really love me some beans man!'
  },
  {
    posted_by: 'takoyaki12',
    post_content: 'Takoyaki is the best way to eat octopus!'
  },
  {
    posted_by: 'tonkatsuOG',
    post_content: 'You have to try some tonkatsu ramen!'
  },
  {
    posted_by: 'Monkey D. Luffy',
    post_content: 'I will be the king of pirates!!'
  },
  {
    posted_by: 'hokage01',
    post_content: 'Gotta get to some paperwork...zzzz'
  },
  {
    posted_by: 'borutosucks',
    post_content: 'The arcs just do not compare...'
  },
  {
    posted_by: 'skyisland',
    post_content: 'It exists, I am telling youuuu....'
  },
  {
    posted_by: 'seattleIsAwesome',
    post_content: 'Seattle cost of living is a lot lower than other hot spots for software engineers'
  },
  {
    posted_by: 'cloudComputing',
    post_content: 'Quantum computing is pretty awesome, but cloud computing is already here!'
  },
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;