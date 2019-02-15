const Tweet = require('../models/Tweet');

module.exports = {

    async index(req, res){
            // O sinal de menos é para ordem contraria
        const tweets = await Tweet.find({}).sort('-creteadAt');

        return res.json(tweets);


    },

    async store(req, res){

        //Pegando o corpo da requisiç~~ao em req.body
        const tweet = await Tweet.create(req.body)

        //Avisar toda a plicação que existe um novo tweet
        req.io.emit('tweet',tweet);

        return res.json(tweet);

    }

};
