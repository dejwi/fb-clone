const User = require("../models/user");
const Post = require("../models/post");
const Chat = require("../models/chat");
const multiparty = require("multiparty");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.me = (req, res, next) => {
  User.findById(req.user._id)
    //.populate('User') TODO: FIX
    .then((user) => res.json(user));
};

exports.me_update_username = [
  (req, res, next) => {
    const username = req.body.username;
    if (username)
      User.findByIdAndUpdate(req.user._id, { username })
        .then(() => res.json({ username }))
        .catch((err) => next(err));
  },
];

exports.me_update_prof = async (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) return res.status(500).json({ err: error });
    try {
      if (!files.file)
        return res.status(409).json({ msg: "Please provide image file" });
      const path = files.file[0].path;
      const blob = fs.readFileSync(path);

      const uploadedImage = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: uuidv4(),
          Body: blob,
        })
        .promise();
      const picUrl = uploadedImage.Location;
      User.findByIdAndUpdate(req.user._id, { picUrl })
        .then(() => res.json({ picUrl }))
        .catch((err) => next(err));
    } catch (err) {
      return res.status(500).json({ err });
    }
  });
};

exports.me_update_bg = async (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) return res.status(500).json({ err: error });
    try {
      if (!files.file)
        return res.status(409).json({ msg: "Please provide image file" });
      const path = files.file[0].path;
      const blob = fs.readFileSync(path);

      const uploadedImage = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: uuidv4(),
          Body: blob,
        })
        .promise();
      const bgUrl = uploadedImage.Location;
      User.findByIdAndUpdate(req.user._id, { bgUrl })
        .then(() => res.json({ bgUrl }))
        .catch((err) => next(err));
    } catch (err) {
      return res.status(500).json({ err });
    }
  });
};

exports.sendFriendReq = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    { $addToSet: { friendReqReceived: req.user._id } }
  )
    .then((result) => {
      if (!result.matchedCount)
        return res.status(404).json({ msg: "User not found" });

      User.findByIdAndUpdate(req.user._id, {
        $addToSet: { friendReqSend: req.params.id },
      }).then((result) => res.json({ msg: "Send" }));
    })
    .catch((err) => next(err));
};

exports.acceptFriendReq = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    { $pull: { friendReqSend: req.user._id } }
  )
    .then((result) => {
      if (!result.modifiedCount)
        return res.status(404).json({ msg: "Friend request doesnt exist" });

      Promise.all([
        User.findByIdAndUpdate(req.user._id, {
          $addToSet: { friends: req.params.id },
          $pull: { friendReqReceived: req.params.id },
        }),
        User.findByIdAndUpdate(req.params.id, {
          $addToSet: { friends: req.user._id },
        }),
      ])
        .then((result) => res.json({ msg: "Accepted" }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ msg: "Logged out" });
};

exports.friendsfeed = (req, res, next) => {
  Post.find({ author: { $in: req.user.friends } })
    .populate("author")
    .populate({ path: "comments.author" })
    .sort({ date: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
};

exports.friendninviteDetail = async (req, res, next) => {
  User.findById(req.user._id, { friends: 1, friendReqReceived: 1 })
    .populate("friends")
    .populate("friendReqReceived")
    .then((result) => {
      res.json({ friends: result.friends, invites: result.friendReqReceived });
    })
    .catch((err) => next(err));
};

exports.discoverNewFriends = (req, res, next) => {
  User.find({
    _id: {
      $nin: [
        req.user._id,
        ...req.user.friends,
        ...req.user.friendReqReceived,
        ...req.user.friendReqSend,
      ],
    },
  })
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

exports.removeFriend = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { $pull: { friends: req.user._id } })
    .then((doc) => {
      if (!doc.modifiedCount)
        return res.status(409).json({ msg: "You are not his friend" });

      User.findByIdAndUpdate(req.user._id, {
        $pull: { friends: req.params.id },
      })
        .then(() => res.json({ msg: "Done" }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.getChats = (req, res, next) => {
  Chat.find({ between: req.user._id })
    .then((chat) => res.json(chat))
    .catch((err) => next(err));
};
