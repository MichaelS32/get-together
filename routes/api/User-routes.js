//  UPDATE ATTRIBUTES WHEN MODELS ARE FINISHED
//  STILL NEEDS TO BE FINISHED

const router = require('express').Router();
const {User} = require('../../models');



router.get('/', (req, res) => {

User.findAll({
include: {
    model: User,
    attributes: []
}
})
.then(dbInvData => {
    if(!dbInvData) {
    res.status(404).json({message: 'No User found'});
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

User.findOne({
where: {
    id: req.params.id
},
include: {
    model: User,
    attributes: []//fill in the rest ASAP//
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
User.create({
UserName: req.body.UserName
})
.then(dbInvData => res.json(dbInvData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update an Invite by its `id` value
User.update(req.body, {
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
User.destroy({
where: {
    id: req.params.id
}
})
.then(dbInvData => {
    if (!dbInvData){
    res.status(404).json({message: 'No Invite found with that id.'});
    return;
    }
    res.json(dbUserData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;