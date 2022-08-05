const Users = require('./User');
const Posts = require('./Post');
const Comment = require('./Comment');
const Groups = require('./Group');

Posts.belongsTo(Users);

Users.hasMany(Posts);

Posts.hasMany(Comment)

module.exports = { Users, Posts, Comment, Groups };