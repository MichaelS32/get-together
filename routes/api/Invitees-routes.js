//  UPDATE ATTRIBUTES WHEN MODELS ARE FINISHED

const router = require('express').Router();
const {Invitees} = require('../../models');



router.get('/', (req, res) => {

Invitees.findAll({
include: {
    model: Invitees,
    attributes: ['id', 'attending', 'event_id', 'user_id']
}
})
.then(dbInvData => {
    if(!dbInvData) {
    res.status(404).json({message: 'No Invitees found'});
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

Invitees.findOne({
where: {
    id: req.params.id
},
include: {
    model: Invitees,
    attributes: ['id', 'attending', 'event_id', 'user_id']
}
})
.then(dbInvData => {
    if(!dbInvData) {
    res.status(404).json({message: 'No Invitee found'});
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
Invitees.create({
InviteesName: req.body.InviteesName
})
.then(dbInvData => res.json(dbInvData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update an Invite by its `id` value
Invitees.update(req.body, {
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
Invitees.destroy({
where: {
    id: req.params.id
}
})
.then(dbInvData => {
    if (!dbInvData){
    res.status(404).json({message: 'No Invite found with that id.'});
    return;
    }
    res.json(dbInviteesData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;