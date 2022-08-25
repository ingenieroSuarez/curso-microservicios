import * as moongose from 'mongoose';

export const FlightSchema = new moongose.Schema(
    {
        pilot: { type: String, required: true },
        airplane: { type: String, required: true },
        destinationCity: { type: String, required: true },
        flightDate: { type: Date, required: true },
        passengers:[{type: moongose.Schema.Types.ObjectId, ref: 'passengers' }]
    },
    {timestamps:true}
)