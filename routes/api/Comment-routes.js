const router = require('express').Router();
const {Comment} = require('../../models');



router.get('/', (req, res) => {

Comment.findAll({
include: {
    model: Comment,
    attributes: ['id', 'comment_text', 'user_id', 'event_id']
}
})
.then(dbComData => {
    if(!dbComData) {
    res.status(404).json({message: 'No comments found'});
    return;
    }
    res.json(dbComData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.get('/:id', (req, res) => {

Comment.findOne({
where: {
    id: req.params.id
},
include: {
    model: Comment,
    attributes: ['id', 'comment_text', 'user_id', 'event_id']
}
})
.then(dbComData => {
    if(!dbComData) {
    res.status(404).json({message: 'No comment found'});
    return;
    }
    res.json(dbComData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.post('/', (req, res) => {
// create a new comment
Comment.create({
comment_text: req.body.comment_text
})
.then(dbComData => res.json(dbComData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
// update a comment by its `id` value
Comment.update(req.body, {
where: {
    id: req.params.id
}
})
.then(dbComData => {
    if (!dbComData) {
    res.status(404).json({message:'No comment found with this id'});
    return;
    }
    res.json(dbComData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
// delete a comment by its `id` value
Comment.destroy({
where: {
    id: req.params.id
}
})
.then(dbComData => {
    if (!dbComData){
    res.status(404).json({message: 'No comment found with that id.'});
    return;
    }
    res.json(dbCommentData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;