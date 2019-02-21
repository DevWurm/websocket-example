const {DynamoDB} = require('aws-sdk');

const db = new DynamoDB.DocumentClient();

const TableName = 'Clients';

exports.handler = async (event) => {
    await db.put({
      TableName,
      Item: {
        connectionId : event.requestContext.connectionId,
        domain: event.requestContext.domainName,
        stage: event.requestContext.stage,
      }
    }).promise();
    
    return {};
};
