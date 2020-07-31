//jshint esversion:6
const mongoose = require('mongoose'); 


//host or connection url
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//database name
var fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    rating : String
});
//create a model with singular collection name and the name of the collection as params
const Fruit = new mongoose.model('Fruit', fruitsSchema);
//initialize the model same as insert into in sql
const fruit = new Fruit({
    name: 'Apple',
    rating: 8,
    review: 'An apple a day keeps the doctor away'
});
fruit.save();

var peopleSchema = new mongoose.Schema({
    name: String,
    age:Number
});
const People = new mongoose.model('People', peopleSchema);
const person = new People({
    name: 'John Doe',
    age: 26
    
});
person.save();


