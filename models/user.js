const mongoose = require('mongoose');
const reminderSchema = require('./reminder').schema;


const userSchema = mongoose.Schema({
	userId: String,
	reminders: [reminderSchema]
});


module.exports = mongoose.model('user', userSchema);
