import nc from 'next-connect';
import Order from '../../../../backend/models/Order';
import db from '../../../../backend/db';
import { onError } from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
const handler = nc({ onError });

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'پرداخت انجام شد', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'سفارش مورد نیاز وجود ندارد' });
  }
});

export default handler;
