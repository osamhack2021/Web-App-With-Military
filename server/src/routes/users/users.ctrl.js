const fs = require('fs');
const { User } = require('../../models/User');
const { UserBackground } = require('../../models/UserBackground');
const { UserImage } = require('../../models/UserImage');

const get = {
  auth: (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      groupList: req.user.groupList,
    });
  },
  logout: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: '' },
      err => {
        if (err) return res.status(500).json({ success: false, err });
        return res.cookie('w_auth', '').status(200).json({ success: true });
      },
    );
  },
  // 배경 받아오기
  background: async (req, res) => {
    const { id } = req.params;
    const imageData = await UserBackground.findById(id).exec();
    if (!imageData) return res.status(404).json();
    const imageURL = imageData.img;
    fs.writeFile(`./uploads/users/backgrounds/${id}.png`, imageURL, err => {
      if (err) return res.status(500).json({ success: false, err });
      fs.readFile(`./uploads/users/backgrounds/${id}.png`, (err, data) => {
        if (err) return res.status(500).json({ success: false, err });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
      });
    });
  },
  // 이미지 받아오기
  image: async (req, res) => {
    const { id } = req.params;
    const imageData = await UserImage.findById(id).exec();
    if (!imageData) return res.status(404).json();
    const imageURL = imageData.img;
    fs.writeFile(`./uploads/users/images/${id}.png`, imageURL, err => {
      if (err) return res.status(500).json({ success: false, err });
      fs.readFile(`./uploads/users/images/${id}.png`, (err, data) => {
        if (err) return res.status(500).json({ success: false, err });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
      });
    });
  },
};

const post = {
  // 배경 업로드
  background: async (req, res) => {
    try {
      const strArray = req.headers.referer.split('/');
      const userId = strArray[4];
      const img = req.file.buffer;
      const background = new UserBackground({ userId, img });
      await background.save();
      if (img.truncated)
        return res.status(200).json({
          success: false,
          message: '이미지 용량이 제한을 초과하였습니다.',
        });
      const userData = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            background: background._id,
          },
        },
      );
      if (userData.background) {
        await fs.unlink(
          `./uploads/users/backgrounds/${userData.background}.png`,
          err => {
            if (err) console.log(err);
          },
        );
        await UserBackground.findOneAndDelete({ _id: userData.background });
      }
      return res
        .status(200)
        .send({ success: true, backgroundId: background._id });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
  // 이미지 업로드
  image: async (req, res) => {
    try {
      const strArray = req.headers.referer.split('/');
      const userId = strArray[4];
      const img = req.file.buffer;
      const image = new UserImage({ userId, img });
      await image.save();
      if (img.truncated)
        return res.status(200).json({
          success: false,
          message: '이미지 용량이 제한을 초과하였습니다.',
        });
      const userData = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            image: image._id,
          },
        },
      );
      if (userData.image) {
        await fs.unlink(`./uploads/users/images/${userData.image}.png`, err => {
          if (err) console.log(err);
        });
        await UserImage.findOneAndDelete({ _id: userData.image });
      }
      return res.status(200).send({ success: true, imageId: image._id });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
  login: (req, res) => {
    // 이메일 존재 여부 확인
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) res.status(500).json({ loginSuccess: false, err });
      if (!user) {
        return res.status(200).json({
          loginSuccess: false,
          message: '존재하지 않는 이메일 입니다.',
        });
      }
      // DB에 저장된 user의 password와 비교
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).json({ loginSuccess: false, err });
        if (!isMatch) {
          return res.status(200).json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.',
          });
        }
        // 토큰 생성 및 쿠키에 저장
        user.generateToken((err, user) => {
          if (err) return res.status(500).send({ loginSuccess: false, err });
          res.cookie('w_authExp', user.tokenExp);
          return res
            .cookie('w_auth', user.token, {
              // 유효기간 : 24시간
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .status(200)
            .json({ loginSuccess: true, userId: user._id, image: user.image });
        });
      });
    });
  },
  register: async (req, res) => {
    req.body.created = await new Date().setHours(new Date().getHours() + 9);
    const user = await new User(req.body);
    // email 중복 확인
    User.findOne({ email: user.email }, (err, email) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      }
      if (email) {
        return res.status(200).json({
          success: false,
          message: '이미 사용중인 이메일 입니다.',
        });
      }
      // name 중복 확인
      User.findOne({ name: user.name }, (err, name) => {
        if (name) {
          return res.status(200).json({
            success: false,
            message: '이미 사용중인 유저 이름 입니다.',
          });
        }
      });
      // 데이터베이스 저장
      user.save((err, user) => {
        if (err) {
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({
          success: true,
          user: user.serialize(),
        });
      });
    });
  },
  edit: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { info: req.body.info } },
      (err, user) => {
        if (!user) {
          return res.status(200).json({
            success: false,
            message: '존재하지 않는 유저에 접근하였습니다.',
          });
        }
        if (err) return res.status(500).json({ success: false, err });
        return res.status(500).json({ success: true });
      },
    );
  },
  profile: (req, res) => {
    User.findOne({ _id: req.body.userId })
      .populate('groupList')
      .exec((err, user) => {
        if (!user) {
          return res
            .status(200)
            .json({ success: false, message: '존재하지 않는 유저 입니다.' });
        }
        if (err) return res.status(500).json({ success: false, err });
        return res.status(200).send({ success: true, user });
      });
  },
};

module.exports = {
  get,
  post,
};
