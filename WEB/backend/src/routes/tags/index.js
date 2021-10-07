const express = require('express');
const { Tag } = require('../../models/Tag');

const router = express.Router();

router.post('/create', (req, res) => {
  const tag = new Tag(req.body);
  tag.save(err => {
    if (err) return res.status(200).json({ createSuccess: false });
    return res.status(200).json({ createSuccess: true });
  });
});

module.exports = router;
