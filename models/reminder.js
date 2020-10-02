const mongoose = require('mongoose');


const reminderSchema = mongoose.Schema({
	channelId: String,
	timeRequestedString: String,
	timeRequestedMs: Number,
	timeDesiredMs: Number,
})


module.exports = mongoose.model('reminder', reminderSchema);
