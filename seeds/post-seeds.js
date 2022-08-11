const { Post } = require('../models');

const postData = [
    {
        title: "Beach party!",
        post_content: "Come join use at at the beach 7pm Sunday at longbeach",
        user_id: 3
    },
    {
        title: "Cookout",
        post_content: "Cookout at my place come eat it up! my place 12pm",
        user_id: 1
    },
    {
        title: "FOOTBALL SUNDAY",
        post_content: "Come sunday to crack open some beers and enjoy some good ole football",
        user_id: 2

    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;