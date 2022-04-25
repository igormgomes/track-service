import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
import {getTrackAndStatus} from './getTrackById'

async function dispatchTrack(event, context) {
    const record = event.Records[0];
    console.log(record)

    const {id} = JSON.parse(record.body);
    try {
        let track = await getTrackAndStatus(id, 'IN_PREPARATION');
        track.status = 'IN_TRANSIT';
        track.update_at = new Date().toISOString();

        await dynamodb.put({
            TableName: process.env.TRACK_TABLE_NAME,
            Item: track,
        }).promise();

        console.log(`Track in transit ${track.id}`);
    } catch (error) {
        console.log(error);
    }

    return event
}

export const handler = dispatchTrack;