"use strict";

const { Group } = require('./../../models/Group');

const output = {
	info: (req, res) => {
		res.status(200).json({
            _id: req.group._id,
            name: req.group.name,
            member: req.group.member,
            category: req.group.category,
            score: req.group.score,
        });
	}
};

const process = {
	create: (req, res) => {
		const group = new Group(req.body);
	
        group.save((err, groupInfo) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).json({
                success: true
            });
        });
	},
};

module.exports = {
	output,
	process,
};
