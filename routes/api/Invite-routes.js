const router = require('express').Router();
const {Invite} = require('../../models');



router.get('/', (req, res) => {

Invite.findAll({
include: {
    model: Invite,
    attributes: ['id', 'attending', 'event_id', 'user_id']
}
})
.then(dbInvData => {
    if(!dbInvData) {
    res.status(404).json({message: 'No Invite found'});
    return;
    }
    res.json(dbInvData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.get('/:id', (req, res) => {

Invite.findOne({
where: {
    id: req.params.id
},
include: {
    model: Invite,
    attributes: ['id', 'attending', 'event_id', 'user_id']
}
})
.then(dbInvData => {
    if(!dbInvData) {
    res.status(404).json({message: 'No Invite found'});
    return;
    }
    res.json(dbInvData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.post('/', (req, res) => {
// create a new Invite
Invite.create({
InviteName: req.body.InviteName
})
.then(dbInvData => res.json(dbInvData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update an Invite by its `id` value
Invite.update(req.body, {
where: {
    id: req.params.id
}
})
.then(dbInvData => {
    if (!dbInvData) {
    res.status(404).json({message:'No Invite found with this id'});
    return;
    }
    res.json(dbInvData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
// delete an Invite by its `id` value
Invite.destroy({
where: {
    id: req.params.id
}
})
.then(dbInvData => {
    if (!dbInvData){
    res.status(404).json({message: 'No Invite found with that id.'});
    return;
    }
    res.json(dbInviteData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;