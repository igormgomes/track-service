import {v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
import validator from '@middy/validator';
import createError from 'http-errors';
import httpStatus from "http-status";
import commonRest from '../util/commonRest';
import createTrackSchema from '../util/schemas/createTrackSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createTrack(event, context) {
    const {order_number} = event.body;
    const deliveryEstimate = new Date();
    deliveryEstimate.setHours(deliveryEstimate.getHours() + 12);

    const track = {
        id: uuid(),
        order_number: order_number,
        status: 'IN_PREPARATION',
        delivery_estimate: deliveryEstimate,
        create_at: new Date().toISOString()
    };

    try {
        await dynamodb.put({
            TableName: process.env.TRACK_TABLE_NAME,
            Item: track,
        }).promise();
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: httpStatus.CREATED,
        body: JSON.stringify(track),
    };
}

export const handler = commonRest(createTrack)
    .use(validator({
        inputSchema: createTrackSchema,
        ajvOptions: {
            useDefaults: true,
            strict: false
        }
    }));