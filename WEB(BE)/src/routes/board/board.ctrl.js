const { Board } = require('../../models/Board');
const { Comment } = require('../../models/Comment');

const output = {
  // 글 전체 불러오기
  all: async (req, res) => {
    try {
      const result = await Board.find({});
      return res.status(200).json({ isSuccessful: true, result });
    } catch (err) {
      return res.status(500).json({ isSuccessful: false, err });
    }
  },
};

const process = {
  // 글 쓰기
  write: async (req, res) => {
    const contents = await new Board(req.body);
    contents.writerId = await req.user._id;
    contents.save(err => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      return res.status(200).json({ isSuccessful: true });
    });
  },

  // 글 수정
  edit: (req, res) => {
    Board.findOne({ _id: req.body.boardId }, (err, board) => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      if (String(board.writerId) !== String(req.user._id))
        return res
          .status(500)
          .json({ isSuccessful: false, message: '작성자가 아닙니다.' });
      Board.findOneAndUpdate(
        { _id: req.body.boardId },
        { $set: { title: req.body.title, content: req.body.content } },
        err => {
          if (err) return res.status(500).json({ isSuccessful: false, err });
          return res.status(200).json({ isSuccessful: true });
        },
      );
    });
  },

  // 글 삭제
  remove: (req, res) => {
    Board.findOne({ _id: req.body.boardId }, (err, board) => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      if (String(board.writerId) !== String(req.user._id))
        return res
          .status(500)
          .json({ isSuccessful: false, message: '작성자가 아닙니다.' });
      Board.deleteOne({ _id: req.body.boardId }, err => {
        if (err) return res.status(500).json({ isSuccessful: false });
        return res.status(200).json({ isSuccessful: true });
      });
    });
  },

  // 댓글 쓰기
  commentWrite: async (req, res) => {
    const contents = await new Comment(req.body);
    contents.writerId = await req.user._id;
    contents.save(err => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      return res.status(200).json({ isSuccessful: true });
    });
  },

  // 댓글 삭제
  commentRemove: (req, res) => {
    Comment.findOne({ _id: req.body.commentId }, (err, comment) => {
      if (err) return res.status(500).json({ isSuccessful: false });
      if (String(comment.writerId) !== String(req.user._id))
        return res
          .status(500)
          .json({ isSuccessful: false, message: '작성자가 아닙니다.' });
      Comment.deleteOne({ _id: req.body.commentId }, err => {
        if (err) return res.status(500).json({ isSuccessful: false });
        return res.status(200).json({ isSuccessful: true });
      });
    });
  },

  // 유저의 글 불러오기
  user: (req, res) => {
    Board.find({ writerId: req.body.writerId }, (err, result) => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      return res.status(200).json({ isSuccessful: true, result });
    });
  },

  // 그룹의 글 불러오기
  group: (req, res) => {
    Board.find({ groupId: req.body.groupId }, (err, result) => {
      if (err) return res.status(500).json({ isSuccessful: false });
      return res.status(200).json({ isSuccessful: true, result });
    });
  },

  // 해당 글의 댓글 불러오기
  read: (req, res) => {
    Comment.find({ boardId: req.body.boardId }, (err, result) => {
      if (err) return res.status(500).json({ isSuccessful: false, err });
      return res.status(200).json({ isSuccessful: true, result });
    });
  },
};

module.exports = {
  output,
  process,
};
