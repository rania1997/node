import Car from '../models/Car.js';

export async function getAll(req, res) {
    res.status(200).send({message: "success", "cars": await Car.find()})
}

export function deleteOnce(req, res) {
  Car.findByIdAndDelete(req.params._id)
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error : err});
    });
}




export async function add(req, res) {
    console.log("HI")
    const { marque, miseEnCirculation, kilometrage } = req.body

    console.log(req.body)
    console.log(req.file)

    let imageFile;
    if (req.file.filename){
        imageFile = req.file.filename
    }

    let car = new Car()

    car.imageFileName =  imageFile != null ? imageFile : null
    car.marque = marque
    car.miseEnCirculation = miseEnCirculation
    car.kilometrage = kilometrage
    await car.save()

    res.status(200).send({message: "success", car})
}