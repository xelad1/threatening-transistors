// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var Goal = require('../models/goal');

var Goals = new db.Collection();

Goals.model = Goal;

module.exports = Goals;