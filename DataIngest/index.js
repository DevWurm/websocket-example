const {SNS} = require('aws-sdk');

const sns = new SNS();

const TopicArn = 'arn:aws:sns:us-east-1:693883426543:DataUploaded';

exports.handler = async (event) => {
    const {data} = JSON.parse(event.body);
    
    await sns.publish({
      TopicArn,
      Message: JSON.stringify({
          connectionId: event.requestContext.connectionId,
          data,
      })
    }).promise();
    
    return {};
};