var db = require('./db')
var user = db.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String

    },
    email: {
        type: String,

    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String

    }
})

module.exports = db.model('User', user)
