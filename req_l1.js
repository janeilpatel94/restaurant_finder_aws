'use strict'; 
var AWS = require('aws-sdk');
console.log('Loading function');

    exports.handler = (event, context, callback) => {
        
    		AWS.config.region = 'us-east-1'; // Region

		var lexruntime = new AWS.LexRuntime();
		var lexUserId = 'chatbot-demo';   //add here
		var sessionAttributes = {};

				// send it to the Lex runtime
				var params = {
					botAlias: '$LATEST',
					botName: 'RestauranInteractor', //RestauranInteractor
					inputText: event.key1,
					userId: lexUserId,
					sessionAttributes: sessionAttributes
				};
				
				lexruntime.postText(params, function(err, data) {
					if (err) {
						console.log(err, err.stack);
						
					}
					if (data) {
						// capture the sessionAttributes for the next cycle
						sessionAttributes = data.sessionAttributes;
						// show response and/or error/dialog status
						callback(null,data.message);
						console.log(data);
						console.log(data.message);
			
						
					}
					// re-enable input
				});
// 			};
};