import nc from "next-connect";
import { isAuth, isAdmin } from "../../../../../utils/auth";
import User from "../../../../../backend/models/User";
import db from "../../../../../backend/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
});

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);

    await user.save();
    await db.disconnect();

    res.send({ message: "کاربر با موفقیت بروزرسانی شد" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "کاربر مورد نظر یافت نشد" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.remove();
    await db.disconnect();
    res.send({ message: "کاربر با موفقیت حذف شد" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "کاربر مورد نظر یافت نشد" });
  }
});
export default handler;
