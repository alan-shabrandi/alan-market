import nc from 'next-connect';
import Order from '../../../../backend/models/Order';
import db from '../../../../backend/db';
import { isAuth } from '../../../../utils/auth';
const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});

export default handler;
