const { User } = require('../../models/User');
const { Board } = require('../../models/Board');

const output = {
  // 글 전체 불러오기
  all: (req, res) => {
    try {
      const result = Board.find({});
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

const process = {
  // 글 쓰기
  write: (req, res) => {
    const contents = new Board(req.body);
    contents.save(err => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ writeSuccess: true });
    });
  },
  // 글 수정
  edit: (req, res) => {
    Board.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { title: req.body.title, content: req.body.content } },
      err => {
        if (err) return res.status(500).json({ editSuccess: true, err });
        return res.status(200).json({ editSuccess: true });
      },
    );
  },

  // 유저의 글 불러오기
  user: (req, res) => {
    Board.find({ writer: req.body.userName }, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  },

  // 그룹의 글 불러오기
  group: (req, res) => {
    Board.find({ groupName: req.body.groupName }, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  },
};

module.exports = {
  output,
  process,
};
