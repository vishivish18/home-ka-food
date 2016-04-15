var router = require('express').Router()
var User = require('../../models/user')
var Admin = require('../../models/admin')
var jwt = require('jwt-simple')
var config = require('../../../config')


router.post('/', function(req, res, next) {
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    user.save(function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send(201)
        res.json(user);

    })

})


router.get('/', function(req, res, next) {
    if (!req.headers['x-auth']) {
        return res.send(401)
    }

    var auth = jwt.decode(req.headers['x-auth'], config.secret)
    Admin.findOne({
        username: auth.username
    }, function(err, user) {
        if (err) {
            return res.status(403)
        }
        console.log("this is the user from USER GET: " + user)
        User.find(function(err, users) {
            if (err) {
                return next(err)
            }
            res.json(users)
        })



    })
})



/*router.get('/', function(req, res, next) {

    User.find(function(err, users) {
        if (err) {
            return next(err)
        }
        res.json(users)
    })


})*/


module.exports = router
