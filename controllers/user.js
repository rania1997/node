import User from '../models/user.js';
import nodemailer from "nodemailer"
import { generateAccessToken, authenticateToken } from '../configuration/auth.js'
export function getAll(req, res) {
    //toDo
    res.status(201).json({ message: 'valid token' });
}

export function signUp(req, res) {
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
        envoyerEmailDeConfirmation(req.body.email, newUser._id)

        res.status(201).json({ message: "Created!", entity: newUser });
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err },);
    });
}

export function getOnce(req, res) {
    User.findOne({ email: req.body.email }).then(user => {

        if (user != null) {
            res.status(201).json({ user: user });
        }
        else {
            res.status(201).json({ message: "on ne peut pas trouver les ressources requis " });
        }
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

export function signIn(req, res) {
    //toDo
    User.findOne({ email: req.body.email }).then(user => {
        if (user != null) {
            if (user.motDePasse == req.body.motDePasse) {
                if (!user.isVerified) {
                    console.log("not verified")
                    res.status(400).json({ message: "not verified" });
                } else {
                    const token = generateAccessToken({ email: req.body.email });
                    res.status(201).json({ message: "bienvenue", token: token });
                }
            }
            else {
                res.status(401).json({ message: "votre mot de passe est incorrecte" });
            }
        }
        else {
            res.status(401).json({ message: "vous devez s'inscrire d'abord!" });
        }
    }).catch(err => {
        res.status(500).json({ message: err.message });
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

export function confirmation(req, res) {

    User.findById(req.params._id, function (err, utilisateur) {
      if (!utilisateur) {
        return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' })
      } else if (utilisateur.isVerified) {
        return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' })
      } else {
        utilisateur.isVerified = true
        utilisateur.save(function (err) {
          if (err) {
            return res.status(500).send({ message: err.message })
          } else {
            return res.status(200).send({ message: 'Votre compte a été verifié' })
          }
        })
      }
    })
  }
  

async function envoyerEmailDeConfirmation(email, id) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASS
        }
    })

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error)
            console.log("Server not ready")
        } else {
            console.log("Server is ready to take our messages")
        }
    })

    const urlDeConfirmation = "http://localhost:3000/user/confirmation/" + id
    console.log(urlDeConfirmation)

    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'Confirmation de votre email',
        html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}
