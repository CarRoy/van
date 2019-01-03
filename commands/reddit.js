const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
	if(!args[0]) msg.reply("Please specify the subreddit you want to get a random image post from.")
	
	const got = require('got');
	const uniqueRandomArray = require('unique-random-array');
	const EventEmitter = require('eventemitter3');

	const randomCache = {};

	function formatResult(getRandomImage) {
    	const imageData = getRandomImage();
    	if (!imageData) {
        	return;
    	}
    		return `http://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`;
		}

	function storeResults(images, subreddit) {
    	const getRandomImage = uniqueRandomArray(images);

    	randomCache[subreddit] = getRandomImage;
    		return getRandomImage;
		}

	function randomReddit(subreddit) {
    	subreddit = (typeof subreddit === 'string' && subreddit.length !== 0) ? subreddit : args[0];

    	if (randomCache[subreddit]) {
        	return Promise.resolve(formatResult(randomCache[subreddit]));
    	}

    	return got(`https://imgur.com/r/${subreddit}/hot.json`, {json: true})
        	.then(response => storeResults(response.body.data, subreddit))
        	.then(getRandomImage => formatResult(getRandomImage));
		}

		// silly feature to play with observables
		function all(subreddit) {
    		const eventEmitter = new EventEmitter();

    		function emitRandomImage(subreddit) {
        		randomReddit(subreddit).then(imageUrl => {
            	eventEmitter.emit('data', imageUrl + '#' + subreddit);
            	if (eventEmitter.listeners('data').length) {
                	setTimeout(() => emitRandomImage(subreddit), 200);
            	}
        	});
    	}

    	emitRandomImage(subreddit);
    	return eventEmitter;
	}

	function callback(subreddit, cb) {
    randomReddit(subreddit)
        .then(url => cb(null, url))
        .catch(err => cb(err));
	}

	// subreddit is optional
	// callback support is provided for a training exercise
	module.exports = (subreddit, cb) => {
    if (typeof cb === 'function') {
    	callback(subreddit, cb);
    } else if (typeof subreddit === 'function') {
   	 callback(null, subreddit);
    } else {
       return randomPuppy(subreddit);
    }
	};
		
		
	randomReddit()
    	.then(url => {
		msg.channel.send(url);
    })
}

module.exports.help = {
  name: "reddit"
}
