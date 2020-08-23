//Import mongoose
var mongoose = require('mongoose');

// Set up database schema for contacts
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model to make accessible
var Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}