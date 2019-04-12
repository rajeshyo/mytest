const express = require('express')
const users = express.Router()
const cors = require('cors')

const Apartment = require('../models/Apartment.js');
const User = require('../models/User.js');
users.use(cors())


exports.apartment = (req, res) => {
  const today = new Date()
  const apartmentdata = {
    name: req.body.name,
    mobile: req.body.mobile,
    lat: req.body.lat,
    long: req.body.long,
    created: today
  }

  Apartment.findOne({
    include: [{
        model: User, as: 'User_Apartment',
        where: {
            id: req.body.id,
        }
    }]
  })
    //TODO bcrypt
    .then(apartment => {
      if (!apartment) {
        Apartment.create(apartmentdata)
      } else {
        res.json({ error: 'apartment already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


exports.apartmentdetails = (req, res) => {
  Apartment.findAll({
        // where: {
        //   id: req.body.id,
        // }
      })
        .then(apartment => {
          if (apartment) {
            res.json(apartment)
          } else {
            res.send('apartment does not exist')
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
}
//User.belongsTo(Apartment, {as: 'User_Apartment', foreignKey: 'User_id'});
//db.sponzor.hasMany( db.donation , {as:'donations', foreignKey:'donations'});
// Apartment.belongsTo(User, {as: 'User_Apartment', foreignKey: 'Apartment_id'});
// module.exports = users
