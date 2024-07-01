
const User = require('../models/User');
const usersData = require('../utils/usersData');
const newData = require('../data/data');

exports.getUsers = (req, res, next) => {

    const name = req.query.name;
    const startDate = req.query.startdate;
    const endDate = req.query.enddate;

    User.find()
        .then(users => {
            const dt = usersData(users[0].data.AuthorWorklog);
            users[0].data.AuthorWorklog.rows.unshift(dt);
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({data: err});
        });
};

exports.addOne = (req, res, next) => {

    User.find()
        .then(users => {
            users[0].data.AuthorWorklog.rows.push(newData);
            console.log(users[0]);

            const updatedUsers = new User(users[0]);

            updatedUsers.save()
                .then(users => {
                    res.status(201).json({'data': users});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({data: err});
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({data: err});
        });
}