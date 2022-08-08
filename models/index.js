const Users = require('./User');
const Posts = require('./Post');
const Comment = require('./Comment');
const Groups = require('./Group');
const UserGroups = require('./UserGroups');
const Friends = require('./Friends');
const Comments = require('./Comment');

Posts.belongsTo(Users, {foreignKey: 'posted_by', targetKey: 'username'});

Posts.belongsTo(Groups, {foreignKey: 'for_group', targetKey: 'group_name'})

Posts.hasMany(Comments)

Comments.belongsTo(Posts, {foreignKey: 'on_post', targetKey: 'id'})

Comments.belongsTo(Users, {foreignKey: 'comment_by', targetKey: 'username'})

Friends.hasMany(Users)

Groups.belongsTo(Users, {foreignKey: 'ownedBy', targetKey: 'username'})

Groups.belongsTo(UserGroups, {foreignKey: 'group_name', targetKey: 'group_name'})

UserGroups.hasMany(Users)

UserGroups.hasMany(Groups)

Users.hasMany(Posts)

Users.hasMany(Comments)

Users.hasMany(Groups)

Users.belongsTo(Friends, {foreignKey: 'username', targetKey: 'user'})

Users.belongsTo(Friends, {foreignKey: 'username', targetKey: 'friend'})



// Users.hasMany(Posts);

// Groups.hasMany(Posts)

// UserGroups.hasMany(Users);

// UserGroups.hasMany(Groups);

// Friends.hasMany(Users);

module.exports = { Users, Posts, Comment, Groups, UserGroups, Friends };