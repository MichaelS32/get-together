const router = require('express').Router();
const commentRoutes = require('./Comment-routes');
const eventRoutes = require('./Event-routes');
const inviteesRoutes = require('./Invitees-routes');
const userRoutes = require('./User-routes');

router.use('/comment', commentRoutes);
router.use('/event', eventRoutes);
router.use('/invitees', inviteesRoutes);
router.use('/user', userRoutes );

module.exports = router;