import nc from "next-connect";
import { isAuth, isAdmin } from "../../../../../utils/auth";
import Product from "../../../../../backend/models/Product";
import db from "../../../../../backend/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    await product.save();
    await db.disconnect();

    res.send({ message: "محصول با موفقیت بروزرسانی شد" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "محصول مورد نظر یافت نشد" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: "محصول با موفقیت حذف شد" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "محصول مورد نظر یافت نشد" });
  }
});
export default handler;
