var router = require('express').Router()
var User = require('../../models/user')
var Admin = require('../../models/admin')
var jwt = require('jwt-simple')
var config = require('../../../config')


router.post('/', function(req, res, next) {
    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
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



router.get('/:_id', function(req, res, next) {

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

        User.findOne({
            _id: req.params._id
        }, function(err, user) {
            if (err) {
                return next(err)
            }
            res.json(user)
        })


    })

})


router.put('/:_id', function(req, res, next) {


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

        User.findById(req.params._id, function(err, user) {
            if (err) {
                return next(err)
            }

            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.phone = req.body.phone
            user.address = req.body.address

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'User updated!'
                });
            });
        })


    })







});


router.delete('/:_id', function(req, res, next) {

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

        User.findById(req.params._id, function(err, user) {
            if (err) {
                // handle error
            }

            user.remove(function(err) {
                if (err) {
                    res.send(err)
                }
                res.json({
                    message: 'User Deleted'
                })
            }); //Removes the document
        })

    })



});



module.exports = router
