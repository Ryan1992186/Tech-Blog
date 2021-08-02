  
//Import models
const Post = require('./PostComment');
const User = require('./User');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'poster_id'
})

Post.hasMany(Comment, {
    foreignKey: 'poster_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = { Post, User, Comment };