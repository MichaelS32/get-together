const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Event } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Event.findAll({
        attributes: [
            'id',
            'eventName',
            'description',
            // 'date'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'event_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbEventData => {
            const event = dbEventData.map(event => event.get({ plain: true }));

            res.render('homepage', {
                event,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/event/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'eventName',
            // 'date'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'event_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('single-event', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
