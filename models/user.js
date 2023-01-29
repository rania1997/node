import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        }, 
        email:{
            type:String,
            required:true,
            
        },
        motDePasse: {
            type: String,
            required: true
        },
        dateDeNaissance: {
            type: Date,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false 
        }
    },
    {
        timestamps: true
    }
);

export  default model("User",userSchema);