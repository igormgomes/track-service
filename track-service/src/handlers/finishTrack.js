import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function finishTrack(event, context) {
    console.log('Initializing finish track');

    try {
        const result = await dynamodb.query({
            TableName: process.env.TRACK_TABLE_NAME,
            IndexName: 'track_status',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeValues: {
                ':status': 'IN_TRANSIT'
            },
            ExpressionAttributeNames: {
                '#status': 'status'
            }
        }).promise();

        if(result.Items.length ===0) {
            console.log('Nothing found for delivery')
            return ;
        }

        for (const track of result.Items) {
            track.status = 'DELIVERED';
            track.update_at = new Date().toISOString();
            await dynamodb.put({
                TableName: process.env.TRACK_TABLE_NAME,
                Item: track,
            }).promise();
            console.log(`Track delivered ${track.id}`);
        }

    } catch (error) {
        console.log(error);
    }

    return event
}

export const handler = finishTrack;