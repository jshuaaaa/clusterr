const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedGroups = require("./groups-seed")

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----');

  await seedUsers();
  console.log('\n----- USERS SYNCED -----');

  await seedPosts();
  console.log('\n----- POSTS SYNCED -----');

  await seedGroups();
  console.log('\n----- POSTS SYNCED -----');

  process.exit(0);
};

seedAll();