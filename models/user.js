const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

var userModel = mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true
	},
	password: {
        type: String,
        required: true,
		trim: true
	},
	role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
	avatar: { 
		type: String,
		data: Buffer,
		contentType: String
	},
	nickname: { 
		type: String,
		unique: true,
		trim: true
	}
},{ timestamps: { createdAt: "created_at" }});

userModel.methods = {
	authenticate: function (password) {
		return jwt.sign({email: this.email}, config.secret);
	},
	getToken: function () {
		return jwt.sign({email: this.email}, config.secret);
	}
}

userModel.statics = {
	getUser: function (token) {
		return jwt.verify(token, config.secret);
	}
}

module.exports = mongoose.model("User", userModel);