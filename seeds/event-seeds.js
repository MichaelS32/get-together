const { Event } = require('../models');

const eventData = [
    {
        eventName: "Beach party!",
        description: "Come join use at at the beach 7pm Sunday at longbeach",
        user_id: 3
    },
    {
        eventName: "Cookout",
        description: "Cookout at my place come eat it up! my place 12pm",
        user_id: 1
    },
    {
        eventName: "FOOTBALL SUNDAY",
        description: "Come sunday to crack open some beers and enjoy some good ole football",
        user_id: 2

    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;