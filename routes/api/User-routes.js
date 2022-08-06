
const router = require('express').Router();
const {User} = require('../../models');



router.get('/', (req, res) => {

User.findAll({
include: {
    model: User,
    attributes: ['id', 'firstName', 'lastName', 'username', 'password']
}
})
.then(dbUseData => {
    if(!dbUseData) {
    res.status(404).json({message: 'No User found'});
    return;
    }
    res.json(dbUseData);
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
    attributes: ['id', 'firstName', 'lastName', 'username', 'password']
}
})
.then(dbUseData => {
    if(!dbUseData) {
    res.status(404).json({message: 'No User found'});
    return;
    }
    res.json(dbUseData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.post('/', (req, res) => {
// create a new User
User.create({
UserName: req.body.UserName
})
.then(dbUseData => res.json(dbUseData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update an User by its `id` value
User.update(req.body, {
where: {
    id: req.params.id
}
})
.then(dbUseData => {
    if (!dbUseData) {
    res.status(404).json({message:'No User found with this id'});
    return;
    }
    res.json(dbUseData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
// delete an User by its `id` value
User.destroy({
where: {
    id: req.params.id
}
})
.then(dbUseData => {
    if (!dbUseData){
    res.status(404).json({message: 'No User found with that id.'});
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