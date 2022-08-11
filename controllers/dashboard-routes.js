const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Event.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: [
            'id',
            'eventName',
            'description',
            // 'created_at',
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attirbutes: ['username']
        }]
    })
        .then(dbEventData => {
            const events = dbEventData.map(event => event.get({ plain: true }));
            res.render('dashboard', { events, loggedIn: true });
        })
        .catch(err => res.status(500).send(err))
});

router.get('/edit/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'eventName',
            'description',
            // 'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'event_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }]
    })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'No event found with this id.' });
                return;
            }

            const event = dbEventData.get({ plain: true });
        })
})

router.get('/new', (req, res) => {
    res.render('create-event');
});

module.exports = router;