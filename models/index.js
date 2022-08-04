const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');

User.hasMany(Event, {
    foreignKey: 'user_id'
});
Event.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Event, {
    foreignKey: 'Event_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Event.hasMany(Comment, {
    foreignKey: 'Event_id',
    onDelete: "cascade"
})
module.exports = { User, Event, Comment };