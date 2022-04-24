import AWS from 'aws-sdk';
import createError from 'http-errors';
import httpStatus from "http-status";
import commonRest from "../util/commonRest";

const dynamodb = new AWS.DynamoDB.DocumentClient()

export async function getTrack(id) {
    let track;

    try {
        const result = await dynamodb.query({
            TableName: process.env.TRACK_TABLE_NAME,
            IndexName: 'track_id',
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeValues: {
                ':id': id
            },
            ExpressionAttributeNames: {
                '#id': 'id'
            }
        }).promise();

        track = result.Items;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    if (!track || track.length === 0) {
        throw new createError.NotFound(`Track "${id}" not found`);
    }

    return track;
}

async function getTrackById(event, context) {
    const {id} = event.pathParameters;
    const track = await getTrack(id);

    return {
        statusCode: httpStatus.Ok,
        body: JSON.stringify(track),
    };
}

export const handler = commonRest(getTrackById);