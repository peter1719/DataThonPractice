// require package
const express = require('express')
const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const app = express()
const port_express = 8888

// let express can use .body to get data
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// use data at '/public'
app.use(express.static((path.join(__dirname, '../public'))))

// Access-Control-Allow-Origin problem
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    next()
})

// listen port
app.listen(port_express, '0.0.0.0', function () {
    console.log('listen on ' + port_express + ' ...')
})
/* -------------------------------------- End Setting --------------------------------------------------- */


// ajax function
app.post('/', function (req, res) {
    // TODO: send data to the front page
    console.log("Request received!");
});


// read file function
// fs.readFile('checklist.json', (err, data) => {
//     checklist = JSON.parse(data)
// })


