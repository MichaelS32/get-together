const router = require('express').Router();
const { Event, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Event.findAll({
        attributes: ['id',
            'eventName',
            'description',

        ],
        order: [
            ['id']
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
        }
        ]
    })
        .then(dbEventData => res.json(dbEventData.reverse()))
        .catch(err => res.status(500).send(err))

});
router.get('/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'eventName',
            'description'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            where: { event_id: req.params.id },
            attributes: ['id', 'comment_text', 'event_id', 'user_id'],
            include: {
                model: User,
                where: { id: req.params.user_id },
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'No event found with this id' });
                return;
            }
            const event = dbEventData.map(event => event.get({ plain: true }));
            res.render('single-event', {
                event,

            });
        })
        .catch(err => res.status(500).send(err))
});

router.post('/', withAuth, (req, res) => {
    Event.create({
        eventName: req.body.eventName,
        description: req.body.description,
        user_id: req.session.user_id
    })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => res.status(500).send(err))
});

router.put('/:id', withAuth, (req, res) => {
    Event.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.json(dbEventData);
    })
        .catch(err => res.status(500).send(err))
});
router.delete('/:id', withAuth, (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.json(dbEventData);
    })
        .catch(err => res.status(500).send(err))
});

module.exports = router;