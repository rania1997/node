import Garage from '../models/Garage.js';

export async function getAll(req, res) {
    res.status(200).send({message: "success", "garages": await Garage.find()})
}

export async function add(req, res) {
    const {nom, long, lat} = req.body

    console.log(req.body)

    let garage = new Garage()
    garage.nom = nom
    garage.long = long
    garage.lat = lat
    await garage.save()

    res.status(200).send({message: "success", garage})
}