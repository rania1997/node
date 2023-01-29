import Car from '../models/Car.js';

export async function getAll(req, res) {
    res.status(200).send({message: "success", "cars": await Car.find()})
}

export async function add(req, res) {
    const {numeroSerie,marque, miseEnCirculation, kilometrage} = req.body

    console.log(req.body)

    let car = new Car()
    car.numeroSerie = numeroSerie
    car.marque = marque
    car.miseEnCirculation = miseEnCirculation
    car.kilometrage = kilometrage
    await car.save()

    res.status(200).send({message: "success", car})
}