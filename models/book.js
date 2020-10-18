const mongoose = require('mongoose');

var bookModel = mongoose.Schema({
	/*userEmail: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	bookId: {
        type: Number,
        required: true
	},*/
	title: String,
	text: String,
	author: String,
	keywords: Array,
	published: {
		type: Date,
		default: Date.now
	}
},{ timestamps: { createdAt: "created_at" }});

module.exports = mongoose.model("Book", bookModel);