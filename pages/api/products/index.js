import nc from "next-connect";
import Product from "../../../backend/models/Product";
import db from "../../../backend/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
