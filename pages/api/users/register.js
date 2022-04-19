import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../backend/models/User";
import { signToken } from "../../../utils/auth";
import db from "../../../backend/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(401)
      .send({ message: "کاربری با این مشخصات قبلا ثبت نام کرده است" });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  await newUser.save();
  await db.disconnect();
  const token = signToken(newUser);
  res.send({
    token,
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

export default handler;
