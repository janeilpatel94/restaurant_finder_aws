var QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/500662263056/JQueue1';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({region : 'us-east-1'});
var message = "";

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const City = slots.City;
    const Area = slots.Area;
    const Cuisine = slots.Cuisine;
    const DiningDate = slots.DiningDate;
    const DiningTime = slots.DiningTime;
    const NoOfPeople = slots.NoOfPeople;
    const PhoneNumber = slots.PhoneNumber;
    
    
    message = "{ term: '" + Cuisine + "', " + "location: '" + Area + ", " + City + "', " + "PhoneNumber: '" + PhoneNumber + "', limit: 3}";
    console.log(message);
    
   callback(close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': `Okay, I will send an sms at ${PhoneNumber} and provide suggestion for a place in ${Area}, ${City} having a ${Cuisine} cuisine on ${DiningDate} ${DiningTime} for ${NoOfPeople} people`}));
    
  
    var params = {
        //MessageBody: JSON.stringify("Hello"),
        MessageBody: JSON.stringify(eval("(" + message + ")")),
        QueueUrl: QUEUE_URL
    };
  
    sqs.sendMessage(params, function(err,data){
        if(err) {
            console.log('error:',"Fail Send Message- " + err);
            //callback('error', "ERROR Put SQS");  // ERROR with message
        }else{
            console.log('data:',data.MessageId);
            //callback(null,'');  // SUCCESS 
        }
    });
}


exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};