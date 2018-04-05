'use strict';

const yelp = require('yelp-fusion');
const AWS = require("aws-sdk");

const sqs = new AWS.SQS({region : 'us-east-1'});
const queueUrl = "https://sqs.us-east-1.amazonaws.com/648606393740/restFinderAppQueue";

const apiKey = ''; // api key removed to avoid any troubles

exports.handler = (event, context, callback) => {
  
  var params = {
        MaxNumberOfMessages: 10,
        QueueUrl: queueUrl,
        VisibilityTimeout: 60 // 10 min wait time for anyone else to process.
        //WaitTimeSeconds: 0
    };
    
  sqs.receiveMessage(params, function(err, data) {
    if(err) {
            //res.send(err);
            console.log(err);
    } 
    else {
      
      var msg = "";
      var recHandle = "";
      
      data.Messages.forEach(function(key) {
        
        msg = key.Body;
        recHandle = key.ReceiptHandle;

        var MsgObj = JSON.parse(msg);
  
        const searchRequest = {
          term: MsgObj.term,
          location: MsgObj.location,
          limit: MsgObj.limit,
          open_at:MsgObj.open_at
        };
  
        const client = yelp.client(apiKey);
  
        client.search(searchRequest).then(response => {
  
            const firstResult = response.jsonBody.businesses[0];
            const firstResultJson = JSON.stringify(firstResult, null, 4);
            //console.log(firstResultJson);
        
            const secondResult = response.jsonBody.businesses[1];
            const secondResultJson = JSON.stringify(secondResult, null, 4);
            //console.log(secondResultJson);
        
            const thirdResult = response.jsonBody.businesses[2];
            const thirdResultJson = JSON.stringify(thirdResult, null, 4);
            //console.log(thirdResultJson);
        
            var obj1 = JSON.parse(firstResultJson);
            var id1 = obj1.id;
            var name1 = obj1.name;
            var url1 = obj1.url;
        
            var obj2 = JSON.parse(secondResultJson);
            var id2 = obj2.id;
            var name2 = obj2.name;
            var url2 = obj2.url;
        
            var obj3 = JSON.parse(thirdResultJson);
            var id3 = obj3.id;
            var name3 = obj3.name;
            var url3 = obj3.url;
        
            var str1 = "Suggestion 1\n\nRestaurant ID:" + id1 + "\nRestaurant Name:" + name1 + "\nURL:" + url1;
            var str2 = "Suggestion 2\n\nRestaurant ID:" + id2 + "\nRestaurant Name:" + name2 + "\nURL:" + url2;
            var str3 = "Suggestion 3\n\nRestaurant ID:" + id3 + "\nRestaurant Name:" + name3 + "\nURL:" + url3;
        
            var str = str1 + "\n\r" + str2 + "\n\r" + str3;
        
            var sns = new AWS.SNS();
            var params = {
              Message: str, 
              Subject: "Restaurant Suggestions From RestFinder",
              PhoneNumber: MsgObj.PhoneNumber
            };
            
            console.log("published: " + recHandle);
            sns.publish(params, function(err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(data);           // successful response
            });
  
        }).catch(e => {
          console.log(e);
        });
        
        function deleteMessage(receiptHandle, cb) {
          sqs.deleteMessage({
            ReceiptHandle: receiptHandle,
            QueueUrl: queueUrl
          }, cb);
        }
        
        deleteMessage(recHandle, callback);
      });  
    } 
  });
};