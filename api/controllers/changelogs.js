const mongoose = require('mongoose');

// Require Models
const Change = require('../models/changes').model;

exports.get_all_changes = (req, res, next) => {
  Change.find()
    .select()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        changes: docs.map((doc) => ({
          changeType: doc.changeType,
          changeMessage: doc.changeMessage,
          changeVersion: doc.changeVersion,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `${process.env.HOST_NAME || 'localhost:3000'}/changelogs/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.get_change = (req, res, next) => {
  const id = req.params.changeId;
  Change.findById(id)
    .select()
    .exec()
    .then((doc) => {
      console.log('From database:', doc);
      if (doc) {
        res.status(200).json({
          change: doc,
          request: {
            type: 'GET',
            url: `${process.env.HOST_NAME || 'localhost:3000'}/changelogs/${doc._id}`,
          },
        });
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
};

exports.create_change = (req, res, next) => {
  const change = new Change({
    _id: mongoose.Types.ObjectId(),
    changeType: req.body.changeType,
    changeMessage: req.body.changeMessage,
    changeVersion: req.body.changeVersion,
  });

  change
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created Change succesfully',
        createdChange: {
          _id: result._id,
          changeType: result.changeType,
          changeMessage: result.changeMessage,
          changeVersion: result.changeVersion,
          request: {
            type: 'GET',
            url: `${process.env.HOST_NAME || 'localhost:3000'}/changelogs/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
