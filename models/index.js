const Users = require('./User');
const Posts = require('./Post');
const Comment = require('./Comment');
const Groups = require('./Group');
const UserGroups = require('./UserGroups');

Posts.belongsTo(Users);

Users.hasMany(Posts);

Posts.hasMany(Comment);

UserGroups.hasMany(Users);

UserGroups.hasMany(Groups);

module.exports = { Users, Posts, Comment, Groups, UserGroups };