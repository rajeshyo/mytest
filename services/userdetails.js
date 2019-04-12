const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Apartment = require('../models/Apartment')
users.use(cors())

process.env.SECRET_KEY = 'rajeshapisecretkey'

exports.register = (req, res) => {
  const today = new Date()
	var random = Math.random().toString(36).substr(2);
  const userData = {
    first_name: req.body.first_name,
    mobile: req.body.mobile,
    email: req.body.email,
    deviceid: random,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

exports.profile = (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
Apartment.belongsTo(User, {as: 'User_Apartment', foreignKey: 'User_id'});
//User.hasMany( Apartment , {as:'Apartment', foreignKey:'User_Apartment_id'});

//db.sponzor.hasMany( db.donation , {as:'donations', foreignKey:'donations'});

// module.exports = users
