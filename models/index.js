const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Invite = require('./Invite');

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
    foreignKey: 'event_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Event.hasMany(Comment, {
    foreignKey: 'event_id',
    onDelete: "cascade"
});

Event.hasMany(Invite, {
    foreignKey: 'event_id',
    onDelete: "cascade"
})

Invite.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: "cascade"
});

module.exports = { User, Event, Comment, Invite };