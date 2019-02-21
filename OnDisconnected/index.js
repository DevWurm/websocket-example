const {DynamoDB} = require('aws-sdk');

const db = new DynamoDB.DocumentClient();

const TableName = 'Clients';

exports.handler = async (event) => {
    await db.delete({
      TableName,
      Key: {
        connectionId : event.requestContext.connectionId,
      }
    }).promise();
    
    return {};
};