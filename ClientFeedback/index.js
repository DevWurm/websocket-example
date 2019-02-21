const AWS = require('aws-sdk');
require('aws-sdk/clients/apigatewaymanagementapi');
const {DynamoDB, ApiGatewayManagementApi} = AWS;

const TableName = 'Clients';
const db = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const {connectionId, data} = JSON.parse(event.Records[0].Sns.Message);
    
    const {domain, stage} = (await db.get({TableName, Key: {connectionId}}).promise()).Item;

    const body = JSON.stringify({data});
    
    await new ApiGatewayManagementApi({
        endpoint: domain + '/' + stage,
    }).postToConnection({ ConnectionId: connectionId, Data: JSON.stringify({data})}).promise();

    return {};
};