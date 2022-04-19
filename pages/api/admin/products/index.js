import nc from "next-connect";
import { isAuth, isAdmin } from "../../../../utils/auth";
import Product from "../../../../backend/models/Product";
import db from "../../../../backend/db";

const handler = nc();
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});
handler.post(async (req, res) => {
  await db.connect();
  const count = await Product.countDocuments();
  const newProduct = new Product({
    id: count + 1,
    name: "sample name",
    slug: "sample-slug-" + Math.random(),
    image: "/images/product1.jpg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    rating: 0,
    numReview: 0,
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "محصول با موفقیت ساخته شده", product });
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
