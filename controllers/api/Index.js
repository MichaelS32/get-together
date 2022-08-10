const router = require('express').Router();
const commentRoutes = require('./Comment-routes');
const eventRoutes = require('./Event-routes');
const inviteRoutes = require('./Invite-routes');
const userRoutes = require('./User-routes');

router.use('/comment', commentRoutes);
router.use('/event', eventRoutes);
router.use('/invite', inviteRoutes);
router.use('/user', userRoutes);

module.exports = router;