const Users = require('./User');
const Posts = require('./Post');
const Comment = require('./Comment');
const Groups = require('./Group');
const UserGroups = require('./UserGroups');

Posts.belongsTo(Users);

Posts.belongsTo(Groups)

Users.hasMany(Posts);

Posts.hasMany(Comment);

Groups.hasMany(Posts)

UserGroups.hasMany(Users);

UserGroups.hasMany(Groups);

module.exports = { Users, Posts, Comment, Groups, UserGroups };