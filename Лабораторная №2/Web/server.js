const express = require('express')
// const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose')

const Post = require("./Post")

const request = require('request')
const requestPromise = require('request-promise')
const cheerio = require('cheerio')

const app = express();
var server = require('http').createServer(app)

app.use(
    express.urlencoded({
        extended:false
    })
);

app.use(express.json())
app.use(express.static(__dirname + '/public'));

//app.use(express.static('public'))

mongoose.connect('mongodb+srv://admin:admin@cluster0.xwsvd.mongodb.net', () => {

    console.log('connected')

})

app.get('/', function(req, res) {
    res.sendFile('C:/Users/simon/Documents/Lab-2-main/index.html')
});
app.post('/scoring', function(req, res) {

    var options = {
        method: 'post',
        uri: 'http://localhost:8081/python',
        body: req.body,
        json: true
    }

    requestPromise(options)
        .then(function(parsedBody) {
            console.log(parsedBody)
        })
        .catch(function(err) {
            console.log(err)
        })

    // request('http://localhost:8081/hello', (err, response, body) => {
    //     if (err) return res.status(500).send({message:err})
    //     console.log(body)
    // })

    var scoring = 0;
    console.log(req.body);

    const post = new Post({
        ...req.body
    })

    post.save()
        .then(data => {
            console.log('saved')
        })

    // const url = "mongodb://localhost:3001/"
    // const client = new MongoClient(url)
    // client.connect(function (err, client){
    //     const db = client.db('test_db')
    //     const collection = db.collection('info');
    //     let clientInformation = req.body
    //     collection.insertOne(clientInformation, function (err,result){
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log(result);
    //         console.log(clientInformation);
    //         client.close();
    //     })
    //
    //     db.command({ping: 1}, function(err, result){
    //         if (!err) {
    //             console.log("Подключение выполнено");
    //             console.log(result);
    //         }
    //         client.close();
    //         console.log("Подключение закрыто");
    //     })
    // });

    let age = String(req.body.birthDate);
    age = Number(age[0] + age[1] + age[2] + age[3]);
    let currentDate = new Date();
    let years = currentDate.getFullYear() - age;
    console.log(years);

    if ((years > 60) || (years < 18)) {
        res.send('У вас неподходящий возраст');
        return;
    } else if (years > 22) {
        scoring = scoring + 0.3;
    } else if (years > 20) {
        scoring = scoring + (years-20)*0.1;
    }

    let gender = String(req.body.gender);

    if (gender=="female") {
        scoring = scoring + 0.4;
    }

    let periodLife = Number(req.body.periodLife);

    if (periodLife > 9) {
        scoring = scoring + 0.42;
        console.log('0.42');
    } else {
        scoring = scoring + (0.042 * periodLife);
        console.log(String(0.042 * periodLife));
    }

    let profession = String(req.body.profession);

    if (profession=="low") {
        scoring = scoring + 0.55;
        console.log('low');
    }
    else if (profession=="other") {
        scoring = scoring + 0.16;
        console.log('other');
    }

    let sphere = String(req.body.sphere);

    if (sphere=="public") {
        scoring = scoring + 0.21;
        console.log('public');
    }

    scoring = scoring + 0.059*Number(req.body.periodWork);

    if (req.body.account) {
        scoring = scoring + 0.45;
        console.log('account');
    }

    if (req.body.estate) {
        scoring = scoring + 0.35;
        console.log('estate');
    }

    if (req.body.insurance) {
        scoring = scoring + 0.19;
        console.log('insurance');
    }

    if (scoring < 1.5) {
        res.send("Ваш балл меньше 1.5, вам не одобрен кредит. Ваш балл: "+String(scoring));
    } else {
        res.send("Ваш балл больше 1.5, вам одобрен кредит. Ваш балл: "+String(scoring));
    }

});

app.get('/find/:email', async (req, res) => {
    const email = req.params.email

    const client = await Post.findOne({email}).exec()
    console.log(email)
    console.log(client)

    res.send({client})
})

server.listen(3000);