const {SNS} = require('aws-sdk');

const sns = new SNS();

const TopicArn = 'arn:aws:sns:us-east-1:693883426543:DataProcessed';

exports.handler = async (event) => {
    const {connectionId, data} = JSON.parse(event.Records[0].Sns.Message);

    const processedData = data.length;
    
    await sns.publish({
      TopicArn,
      Message: JSON.stringify({
          connectionId,
          data: processedData,
      })
    }).promise();
    
    return {};
};