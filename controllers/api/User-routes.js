
const router = require('express').Router();
const { User, Event, Comment } = require('../../models');
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password]'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Event,
                attributes: [
                    'id',
                    'eventName',
                    'description'
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text'],
                include: {
                    model: Event,
                    attributes: ['eventName']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => res.status(500).send(err));
    
});


router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this username.' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Invalid password.' });
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ message: 'You are now logged in.' });
            });
        })
        .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(500).send(err))
});

module.exports = router;