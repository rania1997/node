import User from '../models/user.js';
import {generateAccessToken,authenticateToken} from '../configuration/auth.js'
export function getAll(req,res) {
    //toDo
res.status(201).json({message:'valid token'});
}

export function signUp(req,res) {
    //toDO
    User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        dateDeNaissance: req.body.dateDeNaissance,
        adresse: req.body.adresse,
        //image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    }).then(newUser => {
    res.status(201).json({message:"Created!", entity: newUser});
}).catch(err=> {
    console.log(err)
    res.status(500).json({error:err},);
});
}

export function getOnce(req,res){
    User.findOne({email:req.body.email}).then(user =>{
        
        if(user!=null) {
            res.status(201).json({user:user});
        }
        else {
            res.status(201).json({message:"on ne peut pas trouver les ressources requis "});
        }
    }).catch(err=>{
        res.status(500).json({message:err.message});
    });
}

export function signIn(req,res) {
    //toDo
    User.findOne({email:req.body.email}).then(user =>{
        if(user!=null) {
            if(user.motDePasse == req.body.motDePasse) {
                const token = generateAccessToken({ email: req.body.email });
                res.status(201).json({message:"bienvenue",token:token});            
            }
            else {
                res.status(401).json({message:"votre mot de passe est incorrecte"});
            }
        }
        else {
            res.status(401).json({message:"vous devez s'inscrire d'abord!"});
        }
    }).catch(err=>{
        res.status(500).json({message:err.message});
    });
}

export function putOnce(req, res) {
    //toDo
}

export function patchOnce(req, res) {
    //toDo
}

export function deleteOnce(req, res) {
    //toDo
}