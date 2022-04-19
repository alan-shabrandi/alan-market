import mongoose from "mongoose";
import nc from "next-connect";
import db from "../../../../backend/db";
import Product from "../../../../backend/models/Product";
import { isAuth } from "../../../../utils/auth";
import { onError } from "../../../../utils/error";

const handler = nc({ onError });

handler.get(async (req, res) => {
  db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  if (product) {
    res.send(product.comments);
  } else {
    res.status(404).send({ message: "محصول مورد نظر یافت نشد" });
  }
});

handler.use(isAuth).post(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    const existCommment = product.comments.find((x) => x.user == req.user._id);
    if (existCommment) {
      await Product.updateOne(
        {
          _id: req.query.id,
          "comments._id": existCommment._id,
        },
        {
          $set: {
            "comments.$.comment": req.body.comment,
            "comments.$.rating": Number(req.body.rating),
          },
        }
      );
      const updatedProduct = await Product.findById(req.query.id);
      updatedProduct.numComments = updatedProduct.comments.length;
      updatedProduct.rating =
        updatedProduct.comments.reduce((a, c) => c.rating + a, 0) /
        updatedProduct.comments.length;
      await updatedProduct.save();
      await db.disconnect();
      return res.send({ message: "نظر مورد نظر آپدیت شد" });
    } else {
      const comment = {
        user: mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.comments.push(comment);
      product.numComments = product.comments.length;
      product.rating =
        product.comments.reduce((a, c) => c.rating + a, 0) /
        product.comments.length;

      await product.save();
      await db.disconnect();
      return res.status(201).send({ message: "پیغام شما ثبت شد" });
    }
  } else {
    await db.disconnect();
    res.status(404).send({ message: "محصول مورد نظر یافت نشد" });
  }
});

export default handler;
