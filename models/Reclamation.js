import mongoose from "mongoose";

const {Schema, model} = mongoose;

const reclamationSchema = new Schema(
    {
        description: {type: String},
        garage: {
            type: Schema.Types.ObjectId,
            ref: "Garage",
            require:true
        },
        
    },
    {
        timestamps: {currentTime: () => Date.now()},
    }
)
export default model("Reclamation", reclamationSchema);

