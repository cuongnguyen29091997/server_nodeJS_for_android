const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    email: {
    	type: String,
    	required: true,
    	unique: true,
    },
    password: {
    	type: String,
    	required: true,
    },
    fullname: String,
    address: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);