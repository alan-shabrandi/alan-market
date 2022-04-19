import nc from "next-connect";
import Product from "../../backend/models/Product";
import db from "../../backend/db";
import data from "../../utils/data/data";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "داده ها با موفقیت وارد شدند" });
});

export default handler;
