var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

// var Users = require('./routes/Users')
require('./routes/Users.js')(app);
require('./routes/Apartments.js')(app);
// app.use('/users', Users)

const db = require('./database/db.js');
//force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  
});

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
