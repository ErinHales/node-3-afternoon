const users = require('../models/users');

var id = 1;

module.exports = {
    login: (req,res,next) => {
        var {username, password} = req.body;
        var {session} = req;
        const user = users.find(user => user.username === username && user.password === password);
        if(user) {
            session.user.username = user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send("Unauthorized");
        }
    },
    register: (req,res,next) => {
        users.push({
            id: id++,
            username: req.body.username,
            password: req.body.password
        })
        req.session.user.username = req.body.username;
        res.status(200).send(req.session.user);
    },
    signout: (req,res,next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req,res,next) => {
        res.status(200).send(req.session.user);
    }
}