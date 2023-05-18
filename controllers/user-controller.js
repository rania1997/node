import Utilisateur from "../models/user.js"
import jwt  from "jsonwebtoken"

import nodemailer from 'nodemailer'

///// LINKS ---------------------------------------------------------

export async function motDePasseOublie (req, res)  {
  const codeDeReinit = req.body.codeDeReinit
  const utilisateur = await Utilisateur.findOne({ "email": req.body.email })

  if (utilisateur) {
    // token creation
    const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email }, "09f26e402586e2faa8da4c98a35f1b20d6b033c60", {
      expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
    })

    envoyerEmailReinitialisation(req.body.email, codeDeReinit)

    res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + utilisateur.email })
  } else {
    res.status(400).send({ "message": "Utilisateur innexistant" })
  }
}

export async function changerMotDePasse (req, res) {
  const { email, nouveauMotDePasse } = req.body

  

  let utilisateur = await Utilisateur.findOneAndUpdate(
    { email: email },
    {
      $set: {
        motDePasse: nouveauMotDePasse
      }
    }
  )

  res.send({ utilisateur })
}


///// FUNCTIONS ---------------------------------------------------------



async function envoyerEmailReinitialisation(email, codeDeReinit) {
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

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Reinitialisation de votre mot de passe ',
    html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent : ' + info.response)
    }
  })
}