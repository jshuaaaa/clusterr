const Users = require('./User');
const Posts = require('./Post');
const Comment = require('./Comment');
const Groups = require('./Group');
const UserGroups = require('./UserGroups');
const Friends = require('./Friends');

Posts.belongsTo(Users);

Users.hasMany(Posts);

Posts.hasMany(Comment);

UserGroups.hasMany(Users);

UserGroups.hasMany(Groups);

Friends.hasMany(Users);

module.exports = { Users, Posts, Comment, Groups, UserGroups, Friends };