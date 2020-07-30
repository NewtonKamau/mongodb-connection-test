//jshint esversion:6
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { finished } = require('stream');

//host or connection url
const url = 'mongodb://localhost:27017';

//database name
const dbName = 'fruitsDB';
//create a new mongo client 
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//use connection method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('connected successfully to the server ');
    
    const db = client.db(dbName);
    //call the insert methof and close the connection to the db
    findDocuments (db, function () {
        client.close();
    });
});

//create a collection or create a database table
const insertDocuments = function (db, callback) {
    //get the documents collection
    const collection = db.collection('fruits');

    //insert some documents or create method for sql
    collection.insertMany([
        {
            name: 'Apple',
            score: 9,
            review: 'an apple a day surely keeps the doctor away'
        },
        {
            name: 'Banana',
            score: 5,
            review: 'the center of kisii heart for a good reason'
        },
        {
            name: 'Orange',
            score: 3,
            review: 'No wonder Raila never became president'

        }
    ], function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log('Inserted 3 documents into the collection');
            callback(result);
    });
}
//get the db records
const findDocuments = function (db, callback) {
    //get the fruits collection 
    const collection = db.collection('fruits');
    //find some of the fruits
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log('Found the following fruit records');
        console.log(fruits);
        callback(fruits);
    });
}