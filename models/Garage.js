import mongoose from "mongoose";

const {Schema, model} = mongoose;

const garageSchema = new Schema(
    {
        nom: {type: String},
        long: {type: Number},
        lat: {type: Number},
        // reclamations : [{type: Schema.Types.ObjectId,
        // ref:'Reclamation'}]
    },
    {
        timestamps: {currentTime: () => Date.now()},
    }
)
export default model("Garage", garageSchema);