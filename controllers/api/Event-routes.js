const router = require('express').Router();
const {Event} = require('../../models');



router.get('/', (req, res) => {

Event.findAll({
include: {
    model: Event,
    attributes: ['id', 'eventName', 'description', 'date', 'user_id']
}
})
.then(dbEveData => {
    if(!dbEveData) {
    res.status(404).json({message: 'No events found'});
    return;
    }
    res.json(dbEveData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.get('/:id', (req, res) => {

Event.findOne({
where: {
    id: req.params.id
},
include: {
    model: Event,
    attributes: ['id', 'eventName', 'description', 'date', 'user_id']
}
})
.then(dbEveData => {
    if(!dbEveData) {
    res.status(404).json({message: 'No event found'});
    return;
    }
    res.json(dbEveData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.post('/', (req, res) => {
// create a new event
Event.create({
eventName: req.body.eventName
})
.then(dbEveData => res.json(dbEveData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update a event by its `id` value
Event.update(req.body, {
where: {
    id: req.params.id
}
})
.then(dbEveData => {
    if (!dbEveData) {
    res.status(404).json({message:'No event found with this id'});
    return;
    }
    res.json(dbEveData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
// delete an event by its `id` value
Event.destroy({
where: {
    id: req.params.id
}
})
.then(dbEveData => {
    if (!dbEveData){
    res.status(404).json({message: 'No event found with that id.'});
    return;
    }
    res.json(dbEventData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;