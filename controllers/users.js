
const User = require('../models/User');
const usersData = require('../utils/usersData');

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            const dt = usersData(users[0].data.AuthorWorklog);
            users[0].data.AuthorWorklog.rows.unshift(dt);
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({data: err});
        });
};