import Garage from '../models/Garage.js';
import Reclamation from '../models/Reclamation.js';
import mongoose from 'mongoose';
import { sendMailBolt } from '../Services/Mailer.js';

export async function getAll(req, res) {
    res.status(200).send({message: "success", "reclamations": await Reclamation.find({garage:mongoose.Types.ObjectId("6395d0c45bf2eb8d847970ad")})})
}

export async function add(req, res) {
    const {description, idGarage} = req.body

    console.log(req.body)
    const garage = Garage.findById(idGarage)
    let reclamation = new Reclamation({description:description,garage:mongoose.Types.ObjectId(idGarage)})
    // reclamation.description = description
    
    // reclamation.garage = garage._id
    // await reclamation.save();
   await reclamation.save(function(error) {
        if (!error) {
            Reclamation.find({})
                .populate('garage')
                .exec(function(error, reclamations) {
                    console.log(JSON.stringify(reclamations, null, "\t"))
                })
        }
    });
    // let countReclamation = Reclamation.count({garage:mongoose.Types.ObjectId(idGarage)})
    // if(countReclamation>3) {
    //     sendMailBolt("receiverEmail","subject","text exemple: vous avez été réclamer plusieurs fois")
    // }


    
    // garage.reclamations.push(reclamation._id);
    // await garage.save()

    res.status(200).send({message: "success", reclamation})
}