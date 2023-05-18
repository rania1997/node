import mongoose from "mongoose";

const {Schema, model} = mongoose;

const carSchema = new Schema(
    {   
        marque: {type: String},
        miseEnCirculation: {type: String},
        kilometrage: {type: String},
        imageFileName: {type: String}
    },
    {
        timestamps: {currentTime: () => Date.now()},
    }
)
export default model("Car", carSchema);